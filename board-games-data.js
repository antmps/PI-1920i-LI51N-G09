'use strict';
//access to Board Game Atlas API

const request = require('request');

module.exports = function(){

    const client_id = 'etqXeYXMnh'; 
    const baseUrl = 'https://www.boardgameatlas.com/api/';
    const limit = 'limit=30'

    return {
        getTopGames : getTopGames,
        getGameByName : getGameByName,
        getGameById : getGameById
    }

    function getTopGames(cb){
        const options = {
            url: `${baseUrl}search?limit=10&order_by=popularity&client_id=${client_id}&${limit}`,
            json: true
        };
        request.get(options,(err,res,body)=>{
            cb(err,body);
        });
    }

    function getGameByName(name, cb){
        const options = {
            url: `${baseUrl}search?name=${name}&client_id=${client_id}&${limit}`,
            json: true
        };
        request.get(options,(err,res,body)=>{
            cb(err,body);
        });
    }

    function getGameById(gameId, cb){
        const options = {
            url: `${baseUrl}search?id=${gameId}&client_id=${client_id}&${limit}`,
            json: true
        };
        request.get(options,(err,res,body)=>{
            cb(err,body);
        });
    }
}