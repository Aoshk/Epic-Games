let botonMenu = document.querySelector(".imgMenuMobile");
let menuMobile = document.querySelector(".divMenuMobile")
let closeMenu = document.querySelector(".closeMenu");

botonMenu.addEventListener("click", ()=>{

    menuMobile.style.display = "block"
});

closeMenu.addEventListener("click", ()=>{

    menuMobile.style.display = "none"
})