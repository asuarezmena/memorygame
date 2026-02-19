
let nivel = parseInt(localStorage.getItem("level")) || 1;
let modo = localStorage.getItem("mode");

let vidas = 3;
let numeroActual = "";

document.getElementById("nivel").innerText =
"Nivel " + nivel;




function obtenerConfiguracionNivel(){

    let digitos = 3;

    if(modo == "intermedio") digitos = 4;
    if(modo == "dificil") digitos = 6;

    let cantidadNumeros = 1;
    let tiempoBase = 1000;
    let vidasIniciales = 3;

    if(nivel > 20){
        cantidadNumeros = 2;
        tiempoBase = 800;
    }

    if(nivel > 40){
        cantidadNumeros = 3;
        tiempoBase = 600;
        vidasIniciales = 2;
    }

    if(nivel > 60){
        cantidadNumeros = 4;
        tiempoBase = 450;
        vidasIniciales = 1;
    }

    return {
        digitos,
        cantidadNumeros,
        tiempo: tiempoBase - ((nivel-1)*10),
        vidas: vidasIniciales
    };
}



function iniciarCuentaAtras(callback){
    const contador = document.getElementById("contador");
    const pantalla = document.getElementById("preStart");

    if(!contador || !pantalla) return;

    let tiempo = 5;
    contador.innerText = tiempo;

    const intervalo = setInterval(()=>{
        tiempo--;
        contador.innerText = tiempo;

        if(tiempo <= 0){
            clearInterval(intervalo);
            pantalla.style.display = "none";
            callback();
        }

    },1000);
}

// ---- después va el load ----
window.addEventListener("load", () => {
    const preStart = document.getElementById("preStart");
    if(preStart){
        iniciarCuentaAtras(()=>{
            preStart.style.display = "none";
            iniciarNivel();
        });
    } else {
        iniciarNivel();
    }
});



let secuencia = [];

function generarSecuencia(config){

    secuencia = [];

    for(let i=0; i < config.cantidadNumeros; i++){

        let min = Math.pow(10, config.digitos - 1);
        let max = Math.pow(10, config.digitos) - 1;

        let numero = Math.floor(Math.random()*(max-min)+min);
        secuencia.push(numero);
    }
}


function esperar(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mostrarSecuencia(config){

    const numeroDiv = document.getElementById("numero");

    for(let num of secuencia){

        numeroDiv.innerText = num;
        await esperar(config.tiempo);

        numeroDiv.innerText = "";
        await esperar(250);
    }

    numeroDiv.innerText = "???";
}



function tiempoNivel(){
    return 1000 - ((nivel-1)*45);
}


async function iniciarNivel(){

    const config = obtenerConfiguracionNivel();

    vidas = config.vidas;
    pintarVidas();

    document.getElementById("nivel").innerText = "Nivel " + nivel;

    generarSecuencia(config);

    await mostrarSecuencia(config);
}


async function verificar(){

    let resp = document.getElementById("respuesta").value;

    if(resp == secuencia.join("")){

        fetch(API,{
          method:"POST",
          headers:{
            "Content-Type":"application/x-www-form-urlencoded"
          },
          body:"data="+encodeURIComponent(JSON.stringify({
            action:"updateLevel",
            username:localStorage.getItem("user"),
            modo:localStorage.getItem("mode"),
            level:nivel
          }))
        })
        .then(res => res.json())
        .then(data => {
    
            await showModal("¡Correcto!", "success");
    
            nivel++;
            localStorage.setItem("level",nivel);
    
            window.location="map.html";
    
        })
        .catch(err=>{
            console.error(err);
            await showModal("Error al actualizar nivel", "error");
        });
    
    }else{

        vidas--;
        pintarVidas();
        
        if(vidas==0){
    
            await showModal("Perdiste el nivel", "error");
    
            nivel = Math.max(1,nivel-1);
            localStorage.setItem("level",nivel);
    
            window.location="map.html";
    
        }else{
    
            await showModal("Incorrecto. Intenta nuevamente", "error");
    
            document.getElementById("respuesta").value = "";
    
            // 🔥 Volver a mostrar la misma secuencia
            const config = obtenerConfiguracionNivel();
            mostrarSecuencia(config);
    
        }
    }


}

function pintarVidas(){
 let html="";
 for(let i=0;i<vidas;i++){
   html+="❤️ ";
 }
 document.getElementById("vidas").innerHTML=html;
}






