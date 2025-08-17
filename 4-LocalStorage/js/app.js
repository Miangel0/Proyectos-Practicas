// Variables

const formularo = document.getElementById('formulario');
const listaTweets = document.getElementById('lista-tweets');
let tweets = [];

// Event listeners

eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formularo.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        console.log(tweets)
        crearHTML();
    })
}

// Functions

function agregarTweet (){
    // Prevenir el comportamiento por defecto del formulario
    event.preventDefault();

    // Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    // Validar el tweet
    if (tweet == ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }else if (tweet.length > 140) {
        mostrarError('El mensaje no puede superar los 140 caracteres');
        return;
    }

    // Agregar al array de tweets

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj];

    // Agregamos el tweet al HTML
    // 
    
    crearHTML();;

    // Reiniciar el formulario

    formularo.reset();
}

function mostrarError(e){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = e;
    mensajeError.classList.add('error');

    // Insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){

    limpiarHTML()

    if (tweets.length > 0){
        tweets.forEach( tweet => {
            // Agregar boton eliminar en cada tweet
            const boton = document.createElement('a')
            boton.innerText = 'X';
            boton.classList.add('borrar-tweet')

            // Añadir la función de eliminar

            boton.onclick = () => {
                borrarTweet(tweet.id);
            }

            
            // Creamos el HTML
            const li = document.createElement('li');

            // añadir al texto
            li.innerText = tweet.tweet;

            // Asignar el boton
            li.appendChild(boton)
            
            // Insertarlo en el HTML
            listaTweets.appendChild(li)
        } )
    }
    // Funcón para guardar los tweets en el localstorage
    sincronizarStorage();
}

// Limpiar el HTML
function limpiarHTML (){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Eliminar un tweet
function borrarTweet (id){
    tweets = tweets.filter( tweet => tweet.id !== id );
    console.log(tweets);
    crearHTML();
}

// Agregar los tweets actuales al localstorage
function sincronizarStorage (){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}