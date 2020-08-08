'use strict'
const router = require('express').Router()
const manageFileCtrl = require('../controller/manageFile')

router.post('/upload', manageFileCtrl.uploadFile)

module.exports = router