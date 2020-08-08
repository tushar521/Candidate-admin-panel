'use strict'
const router = require('express').Router()
const usersCtrl = require('../controller/users')

router.post('/register', usersCtrl.register)
router.post('/login', usersCtrl.login)
router.post('/forgot-password', usersCtrl.forgotPassword)
router.get('/verify-account', usersCtrl.verifyAccount)
router.get('/allusers', usersCtrl.allUsers)
router.post('/searchUser', usersCtrl.searchUser)

module.exports = router