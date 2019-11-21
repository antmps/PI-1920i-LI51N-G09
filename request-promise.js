'use strict'

const request = require('request')

module.exports = function () {

    return {
        request: promiseRequest
    }

    function promiseRequest(options) {
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
                if (err===null || err===undefined){
                    resolve(body)
                } else {
                    reject(err)
                }
            })
        })
    }
}