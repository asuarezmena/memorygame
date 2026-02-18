let nivelActual = parseInt(localStorage.getItem("level")) || 1;

document.getElementById("userName").innerText =
"Jugador: " + localStorage.getItem("user");



async function cargarRanking(){

 const res = await fetch(API,{
   method:"POST",
   body:JSON.stringify({
     action:"getRanking",
     modo:localStorage.getItem("mode")
   })
 });

 const data = await res.json();

 let html = "<h3>Ranking</h3>";

 data.forEach(r=>{
   html += r[0]+" - Nivel "+r[2]+"<br>";
 });

 document.getElementById("ranking").innerHTML = html;
}





const posiciones = [
 [100,50],[300,120],[500,180],[420,260],[200,320],
 [120,400],[300,460],[500,520],[420,600],[200,660],
 [120,740],[300,800],[500,850],[420,900],[200,950],
 [100,1000],[300,1060],[500,1120],[350,1180],[200,1240]
];

const cont = document.getElementById("nodes");

for(let i=1;i<=20;i++){

 const node = document.createElement("div");
 node.className="node";
 node.innerText=i;

 node.style.left = posiciones[i-1][0]+"px";
 node.style.top = posiciones[i-1][1]+"px";

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
