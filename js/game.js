let nivelActual = 1;


const posiciones = [
 [100,50],[300,100],[500,150],[420,200],[200,250],
 [120,300],[300,350],[500,400],[420,450],[200,500],
 [120,550],[300,600],[500,650],[420,700],[200,750],
 [100,800],[300,850],[500,900],[350,950],[200,1000]
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



document.getElementById("userName").innerText =
"Jugador: " + localStorage.getItem("user");

const map = document.getElementById("map");

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

    map.appendChild(node);
}


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






setInterval(cargarRanking,3000);
cargarRanking();
