const templates = require('../templates')

module.exports = () => {

    document.querySelector("#mainContent").innerHTML = templates.login()

    const inputPassword = document.querySelector('#inputPassword')
    const inputUsername = document.querySelector('#inputUsername')
    const buttonLogin = document.querySelector("#buttonLogin")
    const buttonSigUp = document.querySelector("#buttonSignup")
    const alertContent = document.getElementById('alertContent')


    buttonLogin.addEventListener('click', handlerLogin)
    buttonSigUp.addEventListener('click', handlerSignUp)

    function handlerLogin(ev) {
        ev.preventDefault()
        const options = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'username': inputUsername.value,
                'password': inputPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:8080/api/auth/login', options)
            .then(res => res.json())
            .then((user) => {
                if (user.username != undefined) {
                    showLogin(user.username)
                }
                else {
                    alertContent.innerHTML = templates.error({ message: 'Could not login' })
                    window.location.hash = '#login'
                }

            })
            .catch((err) => alertContent.innerHTML = templates.error({ message: err.message }))
    }

    function handlerSignUp(ev) {
        ev.preventDefault()
        if (inputUsername.value == '' ) {
            alertContent.innerHTML = templates.error({ message: "Username cannot be empty" })
            window.location.hash = '#login'
            return
        }
        if (inputPassword.value == '') {
            alertContent.innerHTML = templates.error({ message: "Password cannot be empty" })
            window.location.hash = '#login'
            return
        }
        const options = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'username': inputUsername.value,
                'password': inputPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:8080/api/auth/signup', options)
            .then(res => res.json())
            .then((user) => {
                if (user.username == undefined) {
                    alertContent.innerHTML = templates.error({ message: user.message })
                }
                else alertContent.innerHTML = templates.info({ message: "Registered " + user.username })
                window.location.hash = '#login'
            })
            .catch((err) => alertContent.innerHTML = templates.error({ message: err.message }))
    }

    function showLogin(username) {
        alertContent.innerHTML = templates.info({ message: "Login " + username })
        document.getElementById("login").style.visibility = "hidden"
        document.getElementById("logout").style.visibility = "visible"
        document.getElementById("groups").style.visibility = "visible"
        document.getElementById("username").innerText = username
        document.getElementById("username").style.visibility = "visible"
        window.location.hash = '#home'
    }
}