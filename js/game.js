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
