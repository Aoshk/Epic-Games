let bannerHitman = document.querySelector(".imageBanner");
let images = document.querySelectorAll(".images");


document.addEventListener('click', function(e){

    let target = e.target;
    if(target.className=="images"){

        bannerHitman.setAttribute("src",target.src);
    }
  });


