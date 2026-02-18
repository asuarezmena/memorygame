let nivel = parseInt(localStorage.getItem("level")) || 1;
let modo = localStorage.getItem("mode");

let vidas = 3;
let numeroActual = "";

document.getElementById("nivel").innerText =
"Nivel " + nivel;

function generarNumero(){

    let digits = 3;

    if(modo=="medio") digits=4;
    if(modo=="dificil") digits=5;

    let min = Math.pow(10,digits-1);
    let max = Math.pow(10,digits)-1;

    numeroActual = Math.floor(Math.random()*(max-min)+min);
}

function tiempoNivel(){
    return 1000 - ((nivel-1)*45);
}

function iniciarNivel(){

    document.getElementById("vidas").innerText =
    "Vidas: " + vidas;

    generarNumero();
    pintarVidas();

    document.getElementById("numero").innerText = numeroActual;

    setTimeout(()=>{
        document.getElementById("numero").innerText="???";
    }, tiempoNivel());
}

function verificar(){

    let resp = document.getElementById("respuesta").value;

    if(resp == numeroActual){

        fetch(API,{
         method:"POST",
         body:JSON.stringify({
           action:"updateLevel",
           username:localStorage.getItem("user"),
           modo:localStorage.getItem("mode"),
           level:nivel
         })
        });

        alert("Correcto!");

        nivel++;
        localStorage.setItem("level",nivel);

        window.location="map.html";

    }else{

        vidas--;

        if(vidas==0){

            alert("Perdiste el nivel");

            nivel = Math.max(1,nivel-1);
            localStorage.setItem("level",nivel);

            window.location="map.html";

        }else{

            alert("Incorrecto. Intenta nuevamente");
            iniciarNivel();

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



iniciarNivel();
