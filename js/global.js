function volver(){
    window.history.back();
}

function cerrarSesion(){
    localStorage.clear();
    window.location = "login.html";
}
