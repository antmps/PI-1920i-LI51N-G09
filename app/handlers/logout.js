const templates = require('../templates')

module.exports = () => {
    
    document.querySelector("#mainContent").innerHTML = templates.logout()
    document
        .querySelector('#buttonLogout')
        .addEventListener('click', logoutHandler)
    
    function logoutHandler(ev) {
        ev.preventDefault()
        const url = 'http://localhost:8080/api/auth/logout'
        const options = {
            method: 'POST',
            credentials: 'include',
        }
        fetch(url, options)
            .then(res => res.json())
            .then(() => {
                document.getElementById("alertContent").innerHTML = templates.info({message : 'Logout'})
                document.getElementById("login").style.visibility = "visible"
                document.getElementById("logout").style.visibility = "hidden"
                document.getElementById("groups").style.visibility = "hidden"
                document.getElementById("username").innerText = ""
                document.getElementById("username").style.visibility = "hidden"
                window.location.hash = '#home'
            })
            .catch((err)=>  document.getElementById("alertContent").innerHTML = templates.info({message : err.message}))
    }

}