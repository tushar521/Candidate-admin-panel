'use strict'
const healthCheckService = require('../service/healthCheck')
const logger = require('../middlewares/logger')
const utils = require('../utils/utils')

const healthCheck = async (req, res) => {
    try {
        const result = await healthCheckService.healthCheck()
        return res.send(utils.globalResponse(result, 'Success', false, ''));
    } catch (error) {
        logger.error('Error while adding new patter: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Fail', true, error))
    }
}

module.exports = {
    healthCheck
}