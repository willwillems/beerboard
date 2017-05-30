if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/static/serviceworker.js')

  // Warm up the cache on that very first use
  if (!navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', function changeListener () {
      // We only care about this once.
      navigator.serviceWorker.removeEventListener('controllerchange', changeListener)
    })
  }
}
