const cartProductList = document.querySelector(".cartProductList")
const purchaseBtn = document.querySelector(".purchaseBtn")
const totalValue = document.querySelector(".totalValue")
const totalItems = document.querySelector(".totalItems")
let total = 0;


showCart =()=>{

    cartProductList.innerHTML =""
    cart.forEach((data)=>{

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
        const removeProduct =cartProduct.querySelector(".removeProduct");

      
        removeProduct.addEventListener("click",()=>{
            console.log(cart)

            cart.forEach(element=>{

                
                if(element.id==data.id){
    
                    cart.splice(element,1)   
                }
            })

            
            cartCollection.doc(activeUser.uid).set({cart}).then(()=>{
                showCart()
            })
        })
        total+=data.price
        cartProductList.appendChild(cartProduct)
    
    })
    
    totalValue.innerText ="$ "+ total
    totalItems.innerText = cart.length
}

purchaseBtn.addEventListener("click",()=>{


    window.location.href= "./checkout.html"
})
    


