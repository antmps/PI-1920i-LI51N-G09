module.exports = function (ciborgDB) {
  let currentUser;

  return {
    authenticate: authenticate,
    getUser: getUser,
    logout: logout,
    createUser: createUser
  }

  async function authenticate(username, pass) {

    return ciborgDB.getAllUsers()
      .then(users => {
        var result = users.find(user => { return user.username == username })
        if (result != undefined) {
          currentUser = { id: 1, username: result.username }
          if (result.password == pass) return currentUser
          else throw new Error("Wrong password")
        }
        else throw new Error("User does not exist")
      })
  }

  async function getUser(userId) {
    return currentUser
  }

  async function logout(userId) {
    currentUser = undefined
  }

  async function createUser(username, pass) {
  
    return ciborgDB.getAllUsers()
      .then(users => {
        var result = users.find(user => { return user.username == username })
        if (result == undefined) return ciborgDB.postUser({
          username: username,
          password: pass
        })
        else throw new Error("User already exists")
      })
  }
}