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

  
  const login = document.querySelectorAll(".login");
  const logout = document.querySelectorAll(".logout");
  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  logout.forEach(element =>{

    element.addEventListener("click",logOut);

  })
  
  auth.onAuthStateChanged(

    (user) => {

        //hay un usuario logeado
        if (user) {
            
          console.log(user.email);
            login.forEach(element=>{

              element.classList.add("hidden")
            })
            logout.forEach(element=>{

              element.classList.remove("hidden")
            })
        
        }
        else{

          login.forEach(element=>{

            element.classList.remove("hidden")
          })
          logout.forEach(element=>{

            element.classList.add("hidden")
          })
        }

        
    }
)

function logOut(){

  auth.signOut().then(()=>{

    window.location.href="index.html"
  })
  console.log("deslogueado")
}

    