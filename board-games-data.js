'use strict';
//access to Board Game Atlas API

const request = require('request');

module.exports = function(){

    const host = 'https://www.boardgameatlas.com/api/';
    const client_id = 'etqXeYXMnh'; 
    const baseUrl = `http://${host}`;

    return {
        getTopGames : getTopGames,
        getGameByName : getGameByName
    };

    function getTopGames(cb){
        const options = {
            url: `${baseUrl}search?limit=10&order_by=popularity&client_id=${client_id}`,
            json: true
        };
        request.get(options,(err,res,body)=>{
            cb(err,JSON.parse(body));
        });
    }

    function getGameByName(name, cb){
        const options = {
            url: `${baseUrl}search?name=${name}&client_id=${client_id}`,
            json: true
        };
        request.get(options,(err,res,body)=>{
            cb(err,JSON.parse(body));
        });
    }
}