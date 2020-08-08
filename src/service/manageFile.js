'use strict'
const cloudinary = require('../config/cloudinary')
const { v4 } = require('uuid')

const uploadFile = async (files, body) => {
    if (!files || !files.file) throw { msg: 'File not found' }
    if (!body || !body.dest) throw { msg: 'Dest not found' }
    const cloudinaryResult = await cloudinary.uploadFile(files.file.tempFilePath, { public_id: `${body.dest}/${v4()}` })
    return cloudinaryResult
}

module.exports = {
    uploadFile
}