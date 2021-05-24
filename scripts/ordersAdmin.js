const ordersContainer = document.querySelector(".ordersContainer")

if (!checkForAdmin) {

    location.href = '/store.html';
}

else {

    db.collection("orders").get().then((snapshot) => {

        snapshot.forEach((doc) => {

            
            const order = document.createElement("div");
            order.innerHTML=`
            
            <h2>${doc.data().name}</h2>
            `
            order.classList = "order"
            const orden = doc.data()

            orden.ids.forEach((id) => {

                productCollection.doc(id).get().then((snapshot) => {

                    const product = snapshot.data()

                    const cartProduct = document.createElement("div")

                    let img = product.images[0]?.url;

                    if (!img) {

                        img = "./data/placeHolder.png";
                    }

                    cartProduct.innerHTML = `
                    
                    <div class="cartProduct__image">
                    <img src="${img}"
                        alt="">
                            </div>
                    <div class="cartProduct__info">
                        <h2>${product.name}</h2>
                    </div>
                    <div class="cartProduct__price">
                        <p>$ ${product.price}</p>
                    </div>
                </div>
                    `
                    cartProduct.classList.add("cartProduct");
                    order.appendChild(cartProduct);
                })

            })

            ordersContainer.appendChild(order)


        })
    })

}



