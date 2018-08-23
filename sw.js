// declaring the cache name and cache files

var cacheName = 'version1';
var cacheFiles = [
    '/',
    '/index.html',
    'restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// Installation of Service Worker

self.addEventListener('install', function(e) {
    console.log('SW installed');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('SW caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

// Activation of Service Worker

self.addEventListener('activate', function(e) {
    console.log('SW Activated');
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if(thisCacheName != cacheName) {
                    console.log('SW removing old caches', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );
});

// Fetching Service Worker

self.addEventListener('fetch', function(e) {
    console.log('SW fetching', e.request.url);
    e.respondWith(
        caches.match(e.request, {ignoreSearch:true}).then(function(response) {
            if(response) {
                console.log('SW found in cache', e.request.url);
                return response;
            }
            
            return fetch(e.request);
        })

    );
        
 });