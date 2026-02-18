let nivelActual = 1;

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
