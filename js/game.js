
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
    const data = await res.json();
    const lista = data.data;


    const rankingBox = document.getElementById("ranking");
    rankingBox.innerHTML = "";
 

    console.log(lista); // para verificar

    // ← Aquí agregamos el mensaje si no hay jugadores
    if(lista.length === 0){
        rankingBox.innerHTML += "¡Sé el primero en jugar!";
        return; // salimos porque no hay datos que mostrar
    }

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
