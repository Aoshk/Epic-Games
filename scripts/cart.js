const cartProductList = document.querySelector(".cartProductList")
let total = 0;


cart.forEach((data) => {

    const cartProduct = document.createElement("div");
    let img = data.images[0]?.url;
    
    if (!img) {

        img = "./data/placeHolder.png";
    }
    cartProduct.innerHTML = `
    
    <div class="cartProduct__image">
    <img src="${img}"
        alt="">
            </div>
    <div class="cartProduct__info">
        <h2>${data.name}</h2>
        <a href="#" class="removeProduct">Remove</a>
    </div>
    <div class="cartProduct__price">
        <p>$ ${data.price}</p>
    </div>
</div>
    `
    cartProduct.classList.add("cartProduct");
    total+=data.price
    cartProductList.appendChild(cartProduct)

})