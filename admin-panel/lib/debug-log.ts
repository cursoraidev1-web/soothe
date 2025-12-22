// Debug logging helper for admin panel
const DEBUG_ENDPOINT = 'http://127.0.0.1:7243/ingest/e167b145-9b4d-42f7-bb28-55f7996b5692'

export function logDebug(
  location: string,
  message: string,
  data: any,
  hypothesisId?: string
) {
  if (typeof window === 'undefined') return
  
  fetch(DEBUG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      location,
      message,
      data,
      timestamp: Date.now(),
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: hypothesisId || 'GENERAL',
    }),
  }).catch(() => {})
}


