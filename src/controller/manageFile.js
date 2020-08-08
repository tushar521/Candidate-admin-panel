'use strict'
const manageFileService = require('../service/manageFile')
const logger = require('../middlewares/logger')
const utils = require('../utils/utils')

const uploadFile = async (req, res) => {
    try {
        const body = req.body
        const files = req.files
        const result = await manageFileService.uploadFile(files, body)
        return res.send(utils.globalResponse(result, 'Success', false, ''));
    } catch (error) {
        logger.error('Error while user registration: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Error while user registration', true, error))
    }
}

module.exports = {
    uploadFile
}