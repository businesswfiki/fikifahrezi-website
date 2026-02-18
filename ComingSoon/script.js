function openNav(){
    document.body.classList.add("menu-open");
    document.getElementById("myOverlay").classList.add("open");
}

function closeNav(){
    document.body.classList.remove("menu-open");
    document.getElementById("myOverlay").classList.remove("open");
}

document.getElementById("dim-overlay")?.addEventListener("click", closeNav);
