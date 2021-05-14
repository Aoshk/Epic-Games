const list = document.querySelector(".list");
const filters = document.querySelector(".filter")


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
    <a>
    <div class="image__container">

    <img src="${img}"
         class="product__image">
</div>

<div class="product__info">
    
    <div class="product__title">

        <h2 class="title">${data.name}</h2>

    </div>
    <div class="secundaryInfo">
        <p class="product__price">${"$" + data.price}</p>
        <button class="product__btnAddToCart">Add</button>
    </div>
    
   </div>
   </a>
    `

        product.classList.add("product");
        list.appendChild(product);
    })

}



//escucha cambios al filtro
filters.addEventListener("change", () => {

    let productCollection = db.collection("products");

    //verfica que el filtro no esté vacio
    if (filters.genre.value) {
        productCollection = productCollection.where("genre", "==", filters.genre.value);
    }

    if(filters.rating.value) {
        productCollection = productCollection.where("rating", "==", filters.rating.value);
    }
    if(filters.price.value){

        switch(filters.price.value){

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
    productCollection.get().then(showList);

})



db.collection("products").get().then(showList);







