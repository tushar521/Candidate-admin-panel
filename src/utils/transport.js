const nodemailer = require('nodemailer')
const logger = require('../middlewares/logger')
const HOST = process.env.SMTP_HOST
const PORT = process.env.SMTP_PORT
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS


var transport = nodemailer.createTransport({
  service: 'gmail',
  // host: HOST,
  // secure: false,
  // port: PORT,
  auth: {
    user: USER,
    pass: PASS
  }
});

transport.verify((error, _success) => {
  if (error) {
    logger.error(`Error while verifying transporter connection %j %s`, error, error)
  } else {
    logger.info(`SMTP transporter verification success`)
  }
});

module.exports = {
  transport
}
