var version = 'v1'
var staticCacheName = 'beer-board-v1'

self.oninstall = function (event) {
  self.skipWaiting()
  caches.open(staticCacheName).then(function (cache) {
    return cache.addAll([
      'app.js',
      '/',
      'https://fonts.googleapis.com/icon?family=Material+Icons',
      'https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.css',
      'https://fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2'
    ])
  })
}

self.onactivate = function (event) {

}

self.onfetch = function (event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreVary: true
    })
  )
}
