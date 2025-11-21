// Simple performance heuristics for low-end devices
export function isLowPerfDevice() {
  try {
    const urlFlag = new URLSearchParams(window.location.search).get('lite') === '1'
    const lowMemory = typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory <= 4
    const batterySaver = typeof navigator !== 'undefined' && 'connection' in navigator && navigator.connection?.saveData
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches
    return Boolean(urlFlag || lowMemory || batterySaver || coarse)
  } catch {
    return false
  }
}

export function prefersReducedMotion() {
  try {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}
