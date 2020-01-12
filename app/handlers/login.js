const templates = require('../templates')

module.exports = () => {
   
    document.querySelector("#mainContent").innerHTML = templates.login()
    
    const inputPassword = document.querySelector('#inputPassword')
    const inputUsername = document.querySelector('#inputUsername')
    const buttonLogin = document.querySelector("#buttonLogin")
    const buttonSigUp = document.querySelector("#buttonSignup")

    buttonLogin.addEventListener('click', handlerLogin)
    buttonSigUp.addEventListener('click', handlerSignUp)

    function handlerLogin(ev) {
        ev.preventDefault()    
        const options = {
            method: 'POST',
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
            .then((user) =>{
                document.getElementById("alertContent").innerHTML = templates.info({message : "Login " + user.username})
                document.getElementById("login").style.visibility = "hidden"
                document.getElementById("username").innerText = user.username
                document.getElementById("username").style.visibility = "visible"
                window.location.hash = '#home'
            })
            .catch((err)=>  document.getElementById("alertContent").innerHTML = templates.info({message : err.message}))
    }

    function handlerSignUp(ev){
        ev.preventDefault()    
        const options = {
            method: 'POST',
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
            .then((user) =>{
                document.getElementById("alertContent").innerHTML = templates.info({message : "Registered " + user.username})
                window.location.hash = '#login'
            })
            .catch((err)=>  document.getElementById("alertContent").innerHTML = templates.info({message : err.message}))
    }
}