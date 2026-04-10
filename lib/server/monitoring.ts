type Severity = 'info' | 'warning' | 'error'

interface MonitorEvent {
  type: string
  severity: Severity
  message: string
  context?: Record<string, unknown>
}

const webhookUrl = process.env.MONITORING_WEBHOOK_URL

export async function reportEvent(event: MonitorEvent) {
  const payload = {
    timestamp: new Date().toISOString(),
    ...event,
  }

  if (event.severity === 'error') {
    console.error('[monitor]', payload)
  } else {
    console.info('[monitor]', payload)
  }

  if (!webhookUrl) return

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error('[monitor] webhook failed', error)
  }
}

export async function reportApiError(type: string, error: unknown, context?: Record<string, unknown>) {
  const message = error instanceof Error ? error.message : 'Unknown error'
  await reportEvent({ type, severity: 'error', message, context })
}
