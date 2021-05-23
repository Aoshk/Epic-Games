// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBZDbhptmWRsjZFpfQmF5h1a4JQ36acF74",
  authDomain: "epic-store-72502.firebaseapp.com",
  projectId: "epic-store-72502",
  storageBucket: "epic-store-72502.appspot.com",
  messagingSenderId: "509566163963",
  appId: "1:509566163963:web:e899a3a54952a88ade895e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let activeUser = null


const login = document.querySelectorAll(".login");
const logout = document.querySelectorAll(".logout");
const cartNumber = document.querySelectorAll(".cartNumber");
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const cartCollection = db.collection("cart")
const orderCollection = db.collection("orders")
const botonMenu = document.querySelector(".imgMenuMobile");
const menuMobile = document.querySelector(".divMenuMobile");
const closeMenu = document.querySelector(".closeMenu");

logout.forEach(element => {

  element.addEventListener("click", logOut);

})

botonMenu.addEventListener("click", ()=>{

  menuMobile.style.display = "block"
});

closeMenu.addEventListener("click", ()=>{

  menuMobile.style.display = "none"
})

let cart = [];
const cartFromLocalStorage = localStorage.getItem("store__cart")
let checkForAdmin = null

const setLoggedUser = (info) => {
  activeUser = info

  if(checkForAdmin) checkForAdmin()


}

auth.onAuthStateChanged(

  (user) => {

    //hay un usuario logeado
    if (user) {

      db.collection("users").doc(user.uid).get().then((doc)=>{

        
        setLoggedUser(doc.data())
        getCart()
        userLoggedIn()
        console.log("hay usuario logeado")
  

      })

     
    }
    else {

      userLoggedOut()
      activeUser = null;
      cart = []
      if(checkForAdmin) checkForAdmin() 

    }


  }
)

function logOut() {

  auth.signOut().then(() => {

    userLoggedOut()
  })

}


const addToCart = (product) => {

  if (activeUser) {

    cart.push(product)
    console.log(activeUser)

    cartCollection.doc(activeUser.uid).set({
      cart
    })
    
    cartNumber.forEach(number=>{

      number.innerText = cart.length
    })
    
  }

  else {

    alert("no hay usuario logeado")
  }

}
let showCart =null;

const getCart = () => {

  if (!activeUser) {

    console.log("no logeado")
  }

  else {
    cartCollection.doc(activeUser.uid).get().then(snapshots => {

      const data = snapshots.data()
      if (!data) return;

      
      cart=data.cart
      cartNumber.forEach(number=>{

        number.innerText = cart.length
        
      })
      if(showCart)  showCart()
    })
  }


}
