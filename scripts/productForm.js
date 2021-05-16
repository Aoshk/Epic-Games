const productForm = document.querySelector(".productForm");
const divImages = document.querySelector(".productFormImageContainer")

const imageFiles = [];

//actualiza la vista previa de la imagen
productForm.image.addEventListener("change", () => {


    const file = productForm.image.files[0]
    if (!file) return;
    var reader = new FileReader();

    reader.onload = function (e) {
        const productImg = document.createElement("img");
        productImg.classList.add("productFormImg")
        productImg.setAttribute("src", e.target.result);
        divImages.appendChild(productImg);
    }

    reader.readAsDataURL(file);
    imageFiles.push(file);

});


//evento de subir el producto
productForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const product = {
        name: productForm.name.value,
        price: parseFloat(productForm.price.value),
        genre: productForm.genre.value,
        rating:productForm.rating.value,
        description: productForm.description.value,
        metacritic: productForm.metacritic.value,
        createdAt: Date.now()
    }

    db.collection("products").add(product).then(function (docref) {

        const uploadPromises = [];
        const downloadURLPromises = [];


        //recorre arreglo de imagenes y las sube
        imageFiles.forEach(function (file) {

            let storageRef = firebase.storage().ref();
            let fileRef = storageRef.child(`products/${docref.id}/${file.name}`);

            uploadPromises.push(fileRef.put(file))

        })

        //espera  a que se suba todas las imagenes y obtiene url 
        Promise.all(uploadPromises).then(function (snapshots) {

            snapshots.forEach(function (snapshot) {

                downloadURLPromises.push(snapshot.ref.getDownloadURL())

            });

            Promise.all(downloadURLPromises).then(function (dowloadURL) {
                const images= []

                dowloadURL.forEach(function (url,index){

                    images.push({

                        url:url,
                        ref:snapshots[index].ref.fullPath
                    });

                })

                db.collection("products").doc(docref.id).update({

                    images:images
                }).then(function (){

                    alert("producto subido satisfactoriamente")
                })

                
            })

        })
    }).catch(function (error){


        console.log(error)
    })


    





});



