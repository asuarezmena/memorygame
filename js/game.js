const API = "https://script.google.com/macros/s/AKfycbwXAji7P0rsVF4To1M4_KPJSXHgV5qBajNsG4YFzFAsmldL_Oi6l7P3UU7vsR2Kwl84/exec"; 
let nivelActual = parseInt(localStorage.getItem("level")) || 1;

document.getElementById("userName").innerText =
"Jugador: " + localStorage.getItem("user");








async function cargarRanking(){

    const modo = localStorage.getItem("mode");

    const url =
        API +
        "?action=getRanking" +
        "&modo=" + encodeURIComponent(modo);

    const res = await fetch(url);
    const lista = await res.json(); // directamente el array

    const rankingBox = document.getElementById("ranking");
    rankingBox.innerHTML = "<h3>Ranking</h3>";

    console.log(lista); // para verificar

    if(!Array.isArray(lista)) return;  
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














setInterval(cargarRanking,3000);
cargarRanking();
