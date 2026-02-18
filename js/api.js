const API = "https://script.google.com/macros/s/AKfycbwgKBahWpCPTTlXuLaIVCQ4Vc9GMHSohwy8g1rukv9FUvS5CYCFnBknNxaDHJ2h1elu/exec"; 

async function login(){
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const res = await fetch(API,{
        method:"POST",
        body: new URLSearchParams({
            data: JSON.stringify({
                action:"login",
                username:username,
                password:password
            })
        })
    });

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

    const res = await fetch(API,{
        method:"POST",
        body: new URLSearchParams({
            data: JSON.stringify({
                action:"register",
                username:username,
                password:password
            })
        })
    });

    const data = await res.json();

    if(data.status=="ok"){
        alert("Cuenta creada");
        window.location="login.html";
    }
}
