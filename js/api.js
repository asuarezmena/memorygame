const API = "https://script.google.com/macros/s/AKfycbwXAji7P0rsVF4To1M4_KPJSXHgV5qBajNsG4YFzFAsmldL_Oi6l7P3UU7vsR2Kwl84/exec"; 

async function login(){
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const res = await fetch(
        API + "?action=login&username=" + encodeURIComponent(username) +
        "&password=" + encodeURIComponent(password)
    );

    const data = await res.json();

    if(data.status=="ok"){
        localStorage.setItem("user",username);
        window.location="menu.html";
    }else{
        alert("Login incorrecto");
    }
}


async function register(){

    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const res = await fetch(
        API + "?action=register" +
        "&username=" + encodeURIComponent(username) +
        "&password=" + encodeURIComponent(password)
    );

    const data = await res.json();

    if(data.status=="ok"){
        alert("Usuario creado correctamente");
        window.location="index.html";
    }else{
        alert(data.message || "Error al registrar");
    }
}
