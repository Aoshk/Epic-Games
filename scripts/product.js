const params =  new URLSearchParams(location.search);
const id = params.get("id")
const banner = document.querySelector(".productInfo__bannerContainer")
const price = document.querySelector(".price")
const title = document.querySelector(".title")
const metacritic = document.querySelector(".metacritic")
const rating = document.querySelector(".rating")
const description = document.querySelector(".description")

const productImages = document.querySelectorAll(".productImage")
var imageNumber = 1

if(!id){

    location.href="./404.html"
}

db.collection("products").doc(id)
.get().then(function (doc){

    const data = doc.data()
    if(!data){

        location.href="./404.html"
    }
    
    banner.style.backgroundImage=`url(${data.images[0].url})`;
    price.innerText=`$ ${data.price}`
    title.innerText=`${data.name}`
    metacritic.innerText=`${data.metacritic}/100`
    rating.innerText=`${data.rating}`
    description.innerText=`${data.description}`

    productImages.forEach(image=>{
        let img = data.images[imageNumber]?.url;

        if (!img) {

            img = "./data/placeHolder.png";
        }
    image.setAttribute("src",`${img}`)
        imageNumber++
    })
    
})