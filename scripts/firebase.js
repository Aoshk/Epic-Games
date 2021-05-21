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
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const cartCollection = db.collection("cart")

logout.forEach(element => {

  element.addEventListener("click", logOut);

})

let cart = [];
const cartFromLocalStorage = localStorage.getItem("store__cart")
const cartNumber = document.querySelector(".cartNumber");

const setLoggedUser = (info) => {
  activeUser = info

}

auth.onAuthStateChanged(

  (user) => {

    //hay un usuario logeado
    if (user) {

      setLoggedUser(user)
      getCart()
      userLoggedIn()
      console.log("hay usuario logeado")

    }
    else {

      userLoggedOut()
      activeUser = null;
      cart = []

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

    cartCollection.doc(activeUser.uid).set({
      cart
    })
    cartNumber.innerText = cart.length
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

      cartNumber.innerText = data.cart.length
      cart=data.cart
      if(showCart)  showCart()
    })
  }


}
