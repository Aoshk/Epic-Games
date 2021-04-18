const auth = firebase.auth()
const inputEmail=document.querySelector(".inputEmail")
const inputPassword=document.querySelector(".inputPassword")
const btnLogin=document.querySelector(".btnLogin")
const btnRegister=document.querySelector("btnRegister")


btnLogin.addEventListener("click",()=>{

    auth.signInWithEmailAndPassword(inputEmail.value,inputPassword.value).then(
        ()=>{

            window.location.href="index.html"
        }
    );

})
auth.onAuthStateChanged(


    (user) => {

        //hay un usuario logeado
        if (user!=null) {

            console.log(user)
           window.location.href="index.html"
           
        }

        
    }
)

// btnRegister.addEventListener("click",()=>{

//     window.location.href="register.html"
// })