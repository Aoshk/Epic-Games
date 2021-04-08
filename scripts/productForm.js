const productForm = document.querySelector(".productForm");
const db = firebase.firestore();

console.log(db)
productForm.addEventListener("submit", (event)=>{

    event.preventDefault();

    const product = {

    name: productForm.name.value,
    price: parseFloat(productForm.price.value),
    genre: productForm.genre.value,
    description: productForm.description.value,
    metacritic: productForm.metacritic.value
    }

    
    console.log(product);
    db.collection("products").add(product);

})

