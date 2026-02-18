let nivelActual = parseInt(localStorage.getItem("level")) || 1;

document.getElementById("userName").innerText =
"Jugador: " + localStorage.getItem("user");


function iniciarCuentaAtras(callback){

    const contador = document.getElementById("contador");
    const pantalla = document.getElementById("preStart");

    if(!contador || !pantalla) return; // ← evita error si no existe

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





async function cargarRanking(){

    const modo = localStorage.getItem("mode");

    const url =
        API +
        "?action=getRanking" +
        "&modo=" + encodeURIComponent(modo);

    const res = await fetch(url);   // GET (ya no POST)

    const data = await res.json();

    const rankingBox = document.getElementById("ranking");
    rankingBox.innerHTML = "<h3>Ranking</h3>";

    console.log(data);
    console.log(typeof data);
    const lista = data.data || data;   // si viene envuelto en "data"
    lista.forEach(r=>{
        rankingBox.innerHTML += r[0] + " - Nivel " + r[2] + "<br>";
    });
}





 



const cont = document.getElementById("nodes");

for(let i=1;i<=20;i++){

 const node = document.createElement("div");
 node.className="node";
 node.innerText=i;

 if(i==nivelActual){
   node.classList.add("active");
 }

 node.onclick = ()=>{
   if(i==nivelActual){
     localStorage.setItem("level",i);
     window.location="game.html";
   }
 }

 cont.appendChild(node);
}




window.onload = () => {

    if(document.getElementById("preStart")){
        iniciarCuentaAtras(()=>{
            iniciarJuego();
        });
    }

};










setInterval(cargarRanking,3000);
cargarRanking();
