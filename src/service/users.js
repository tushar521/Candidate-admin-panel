'use strict'
const usersRepo = require('../repositories/users')
const utils = require('../utils/utils')
const { JWTAuth } = require('../utils/jwt-auth')
const jwtAuth = new JWTAuth()
const dateFormat = require('dateformat')

/**
 * 1. Check user with same email exists or not
 * 2. If not exits then register
 * 3. If exists then throw error
 */
const register = async (body, host) => {
    const userExistCheck = await usersRepo.findData({ email: body.email }, { _id: 0, email: 1 })
    if (userExistCheck && userExistCheck.length > 0) {
        throw { msg: 'Provided email is alrady registered. Please login' }
    }
    const userExistCheck2 = await usersRepo.findData({ username: body.username }, { _id: 0, username: 1 })
    if (userExistCheck2 && userExistCheck2.length > 0) {
        throw { msg: 'Provided username is alrady registered. Please login' }
    }
    body.password = utils.encyptData(body.password)
    const registerUser = await usersRepo.saveData(body)
    const link = createMailVerificationLink(registerUser.user_code, host)
    const mailOptions = {
        to: body.email,
        from: process.env.SMTP_USER,
        subject: 'Account Verification',
        html: `Hello ${body.fullname} <br>Welcome. Please click here to activate your <a href=${link}>account</a>`
    }
    await utils.sendEmail(mailOptions)
    return []
}

const createMailVerificationLink = (uCode, host) => {
    return `http://${host}:${process.env.PORT}/api/user/verify-account?c=${uCode}`
}

/**
 * 1. Check user with provided email is there or not
 * 2. If not, throw error
 * 3. If exists, then check email verified status
 * 4. If 3 failed... then throw error
 * 5. If 3 passed... then check password is matching or not
 * 6. If 5 failed... then throw error
 * 7. If 5 passed... then generate unique token
 * 8. Send final response
 */
const login = async (body) => {
    let { username, password } = body
    if (!username || !password) { throw { msg: 'Username and Password are required to SignIn' } }
    let userData = await usersRepo.findData({ username }, { _id: 0 })
    if (!userData || userData.length === 0) {
        throw { msg: 'No any profile found with provided username' }
    }
    userData = userData[0]
    const passwordFromDb = await utils.decryptData(userData.password)
    if (userData.is_active === false) throw { msg: `This account is temporary disabled. Please contact admin` }
    if (!userData.email_verified) throw { msg: `You haven't verified your email address yet. Please verify` }
    if (password !== passwordFromDb) throw { msg: 'Incorrect password received' }
    const tokenData = {
        email: userData.email, user_code: userData.user_code, email_status: userData.email_verified, user_role: userData.user_role
    }
    const token = await jwtAuth.createToken(tokenData)
    return { token, user_code: userData.user_code, user_role: userData.user_role, email: userData.email }
}

const forgotPassword = async (body) => {
    let { email } = body
    if (!email) throw { msg: 'Email is required to send mail for forgot password request' }
    let userData = await usersRepo.findData({ email }, { _id: 0 })
    if (!userData || userData.length === 0) throw { msg: 'No any profile found with provided email address' }
    userData = userData[0]
    let password = await utils.decryptData(userData.password)
    if (userData.is_active === false) throw { msg: `This account is temporary disabled. Please contact admin` }
    if (userData.email_verified === false) throw { msg: `Account associated with this email id is not active. Please resent verification link to activate account` }
    const link = createForgotPasswordLink(userData.user_code)
    const mailOptions = {
        to: email,
        from: process.env.SMTP_USER,
        subject: 'Your Password',
        html: `Hello ${userData.fullname} <br>As you forgot your password, we are sending you over mail. Please don't share this mail to anyone. <br> Your password is: ${password}`
    }
    await utils.sendEmail(mailOptions)
    return true
}

const createForgotPasswordLink = (uCode) => {
    return `${process.env.FRONT_RESET_PASSWORD}?c=${uCode}`
}

const verifyAccount = async (userCode) => {
    if (!userCode) throw { msg: 'Usercode is required to activate acount' }
    await usersRepo.updateData({ user_code: userCode }, { $set: { email_verified: true } })
    return process.env.FRONT_END_LOGIN
}

const allUsers = async () => {
    const userData = await usersRepo.findData({})
    for (let elem of userData) {
        elem.password = await utils.decryptData(elem.password)
        elem.created_on = dateFormat(elem.created_on, 'dd/MM/yyyy')
    }
    return userData
}

const searchUser = async (body) => {
    if (body.fullname) body.fullname = new RegExp(body.fullname, 'i')
    const userData = await usersRepo.findData(body)
    for (let elem of userData) {
        elem.password = await utils.decryptData(elem.password)
        elem.created_on = dateFormat(elem.created_on, 'dd/MM/yyyy')
    }
    return userData
}

module.exports = {
    register, login, forgotPassword, verifyAccount, allUsers, searchUser
}