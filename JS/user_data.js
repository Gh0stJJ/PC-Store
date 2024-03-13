/*
    JS para la gestión de los datos del usuario
*/

var nick;
var email;
var size;
var geolocationtxt;

/**
 * 
 * @param {HTMLElement} nick nombre de usuario
 * @param {HTMLElement} email correo electrónico
 * @param {HTMLElement} size tamaño del tablero
 */
function setuserData(nick, email, size) {
    sessionStorage.setItem('nick', nick.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('size', size.value);
    sessionStorage.setItem('geolocation', geolocationtxt);

}

function getuserData() {
    nick = sessionStorage.getItem('nick');
    size = sessionStorage.getItem('size');
    email = sessionStorage.getItem('email');
    console.log(nick);
    return nick;
}

function checkuserData() {
    if (nick != null) {
        return true;
    } else {
        //Mensaje de error
        sessionStorage.setItem('error', 'No se ha rellenado el formulario de inicio de sesión. Por favor, rellene el formulario para poder jugar.');
        return false;
    }
}

//API de geolocalización
function geolocalationData() {
    if(!navigator.geolocation){
        //Mensaje de error
       geolocationtxt = "La geolocalización no está disponible en tu navegador";
        return false;
    }else{
        navigator.geolocation.getCurrentPosition(
            //Si se ha obtenido la posición
            (position) => {
                geolocationtxt = "Latitud: " + position.coords.latitude + " Longitud: " + position.coords.longitude;
            },
            //Si NO se ha obtenido la posición
            () => { geolocationtxt = "No se ha podido obtener la geolocalización";}

        )
    }
}

//localStorage
function userHistory(){
    //Consultamos el localStorage para ver si ya existe un historial de usuario
    let recordLS = localStorage.getItem('userRecord');
    let record;
    if(recordLS!=null){
        record = JSON.parse(recordLS);
    }else{
        //Creamos la lista si no existe
        record = [];
    }
    nick = getuserData();
    //Objeto con el historial del usuario
    let UserRecord={
        user: nick,
        date: Date.now()
    }

    
    //Guardamos el historial en el localStorage
    record.push(UserRecord);

    localStorage.setItem('userRecord', JSON.stringify(record));
}