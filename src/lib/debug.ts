const DEBUG_MODE_KEY = 'debugMode'

// Lets remote testers (not physically in Krushevo) skip GPS proximity checks.
// Visiting any URL with ?debug=1 once persists the flag in localStorage so it
// survives normal in-app navigation afterwards.
if (new URLSearchParams(window.location.search).get('debug') === '1') {
  localStorage.setItem(DEBUG_MODE_KEY, '1')
}

export function isDebugMode(): boolean {
  return localStorage.getItem(DEBUG_MODE_KEY) === '1'
}
