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
            registerEditGroup(groups)
            registerFilterGames(groups)
        })
        .catch((err) => {
            alertContent.innerHTML = templates.error({ message: err.message })
            window.location.hash = 'myGroups'
        })
}

function registerEditGroup(group) {
    const buttonEditGroup = document.getElementById('buttonEditGroup')
    buttonEditGroup.addEventListener('click', handleEdit)

    function handleEdit(ev) {
        ev.preventDefault()
        const groupName = document.getElementById('groupName')
        const groupDesc = document.getElementById('groupDesc')

        groupName.innerHTML = '<input class="textboxStyle" type="text" id="inputName">'
        const inputName = document.querySelector('#inputName')
        inputName.value = group.name

        groupDesc.innerHTML = '<input class="textboxStyle" type="text" id="inputDesc">'
        const inputDesc = document.querySelector('#inputDesc')
        inputDesc.value = group.description

        buttonEditGroup.innerText = 'Save'

        buttonEditGroup.removeEventListener('click', handleEdit)
        registerSaveEditGroup(group)
    }
}

function registerSaveEditGroup(groups) {
    const buttonEditGroup = document.getElementById('buttonEditGroup')
    buttonEditGroup.addEventListener('click', handleSave)

    function handleSave(ev) {
        ev.preventDefault()

        const inputName = document.querySelector('#inputName')
        var name = inputName.value

        const inputDesc = document.querySelector('#inputDesc')
        var desc = inputDesc.value

        groupsData.updateGroup(groups.id, name, desc)
            .then(response => {
                groups.name = name
                groups.description = desc
                alertContent.innerHTML = templates.info({ message: 'Sucessfully updated group' })
                mainContent.innerHTML = templates.groupDetails({ groups })
            })
            .catch((err) => {
                alertContent.innerHTML = templates.error({ message: err.message })
                window.location.hash = `myGroups`
            })
    }
}

function registerFilterGames(groups){
    const buttonFilter = document.getElementById('buttonFilter')
    buttonFilter.addEventListener('click', handleFilter)

    function handleFilter(ev){
        ev.preventDefault()
        const inputMin = document.getElementById('inputMin')
        const inputMax = document.getElementById('inputMax')
        const groupGamesTable = document.getElementById('groupGamesTable')

        groupsData.getGamesFromGroupByPlaytime(groups.id,inputMin.value, inputMax.value)
            .then(games=>{
                groups.games=games
                groupGamesTable.innerHTML = templates.tableGamesGroupTemplate({ groups })
            })
            .catch((err) => {
                alertContent.innerHTML = templates.error({ message: err.message })
            })
    }
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
        groupsData.postGroup(inputName.value, inputDescription.value)
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
        .then(res => {
            if (res == groupId) {//sucessfull
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