'use strict'
const router = require('express').Router()
const healthCheckCtrl = require('../controller/healthCheck')

// const { authMiddleware } = require('../middlewares/authentication')
// const { authorizationMiddleware } = require('../middlewares/authorization')

router.get('/health', healthCheckCtrl.healthCheck)

module.exports = router