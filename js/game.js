
let nivelActual = 1;

async function cargarNivelUsuario(){

  const username = localStorage.getItem("user");
  const modo = localStorage.getItem("mode");

  const res = await fetch(
    API + "?action=getUserLevel&username=" +
    encodeURIComponent(username) +
    "&modo=" +
    encodeURIComponent(modo)
  );

  const data = await res.json();
  nivelActual = parseInt(data.level) || 1;

  construirMapa();
}



 
document.getElementById("userName").innerText =
"Jugador: " + localStorage.getItem("user");




 

async function cargarRanking(){

    const modo = localStorage.getItem("mode");

    const res = await fetch(
        API + "?action=getRanking&modo=" + encodeURIComponent(modo)
    );

    const data = await res.json();
    const lista = data.data;

    const rankingBox = document.getElementById("ranking");
    rankingBox.innerHTML = "<h3>Ranking (Modo - "+modo+")</h3>";

    if(!Array.isArray(lista) || lista.length==0){
        rankingBox.innerHTML += "No hay jugadores aún";
        return;
    }

    let html = `
    <table style="width:100%; font-size:14px;">
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Nivel</th>
      </tr>
    `;

    lista.forEach((r,index)=>{
        html += `
          <tr>
            <td>u${("000"+(index+1)).slice(-3)}</td>
            <td>${r[0]}</td>
            <td>${r[2]}</td>
          </tr>
        `;
    });

    html += "</table>";

    rankingBox.innerHTML += html;
}






 




function construirMapa(){

  const cont = document.getElementById("nodes");
  cont.innerHTML = "";

  for(let i=1;i<=20;i++){

    const node = document.createElement("div");
    node.className="node";
    node.innerText=i;

    if(i < nivelActual){
      node.classList.add("completed");
    }

    if(i == nivelActual){
      node.classList.add("active");
      node.onclick = ()=>{
        localStorage.setItem("level", i);
        window.location="game.html";
      };
    }

    if(i > nivelActual){
      node.classList.add("locked");
    }

    cont.appendChild(node);
  }
}













cargarNivelUsuario();
setInterval(cargarRanking,3000);
cargarRanking();

