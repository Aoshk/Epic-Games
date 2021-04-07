const productForm = document.querySelector(".productForm");


productForm.addEventListener("submit", (event)=>{

    event.preventDefault();

    const product = {

    name: productForm.name.value,
    price: productForm.price.value,
    genre: productForm.genre.value,
    description: productForm.description.value,
    metacritic: productForm.metacritic.value,
    }

    console.log(product);

})

