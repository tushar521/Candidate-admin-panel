'use strict'
const usersService = require('../service/users')
const logger = require('../middlewares/logger')
const utils = require('../utils/utils')

const register = async (req, res) => {
    try {
        const host = req.hostname
        const body = req.body
        const result = await usersService.register(body, host)
        return res.send(utils.globalResponse(result, 'Success', false, ''));
    } catch (error) {
        logger.error('Error while user registration: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Error while user registration', true, error))
    }
}

const login = async (req, res) => {
    try {
        const body = req.body
        const result = await usersService.login(body)
        return res.send(utils.globalResponse(result, 'Success', false, ''));
    } catch (error) {
        logger.error('Error while user registration: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Error while user login', true, error))
    }
}

const forgotPassword = async (req, res) => {
    try {
        const body = req.body
        const result = await usersService.forgotPassword(body)
        return res.send(utils.globalResponse(result, 'Success', false, ''));
    } catch (error) {
        logger.error('Error while user registration: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Error while forgot password process', true, error))
    }
}

const verifyAccount = async (req, res) => {
    try {
        const userCode = req.query.c
        const result = await usersService.verifyAccount(userCode)
        return res.redirect(result)
    } catch (error) {
        logger.error('Error while user registration: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Error while reset password process', true, error))
    }
}

const allUsers = async (req, res) => {
    try {
        const result = await usersService.allUsers()
        return res.send(utils.globalResponse(result, 'Success', true, []))
    } catch (error) {
        logger.error('Error while user registration: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Error while reset password process', true, error))
    }
}

const searchUser = async (req, res) => {
    try {
        const body = req.body
        const result = await usersService.searchUser(body)
        return res.send(utils.globalResponse(result, 'Success', true, []))
    } catch (error) {
        logger.error('Error while user registration: %j %s', error, error)
        if (error && error.msg) {
            return res.status(500).send(utils.globalResponse([], error.msg, true, ''))
        }
        return res.status(500).send(utils.globalResponse([], 'Error while reset password process', true, error))
    }
}

module.exports = {
    register, login, forgotPassword, verifyAccount, allUsers, searchUser
}