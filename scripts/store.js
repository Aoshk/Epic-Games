const list = document.querySelector(".list");

db.collection("products").get().then(querySnapshot => {
   
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = document.createElement("div");
        let img = data.images[0]?.url;
        if(!img){

            img='./data/placeholder.png'
        }
        product.innerHTML = ` 
    <a>
    <div class="image__container">

    <img src="${img}
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

});







