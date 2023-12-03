//registrar si el navegador que se utiliza soporta un service workwr 
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(registrado=>console.log('Se instalo correctamente...', registrado))
    .catch(error=>console.log('Hubo un fallo en la instalacion....', error))
}else{
    console.log('Service workers no soportados');
}