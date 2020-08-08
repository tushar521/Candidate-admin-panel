const crypto = require('crypto')
const logger = require('../middlewares/logger')
const { transport } = require('./transport')

const algorithm = 'aes-128-cbc';
const key = 'stockdesign_backend';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';


module.exports = {
    dbCons: require('../constants/db-constant'),
    msgCons: require('../constants/msg-constant'),
    httpStatusCodes: require('http-status-codes'),
    httpContext: require('express-http-context'),
    _lodash: require('lodash'),

    responseGenerators: function (responseData, responseStatusCode, responseStatusMsg, responseErrors) {
        var responseJson = {}
        responseJson['data'] = responseData
        responseJson['status_code'] = responseStatusCode
        responseJson['status_message'] = responseStatusMsg

        // errors
        if (responseErrors === undefined) {
            responseJson['response_error'] = []
        } else {
            responseJson['response_error'] = responseErrors
        }

        return responseJson
    },

    globalResponse: function (data, message, errorStatus, errorDescription) {
        const response = {}
        if (data) {
            response['data'] = data
        } else {
            response['data'] = []
        }
        response['message'] = message
        response['error'] = errorStatus
        response['description'] = errorDescription
        return response
    },

    checkValidEmail: function (email) {
        // eslint-disable-next-line no-useless-escape
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    },

    swapJsonKeyToValue: (json) => {
        const response = {}
        for (let key in json) {
            response[json[key]] = key
        }
        return response
    },

    mergeJsons: function (a, b) {
        if (a && b) {
            for (var key in b) {
                a[key] = b[key]
            }
        }
        return a
    },

    errorObjectGenrator: function (code, msg) {
        var responseJson = {}
        // CODE
        if (typeof code === 'undefined') {
            responseJson['error_code'] = 500
        } else {
            responseJson['error_code'] = code
        }

        // MSG
        if (msg === undefined) {
            responseJson['error_message'] = 'Something went wrong'
        } else {
            responseJson['error_message'] = msg
        }

        return responseJson
    },

    isEmpty(object) {
        for (var key in object) {
            // eslint-disable-next-line no-prototype-builtins
            if (object.hasOwnProperty(key)) {
                return false
            }
        }
        return true
    },

    convertIntoArray: function (jsonObject) {
        if (!Array.isArray(jsonObject)) {
            return [jsonObject]
        }
        return jsonObject
    },

    encyptData: function (data) {
        const mykey = crypto.createCipher(algorithm, key);
        let mystr = mykey.update(data, inputEncoding, outputEncoding);
        mystr += mykey.final('hex');
        return mystr;
    },

    decryptData: function (data) {
        const mykey = crypto.createDecipher(algorithm, key);
        let mystr = mykey.update(data, outputEncoding, inputEncoding);
        mystr += mykey.final('utf8');
        return mystr;
    },

    sendEmail: async function (mailOptions) {
        try {
            // to, from, subject, text, html, attachments
            await transport.sendMail(mailOptions, (error, _info) => {
                if (error) {
                    logger.error(`Error while sending mail: %j %s`, error, error)
                    return false
                }
                logger.debug(`Mail sent successfully to user: ${mailOptions.to}`)
                return true
            });
        } catch (error) {
            return false
        }
    },

    getProjectionJson: function (array) {
        const json = {}
        if (array.indexOf('_id') > -1) json._id = true
        for (let elem of array) {
            json[elem] = true
        }
        return json
    },

    checkValidIP: (ip) => {
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        return regex.test(ip)
    }
}