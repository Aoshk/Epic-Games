function userLoggedIn() {

    login.forEach(element => {

        element.classList.add("hidden")
    })
    logout.forEach(element => {

        element.classList.remove("hidden")
    })
}

function userLoggedOut() {
    
    auth.signOut().then()
    login.forEach(element => {

        element.classList.remove("hidden")
    })
    logout.forEach(element => {

        element.classList.add("hidden")
    })
}