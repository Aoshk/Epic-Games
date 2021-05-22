const list = document.querySelector(".list");
const filters = document.querySelector(".filter");

const showList = (querySnapshot) => {

    list.innerHTML = ""
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement("div");
        let img = data.images[0]?.url;

        if (!img) {

            img = "./data/placeHolder.png";
        }

        product.innerHTML = ` 
    <a href ="./product.html?id=${doc.id}&=${data.name}">
    <div class="image__container">

    <img src="${img}"
         class="product__image">
</div>

<div class="product__info">
    
    <div class="product__title">

        <h2 class="title">${data.name}</h2>

    </div>
    </a>
    <div class="secundaryInfo">
        <p class="product__price">${"$" + data.price}</p>
        <button class="product__btnAddToCart">Add</button>
    </div>
    
   </div>
   
    `

        product.classList.add("product");
        list.appendChild(product);
        const cartBtn = product.querySelector(".product__btnAddToCart");

        cartBtn.addEventListener("click", () => {
            
            let productExist = false;

            cart.forEach(element => {
                if (element.name==data.name) {
                    productExist=true;
                }
            })

            if (productExist) {
                alert("You already added this product to your cart")
            }
            else {

                addToCart({
                    ...data,
                    id: doc.id
                })
            }

        })
    })

}



//escucha cambios al filtro
filters.addEventListener("change", () => {

    let productCollection = db.collection("products");

    //verfica que el filtro no esté vacio
    if (filters.genre.value) {
        productCollection = productCollection.where("genre", "==", filters.genre.value);
    }

    if (filters.rating.value) {
        productCollection = productCollection.where("rating", "==", filters.rating.value);
    }
    if (filters.price.value) {

        switch (filters.price.value) {

            case "0":
                productCollection = productCollection.where("price", "<", 100000);
                break;

            case "1":
                productCollection = productCollection.where("price", ">", 100000);
                productCollection = productCollection.where("price", "<", 200000);
                break;
            case "2":
                productCollection = productCollection.where("price", ">", 200000);
                break;
        }



    }

    if (filters.order.value) {

        switch (filters.order.value) {

            case "recent":
                if (filters.price.value) {
                    productCollection = productCollection.orderBy("price", "desc")
                }
                productCollection = productCollection.orderBy("createdAt", "desc")
                break;
            case "price_asc":
                productCollection = productCollection.orderBy("price", "asc")
                break;
            case "price_desc":
                productCollection = productCollection.orderBy("price", "desc")
                break;
            case "alpha_asc":
                if (filters.price.value) {
                    productCollection = productCollection.orderBy("price", "desc")
                }
                productCollection = productCollection.orderBy("name", "asc")
                break;
            case "alpha_desc":
                if (filters.price.value) {
                    productCollection = productCollection.orderBy("price", "desc")
                }
                productCollection = productCollection.orderBy("name", "desc")
                break;
        }

    }
    productCollection.get().then(showList);

})



db.collection("products").get().then(showList);







