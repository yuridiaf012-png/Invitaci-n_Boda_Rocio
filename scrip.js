// ELEMENTOS

const sobre = document.getElementById("sobre");
const contenido = document.getElementById("contenido");
const musica = document.getElementById("musica");



// ABRIR INVITACIÓN


sobre.addEventListener("click",()=>{


    sobre.style.animation="abrir 1s forwards";


    setTimeout(()=>{


        sobre.style.display="none";

        contenido.style.display="block";


        musica.play();


        window.scrollTo({
            top:0,
            behavior:"smooth"
        });



    },1000);



});




// CONTADOR

const fechaBoda = new Date(
    "October 31, 2026 17:00:00"
).getTime();



function contador(){


const ahora = new Date().getTime();


const distancia = fechaBoda - ahora;



const dias = Math.floor(
    distancia/(1000*60*60*24)
);



const horas = Math.floor(
    (distancia%(1000*60*60*24))
    /(1000*60*60)
);



const minutos = Math.floor(
    (distancia%(1000*60*60))
    /(1000*60)
);



const segundos = Math.floor(
    (distancia%(1000*60))
    /1000
);



document.getElementById("dias")
.innerHTML=dias;



document.getElementById("horas")
.innerHTML=horas;



document.getElementById("minutos")
.innerHTML=minutos;



document.getElementById("segundos")
.innerHTML=segundos;



}



setInterval(contador,1000);

contador();





// ANIMACIÓN SOBRE


const estilo=document.createElement("style");

estilo.innerHTML=`

@keyframes abrir{


0%{

transform:scale(1);

opacity:1;

}



100%{

transform:scale(1.5) rotateX(90deg);

opacity:0;

}


}

`;

document.head.appendChild(estilo);




// GALERIA - CARRUSEL

const fotos = document.querySelectorAll(".foto");
const contenedorPuntos = document.querySelector(".puntos");
const btnIzq = document.querySelector(".btn.izquierda");
const btnDer = document.querySelector(".btn.derecha");

let indiceActual = 0;


// generamos los puntos automáticamente según cuántas fotos haya,
// así nunca se desincronizan si agregas o quitas fotos

if(contenedorPuntos){

    contenedorPuntos.innerHTML = "";


    fotos.forEach((foto,i)=>{

        const punto = document.createElement("span");

        punto.classList.add("punto");


        if(i === 0){

            punto.classList.add("activo");

        }


        punto.addEventListener("click",()=>{

            mostrarFoto(i);

        });


        contenedorPuntos.appendChild(punto);

    });

}


const puntos = document.querySelectorAll(".punto");


function mostrarFoto(indice){

    // permite que el índice "dé la vuelta" en los extremos
    if(indice >= fotos.length){
        indice = 0;
    }

    if(indice < 0){
        indice = fotos.length - 1;
    }


    fotos[indiceActual].classList.remove("activa");
    puntos[indiceActual].classList.remove("activo");


    fotos[indice].classList.add("activa");
    puntos[indice].classList.add("activo");


    indiceActual = indice;

}


if(btnDer){

    btnDer.addEventListener("click",()=>{

        mostrarFoto(indiceActual + 1);

    });

}


if(btnIzq){

    btnIzq.addEventListener("click",()=>{

        mostrarFoto(indiceActual - 1);

    });

}



// deslizar con el dedo (swipe) en celular

const contenedorFotos = document.querySelector(".contenedor-fotos");

let inicioX = 0;

if(contenedorFotos){

    contenedorFotos.addEventListener("touchstart",(e)=>{

        inicioX = e.touches[0].clientX;

    });


    contenedorFotos.addEventListener("touchend",(e)=>{

        const finX = e.changedTouches[0].clientX;

        const diferencia = inicioX - finX;


        if(diferencia > 50){

            mostrarFoto(indiceActual + 1);

        }


        if(diferencia < -50){

            mostrarFoto(indiceActual - 1);

        }

    });

}
