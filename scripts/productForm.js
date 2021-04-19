const productForm = document.querySelector(".productForm");
const db = firebase.firestore();
const storage = firebase.storage();
const productImg = document.querySelector(".productFormImg");

const imageFiles=[];



//actualiza la vista previa de la imagen
productForm.image.addEventListener("change", () => {

    var reader = new FileReader();

    reader.onload = function (e) {

        productImg.setAttribute("src", e.target.result);
    }

    reader.readAsDataURL(productForm.image.files[0]);

});


//evento de subir el producto
productForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const product = {
    name: productForm.name.value,
    price: parseFloat(productForm.price.value),
    genre: productForm.genre.value,
    description: productForm.description.value,
    metacritic: productForm.metacritic.value
    }

    

    let storageRef = firebase.storage().ref();
    const file =productForm.image.files[0];

    let fileRef = storageRef.child(`images/${product.name}/${file.name}`);
    console.log(productForm.image.files);

    fileRef.put(file).then((snapshot)=>{

        snapshot.ref.getDownloadURL().then((downloadURL)=>{
        
        product.imageURL=downloadURL;
        product.imageRef=snapshot.ref.fullPath;

        db.collection("products").add(product);

        })

    })
    

});



