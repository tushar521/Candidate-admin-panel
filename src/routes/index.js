'use strict'
const healthCheck = require('./healthCheck')
const users = require('./users')
const manageFiles = require('./manageFile')

module.exports = (app) => {
    app.use('/api', healthCheck)
    app.use('/api/user', users)
    app.use('/api/file', manageFiles)
}

    