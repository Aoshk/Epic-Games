const params = new URLSearchParams(location.search);
const id = params.get("id")
const banner = document.querySelector(".productInfo__bannerContainer")
const price = document.querySelector(".price")
const title = document.querySelector(".title")
const metacritic = document.querySelector(".metacritic")
const rating = document.querySelector(".rating")
const description = document.querySelector(".description")
const btnAddToCart = document.querySelector(".btnAddToCart")
const productImages = document.querySelectorAll(".productImage")
const suggestedOffers = document.querySelector(".suggestedOffers__list")
let currentProduct;

var imageNumber = 1

if (!id) {

    location.href = "./404.html"
}

db.collection("products").doc(id)
    .get().then(function (doc) {

        const data = doc.data()
        currentProduct = data;
        console.log(currentProduct)
        createSuggestedOffers()
        let img0 = data.images[0]?.url;

        if (!img0) {

            img0 = "./data/placeHolder.png";
        }
        if (!data) {

            location.href = "./404.html"
        }

        banner.style.backgroundImage = `url(${img0})`;
        price.innerText = `$ ${data.price}`
        title.innerText = `${data.name}`
        metacritic.innerText = `${data.metacritic}/100`
        rating.innerText = `${data.rating}`
        description.innerText = `${data.description}`

        productImages.forEach(image => {
            let img = data.images[imageNumber]?.url;

            if (!img) {

                img = "./data/placeHolder.png";
            }
            image.setAttribute("src", `${img}`)
            imageNumber++
        })

        btnAddToCart.addEventListener("click", () => {

            if (cart.includes(data)) {
                alert("You already added this product to your cart")
            }
            else {

                addToCart(data)
            }



        })

    })

function createSuggestedOffers() {

    db.collection("products").where("name", "!=", currentProduct.name).limit(3).get().then(function (querySnapshot) {

        querySnapshot.forEach((doc) => {

            const datos = doc.data();
            console.log(datos)
            const product = document.createElement("div");
            let img = datos.images[0]?.url;

            if (!img) {

                img = "./data/placeHolder.png";
            }

            product.innerHTML = ` 
        <a href ="./product.html?id=${doc.id}&=${datos.name}">
        <div class="image__container">
    
        <img src="${img}"
             class="product__image">
    </div>
    
    <div class="product__info">
        
        <div class="product__title">
    
            <h2 class="title">${datos.name}</h2>
    
        </div>
        </a>
        <div class="secundaryInfo">
            <p class="product__price">${"$" + datos.price}</p>
            <button class="product__btnAddToCart">Add</button>
        </div>
        
       </div>
       
        `

            product.classList.add("product");
            suggestedOffers.appendChild(product);
            const cartBtn = product.querySelector(".product__btnAddToCart");

            cartBtn.addEventListener("click", () => {

                if (cart.includes(currentProduct)) {
                    alert("You already added this product to your cart")
                }
                else {

                    cart.push(currentProduct)
                    localStorage.setItem("store__cart", JSON.stringify(cart))
                    
                    cartNumber.forEach(number => {

                        number.innerText = cart.length
                    })
                }



            })
        })


    })

}

