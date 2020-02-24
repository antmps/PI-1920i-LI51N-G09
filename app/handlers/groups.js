'use strict'

const groupsData = require('../data/groups-data')
const templates = require('../templates')
const mainContent = document.getElementById('mainContent')
const alertContent = document.getElementById('alertContent')

function groupDetails(groupId) {
    groupsData.getGroupById(groupId)
        .then(groups => {
            groups.id = groupId
            mainContent.innerHTML = templates.groupDetails({ groups })
        })
        .catch((err) => {
            alertContent.innerHTML = templates.error({ message: err.message })
            window.location.hash = 'myGroups'
        })
}

function removeGameFromGroup(groupId, gameId) {
    groupsData.deleteGameFromGroup(groupId, gameId)
        .then(response => {
            alertContent.innerHTML = templates.info({ message: 'Sucessfully removed game' })
            window.location.hash = `groupDetails/${groupId}`
        })
        .catch((err) => {
            alertContent.innerHTML = templates.error({ message: err.message })
            window.location.hash = `groupDetails/${groupId}`
        })
}

function myGroups() {
    groupsData.getGroupsByUsername()
        .then(groups => {
            mainContent.innerHTML = templates.groups({ groups })
            registerCreateGroup()
        })
        .catch((err) => {
        alertContent.innerHTML = templates.error({ message: err.message })
        window.location.hash = 'home'
    }
        )

}

function registerCreateGroup() {
    const buttonCreateGroup = document.getElementById('buttonCreateGroup')
    buttonCreateGroup.addEventListener('click', handleCreate)
    console.log('button create')

    function handleCreate(ev) {
        ev.preventDefault()
        window.location.hash = '#createGroup'
    }
}

function createGroup() {

    var inputName = document.querySelector('#inputName')
    var inputDescription = document.querySelector('#inputDescription')
    var buttonCancel = document.querySelector("#buttonCancel")
    var buttonCreate = document.querySelector("#buttonCreate")

    buttonCancel.addEventListener('click', handlerCancel)
    buttonCreate.addEventListener('click', handlerCreate)

    function handlerCancel(ev) {
        ev.preventDefault()
        window.location.hash = '#myGroups'
    }

    function handlerCreate(ev) {
        ev.preventDefault()
        const options = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'name': inputName.value,
                'description': inputDescription.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:8080/api/groups', options)
            .then(res => res.json())
            .then((id) => {
                if (id != undefined) {
                    window.location.hash = `#groupDetails/${id}`
                }
                else {
                    alertContent.innerHTML = templates.error({ message: 'Could not create group' })
                    window.location.hash = '#myGroups'
                }

            })
            .catch((err) => {
                alertContent.innerHTML = templates.error({ message: err.message })
                window.location.hash = '#myGroups'
            })
    }
}

function addToGroup(groupId, gameId) {
    groupsData.putGameinGroup(groupId, gameId)
        .then(res => res.json())
        .then(res => {
            if (res.body == groupId) {//sucessfull
                alertContent.innerHTML = templates.info({ message: "Successfully added game." })
                window.location.hash = `groupDetails/${groupId}`
            } else {
                alertContent.innerHTML = templates.info({ message: "Could not add game." })
            }
        })
        .catch((err) => {
            alertContent.innerHTML = templates.error({ message: "Not logged in." })
            window.location.hash = `gameDetails/${gameId}`
        })

}

module.exports = {

    groupDetails: groupDetails,
    removeGameFromGroup: removeGameFromGroup,
    myGroups: myGroups,
    addToGroup: addToGroup,
    createGroup: createGroup

}