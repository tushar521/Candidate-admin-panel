const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadFile = async (file, options) => {
    const result = await cloudinary.uploader.upload(file, options)
    return result
}

module.exports = {
    uploadFile
}