export interface TrackingContext {
  pageUrl?: string
  pagePath?: string
  pageTitle?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  gclid?: string
  fbclid?: string
  timezone?: string
  viewport?: string
}

function readParam(params: URLSearchParams, key: string): string | undefined {
  const value = params.get(key)
  return value ? value.slice(0, 200) : undefined
}

export function getTrackingContext(): TrackingContext {
  if (typeof window === 'undefined') {
    return {}
  }

  const params = new URLSearchParams(window.location.search)

  return {
    pageUrl: window.location.href,
    pagePath: window.location.pathname,
    pageTitle: document.title,
    referrer: document.referrer || undefined,
    utmSource: readParam(params, 'utm_source'),
    utmMedium: readParam(params, 'utm_medium'),
    utmCampaign: readParam(params, 'utm_campaign'),
    utmTerm: readParam(params, 'utm_term'),
    utmContent: readParam(params, 'utm_content'),
    gclid: readParam(params, 'gclid'),
    fbclid: readParam(params, 'fbclid'),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  }
}

export async function postJson<TResponse>(url: string, payload: unknown): Promise<TResponse> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      (typeof json?.message === 'string' && json.message) ||
      (typeof json?.error === 'string' && json.error) ||
      'Something went wrong. Please try again.'

    throw new Error(message)
  }

  return json as TResponse
}
