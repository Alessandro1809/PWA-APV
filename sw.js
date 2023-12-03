
//archivos que se guardaran en cache 
const nombreCache='APV-V1';
const archivos =[
'/',
'/index.html',
'/error.html',
'/css/bootstrap.css',
'css/styles.css',
'/js/app.js',
'/js/apv.js',

];

//cuando se instala el service worker

//el service worker solo se instala una vez como pasaba con indexed db 
self.addEventListener('install', e=>{
    //cuando se instala normalmente es un buen momento para cachear ciertos archivos
    e.waitUntil(
        caches.open(nombreCache)
        .then(cache=> {
            console.log('cacheando...')
            cache.addAll(archivos);
        })

    )
    console.log('Instalado el serviceWorker');
console.log(e);
});
//se corre cuando SOLO cuando se activa el service worker 
//al instalarse es un buen momento para las nuevas versiones de la progresive web app
self.addEventListener('activate',e=>{
    console.log('ServiceWorker activado...');
//asegurarse de que se usa siempre la ultima versiondel cache
    e.waitUntil(
        caches.keys()
            .then(keys =>{
                return Promise.all(
                    keys.filter(key=>key !==nombreCache)
                    .map(key=> caches.delete(key))//borra las versiones anteriores
                )
                
            })

    )
    console.log(e);
});

//evento fetch para descargar archivos estaticos
self.addEventListener('fetch',e=>{
    console.log('Fetch....', e );
//revisar el tipo de request y en caso de que coincidan use el cache 

    e.respondWith(
        caches.match(e.request)
        .then(respuesta=>{
            return respuesta
        })
        .catch(()=> caches.match('/error.html'))

    )
});
