const productForm = document.querySelector(".productForm");
const db = firebase.firestore();
const storage = firebase.storage();
const productImg = document.querySelector(".productFormImg");

let storageRef= firebase.storage().ref();

console.log(productForm)

//actualiza la vista previa de la imagen
productForm.image.addEventListener("change",()=>{

    var reader = new FileReader();

    reader.onload = function(e){

        productImg.setAttribute("src",e.target.result);
    }

    reader.readAsDataURL(productForm.image.files[0]);
});



//evento de subir el producto
productForm.addEventListener("submit", (event)=>{

    event.preventDefault();

    // const product = {
    // name: productForm.name.value,
    // price: parseFloat(productForm.price.value),
    // genre: productForm.genre.value,
    // description: productForm.description.value,
    // metacritic: productForm.metacritic.value
    // }

    
    console.log(productForm.image.files);
    //db.collection("products").add(product);

})

