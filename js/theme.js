// ============================
// 🎨 SISTEMA GLOBAL DE TEMA
// ============================

function aplicarTemaGuardado(){

    const theme = localStorage.getItem("theme");

    if(theme === "female"){
        document.body.classList.add("female");
    }else{
        document.body.classList.remove("female");
    }
}

function toggleTheme(){

    document.body.classList.toggle("female");

    if(document.body.classList.contains("female")){
        localStorage.setItem("theme","female");
    }else{
        localStorage.setItem("theme","male");
    }
}

// Aplicar automáticamente cuando cargue cualquier página
window.addEventListener("DOMContentLoaded", aplicarTemaGuardado);
