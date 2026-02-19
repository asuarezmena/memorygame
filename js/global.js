function volver(){
    window.history.back();
}

function cerrarSesion(){
    localStorage.clear();
    window.location = "login.html";
}


function showModal(message, type = "normal") {

    const modal = document.getElementById("customModal");
    const content = document.getElementById("modalContent");
    const text = document.getElementById("modalMessage");

    text.textContent = message;

    content.classList.remove("success", "error");

    if(type === "success"){
        content.classList.add("success");
    }

    if(type === "error"){
        content.classList.add("error");
    }

    modal.classList.add("show");

    setTimeout(() => {
        modal.classList.remove("show");
    }, 2000); // 2 segundos
}
