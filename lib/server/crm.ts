import { reportApiError } from '@/lib/server/monitoring'

export interface CrmEnvelope<TPayload> {
  entity: 'lead' | 'eligibility' | 'newsletter'
  payload: TPayload
  queuedAt: string
}

export interface CrmSyncResult {
  success: boolean
  provider: string
  externalId?: string
  error?: string
}

function getCrmProvider() {
  return process.env.CRM_PROVIDER ?? 'none'
}

async function withRetry<T>(fn: () => Promise<T>, retries = 2) {
  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt === retries) break
    }
  }

  throw lastError
}

async function syncToWebhook<TPayload>(envelope: CrmEnvelope<TPayload>): Promise<CrmSyncResult> {
  const url = process.env.CRM_WEBHOOK_URL
  if (!url) {
    return { success: false, provider: 'webhook', error: 'CRM_WEBHOOK_URL not configured' }
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(envelope),
  })

  if (!response.ok) {
    throw new Error(`Webhook sync failed (${response.status})`)
  }

  const json = (await response.json().catch(() => ({}))) as { id?: string }
  return { success: true, provider: 'webhook', externalId: json.id }
}

async function syncToHubspot<TPayload>(envelope: CrmEnvelope<TPayload>): Promise<CrmSyncResult> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_API_KEY
  if (!token) return { success: false, provider: 'hubspot', error: 'HubSpot token not configured' }

  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        email: (envelope.payload as Record<string, unknown>).email,
        firstname: (envelope.payload as Record<string, unknown>).name,
        phone: (envelope.payload as Record<string, unknown>).phone,
        lifecycle_stage: envelope.entity,
        source: (envelope.payload as Record<string, unknown>).source,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`HubSpot sync failed (${response.status})`)
  }

  const json = (await response.json()) as { id?: string }
  return { success: true, provider: 'hubspot', externalId: json.id }
}

async function syncToZoho<TPayload>(envelope: CrmEnvelope<TPayload>): Promise<CrmSyncResult> {
  const accessToken = process.env.ZOHO_ACCESS_TOKEN
  const moduleName = process.env.ZOHO_MODULE_NAME ?? 'Leads'

  if (!accessToken) return { success: false, provider: 'zoho', error: 'ZOHO_ACCESS_TOKEN not configured' }

  const response = await fetch(`https://www.zohoapis.com/crm/v2/${moduleName}`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [
        {
          Last_Name: (envelope.payload as Record<string, unknown>).name ?? 'Unknown',
          Email: (envelope.payload as Record<string, unknown>).email,
          Phone: (envelope.payload as Record<string, unknown>).phone,
          Lead_Source: (envelope.payload as Record<string, unknown>).source,
          Description: JSON.stringify(envelope.payload),
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Zoho sync failed (${response.status})`)
  }

  const json = (await response.json()) as {
    data?: Array<{ details?: { id?: string } }>
  }

  const externalId = json.data?.[0]?.details?.id
  return { success: true, provider: 'zoho', externalId }
}

export async function enqueueCrmSync<TPayload>(envelope: CrmEnvelope<TPayload>): Promise<CrmSyncResult> {
  const provider = getCrmProvider()

  if (provider === 'none') {
    return { success: false, provider: 'none', error: 'CRM provider not configured' }
  }

  try {
    if (provider === 'hubspot') {
      return await withRetry(() => syncToHubspot(envelope))
    }

    if (provider === 'zoho') {
      return await withRetry(() => syncToZoho(envelope))
    }

    return await withRetry(() => syncToWebhook(envelope))
  } catch (error) {
    await reportApiError('crm_sync_failed', error, { provider, entity: envelope.entity })
    return {
      success: false,
      provider,
      error: error instanceof Error ? error.message : 'Unknown CRM sync error',
    }
  }
}
