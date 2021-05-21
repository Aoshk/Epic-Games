const checkoutContainer = document.querySelector(".checkoutContainer")
const checkoutForm = document.querySelector(".checkoutForm")


checkoutContainer.addEventListener("submit", function (event) {

    event.preventDefault()

    const productsId = [];
    cart.forEach(function (data) {
        productsId.push(data.id);
    });


    const order = {
        cc: checkoutForm.cc.value,
        name: checkoutForm.name.value,
        address: checkoutForm.address.value,
        cardNumber: checkoutForm.cardNumber.value,
        userId: activeUser.uid,
        ids: productsId

    }

    orderCollection.add(order).then(() => {

        cartCollection.doc(activeUser.uid).set({ cart: [] })

        location.href = '/store.html';
    })

})