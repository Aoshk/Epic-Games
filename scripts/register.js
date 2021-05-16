const inputName = document.querySelector(".inputName")
const inputEmail = document.querySelector(".inputEmail")
const inputPassword = document.querySelector(".inputPassword")
const inputPassword2 = document.querySelector(".inputRepeatPassword")
const btnRegister = document.querySelector(".btnRegister")
//const btnLogin=document.querySelector("btnLogin")


Register = () => {

    //no hay campos vacios
    if (!(inputName.value == "" || inputEmail.value == "" || inputPassword.value == "" || inputPassword2.value == "")) {

        // las contraseñas coinciden

        if (inputPassword.value === inputPassword2.value) {

            auth.createUserWithEmailAndPassword(inputEmail.value, inputPassword.value).then(

                (data) => {

                    let user = {
                        id: data.user.uid,
                        name: inputName.value,
                        email: inputEmail.value
                    }
                    db.collection("users").doc(user.uid).set(user).then(()=>{

                        window.location.href="index.html"
                    })
                    
                }
            )

        }

        else {

            alert("Las contraseñas no coinciden")
        }

    }

    else {


        alert("Please fill all the blank fields")
    }
}



btnRegister.addEventListener("click", Register);
// btnLogin.addEventListener("click",()=>{

//     window.location.href="login.html"

// })