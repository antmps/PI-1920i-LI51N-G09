'use strict';
//access to Board Game Atlas API

const request = require('request');

module.exports = function(){

    const client_id = 'etqXeYXMnh'; 
    const baseUrl = 'https://www.boardgameatlas.com/api/';
    const limit1 = 'limit=1'
    const limit = 'limit=10'


    return {
        getTopGames : getTopGames,
        getGameByName : getGameByName,
        getGameById : getGameById,
        getGameBasicInfo : getGameBasicInfo
    }

    function getGameBasicInfo(gameBody){

        return{
            id : gameBody.id,
            name : gameBody.name,
            min_playtime : gameBody.min_playtime,
            max_playtime : gameBody.max_playtime
        }

    }

    function getTopGames(cb){
        const options = {
            url: `${baseUrl}search?order_by=popularity&client_id=${client_id}&${limit}`,
            method: 'GET',
            json: true
        };
        return promise.request(options)
            .then(body => body)
            .catch(err => { throw err })
    }

    function getGameByName(name, cb){
        const options = {
            url: `${baseUrl}search?name=${name}&client_id=${client_id}&${limit}`,
            method: 'GET',
            json: true
        };
        return promise.request(options)
            .then(body => body)
            .catch(err => { throw err })
    }

    function getGameById(gameId, cb){
        const options = {
            url: `${baseUrl}search?ids=${gameId}&client_id=${client_id}`,
            method: 'GET',
            json: true
        };
        return promise.request(options)
            .then(body => body)
            .catch(err => { throw err })
    }
}