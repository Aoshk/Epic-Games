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


auth.onAuthStateChanged(

  (user) => {

    //hay un usuario logeado
    if (user) {

      activeUser = user;
      userLoggedIn()

    }
    else {

      userLoggedOut()

    }


  }
)

function logOut() {

  auth.signOut().then(() => {

    userLoggedOut()
  })

}


const addToCart = (product) => {

  cart.push(product)

  if (activeUser) {
    cartCollection.doc(activeUser.uid).set({
      cart
    })
    cartNumber.innerText = cart.length
  }

  else {

    alert("no hay usuario logeado")
  }

}


const getCart = () => {

  cartCollection.get().then(snapshots => {

    cartNumber.innerText = snapshots.docs.length
    snapshots.forEach(element => {
      const product = element.data();
      cart.push(product)

    })

  })

}
getCart()