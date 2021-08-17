export const CACHE_NAME = 'pwa-task-manager';
// 캐시할 파일
const urlsToCache = [
  '/favicon.ico',
];

// 만든 파일 캐싱
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }),
  );
});

// 요청에 실패하면 오프라인 페이지 표시 ( 아직 offline.html은 제작안함 )
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});

// CACHE_NAME이 변경되면 오래된 캐시 삭제
self.addEventListener('activate', event => {
  const cacheWhitelist = ['pwa-task-manager'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
