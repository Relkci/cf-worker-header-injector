addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

  let originalResponse = await fetch(request)

  // pass in the original response so we can modify some of it.
  let response = new Response(originalResponse.body,originalResponse);

  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy','same-origin');
  response.headers.set('Content-Security-Policy', 'default-src \'self\' \'unsafe-inline\'');
  response.headers.set('Feature-Policy','camera \'none\'; geolocation \'none\'');
  response.headers.set('X-Content-Type-Options','nosniff');
  response.headers.set('X-XSS-Protection','1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');
  return response
}
