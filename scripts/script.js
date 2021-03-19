let botonMenu = document.querySelector(".imgMenuMobile");
let menuMobile = document.querySelector(".divMenuMobile");
let closeMenu = document.querySelector(".closeMenu");
let bannerHitman = document.querySelector(".imageBanner");
let images = document.querySelectorAll(".images");


document.addEventListener('click', function(e){

    let target = e.target;
    if(target.className=="images"){

        bannerHitman.setAttribute("src",target.src);
    }
  });


botonMenu.addEventListener("click", ()=>{

    menuMobile.style.display = "block"
});

closeMenu.addEventListener("click", ()=>{

    menuMobile.style.display = "none"
})