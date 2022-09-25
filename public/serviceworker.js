const CACHE_KEY = 'react-pwa-version-1';
const entryPoints = ['index.html', 'offline.html'];

const self = this;


self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_KEY).then((cache) => cache.addAll(entryPoints)));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then(() => fetch(event.request).catch(() => caches.match('offline.html'))));
});
self.addEventListener('activate', (event) => {
    const CACHE_WHITE_LIST = [];
    CACHE_WHITE_LIST.push(CACHE_KEY);

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(cacheNames.map(
                // eslint-disable-next-line array-callback-return
                (cacheName) => {
                    if (!CACHE_WHITE_LIST.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                }
            ))
        })
    );
});
