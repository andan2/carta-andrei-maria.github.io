// Variable global para rastrear el audio actualmente en reproducción
var audioActual = null;

document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementById("botonSorpresa");
    var contenedor = document.getElementById("contenedorRegalo");
    var audio = document.getElementById("audioSorpresa");

    if (boton && contenedor && audio) {
        boton.addEventListener("click", function() {
            detenerAudioActual();
            audioActual = audio;
            audio.play();
            cargarContenido("regalo.html", contenedor);
        });
    } else {
        console.log("Botón, contenedor o audio no encontrado");
    }

    // Manejador para botón broma
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'botonBroma') {
            cargarContenidoBroma();
        }
    });

    // Manejador para botón carta
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'botonCarta') {
            cargarContenidoCarta();
        }
    });

    // Manejador para botón final
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'botonFinal') {
            cargarContenidoFinal();
        }
    });
});

function cargarContenidoBroma() {
    var audioBroma = document.getElementById("audioBroma");
    var contenedorBroma = document.getElementById("contenedorBroma");
    if (!contenedorBroma) {
        console.error('Contenedor para broma.html no encontrado');
        return;
    }
    detenerAudioActual();
    audioActual = audioBroma;
    audioBroma.play();
    cargarContenido("broma.html", contenedorBroma);
}

function cargarContenidoCarta() {
    var audioCarta = document.getElementById("audioCarta");
    var contenedorCarta = document.getElementById("contenedorCarta");
    if (!contenedorCarta) {
        console.error('Contenedor para carta.html no encontrado');
        return;
    }
    detenerAudioActual();
    audioActual = audioCarta;
    audioCarta.play();
    cargarContenido("carta.html", contenedorCarta);
}

function cargarContenidoFinal() {
    var contenedorFinal = document.getElementById("contenedorFinal");
    if (!contenedorFinal) {
        console.error('Contenedor para final.html no encontrado');
        return;
    }
    detenerAudioActual(); // Detiene cualquier audio que esté sonando
    cargarContenido("final.html", contenedorFinal);
}

// Función para detener el audio actualmente en reproducción
function detenerAudioActual() {
    if (audioActual && !audioActual.paused) {
        audioActual.pause();
        audioActual.currentTime = 0;
    }
}

// Función para cargar contenido HTML y desplazarse a él
function cargarContenido(url, contenedor) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            contenedor.innerHTML = this.responseText;
            contenedor.scrollIntoView({ behavior: 'smooth' });
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}


// video incrustado //

function playVideo(container) {
    var video = container.querySelector('video');
    video.style.display = 'block';
    video.play();
    container.querySelector('.video-thumbnail').style.display = 'none';
    container.querySelector('.play-icon').style.display = 'none';
}

// Slider //

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    let index = 0;
    const totalImages = document.querySelectorAll('.slides img').length;
    let startPos, endPos;

    const changeSlide = (newIndex) => {
        slides.style.transform = 'translateX(' + (-100 * newIndex) + '%)';
    };

    document.querySelector('.prev').addEventListener('click', function() {
        index = (index - 1 + totalImages) % totalImages;
        changeSlide(index);
    });

    document.querySelector('.next').addEventListener('click', function() {
        index = (index + 1) % totalImages;
        changeSlide(index);
    });

    // Funcionalidad de deslizamiento táctil
    slides.addEventListener('touchstart', function(e) {
        startPos = e.touches[0].clientX;
    });

    slides.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Prevención de eventos predeterminados del navegador
        endPos = e.touches[0].clientX;
    }, { passive: false }); // Nota: passive: false es necesario para que preventDefault funcione

    slides.addEventListener('touchend', function(e) {
        if (startPos - endPos > 50) { // Deslizar hacia la izquierda
            index = (index + 1) % totalImages;
            changeSlide(index);
        } else if (endPos - startPos > 50) { // Deslizar hacia la derecha
            index = (index - 1 + totalImages) % totalImages;
            changeSlide(index);
        }
    });
});
