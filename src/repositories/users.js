'use strict'
const usersDetailsSchema = require('../models/users_details')

const findData = async (query, projection, options) => {
    const dbOperation = await usersDetailsSchema.find(query, projection, options).lean()
    return dbOperation
}

const createData = async (data) => {
    const dbOperation = await usersDetailsSchema.create(data)
    return dbOperation
}

const updateData = async (query, updateJson) => {
    const dbOperation = await usersDetailsSchema.update(query, updateJson)
    return dbOperation
}

const decreaseLimit = async (id) => {
    const dbOperation = await usersDetailsSchema.updateOne( { imagga_acc_details_id: Number(id) }, { $inc: { available_requests: -1 } })
    return dbOperation
}

const saveData = async (body) => {
    const usersData = new usersDetailsSchema(body)
    const response = await usersData.save(body)
    return response
}

module.exports = {
    findData,
    createData,
    updateData,
    decreaseLimit,
    saveData
}