module.exports = function (ciborgDB) {
  let currentUser;

  return {
    createUser: createUser,
    authenticate: authenticate,
    getUser: getUser,
    logout: logout,
  }

  async function createUser(username, pass) {
    return ciborgDB.getAllUsers()
      .then(users => {
        var result = users.find(user => { return user.username == username })
        if (result == undefined) ciborgDB.postUser({
          username: username,
          password: pass
        })
        else throw new Error("User already exists")
      })
  }

  async function authenticate(username, pass) {



    return currentUser = {
      id: 1,
      username: username
    }
  }

  async function getUser(userId) {
    return currentUser
  }

  async function logout(userId) {
    currentUser = undefined
  }
}