// Performance and motion preference utilities
// Lite mode detection: URL (?lite=1) or localStorage('lite' === '1')
export function getLiteFlag() {
  try {
    const urlFlag = new URLSearchParams(window.location.search).get('lite')
    if (urlFlag === '1') return true
    if (urlFlag === '0') return false
    const stored = localStorage.getItem('lite')
    return stored === '1'
  } catch {
    return false
  }
}

export function setLiteFlag(on) {
  try {
    localStorage.setItem('lite', on ? '1' : '0')
    const params = new URLSearchParams(window.location.search)
    if (on) params.set('lite', '1')
    else params.delete('lite')
    const url = `${window.location.pathname}?${params.toString()}${window.location.hash}`
    window.history.replaceState({}, '', url)
  } catch {
    // noop
  }
}

// Heuristics for low-performance devices
export function isLowPerfDevice() {
  try {
    if (getLiteFlag()) return true
    const lowMemory = typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory <= 4
    const batterySaver = typeof navigator !== 'undefined' && 'connection' in navigator && navigator.connection?.saveData
    const coarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches
    const lowThreads = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    return Boolean(lowMemory || batterySaver || coarse || lowThreads)
  } catch {
    return false
  }
}

export function prefersReducedMotion() {
  try {
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

// Convenience: a single flag for gating animations/3D
export function shouldReduce() {
  return prefersReducedMotion() || isLowPerfDevice()
}
