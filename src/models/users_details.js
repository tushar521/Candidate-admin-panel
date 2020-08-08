'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { plugin } = require('mongoose-auto-increment')
const uuid = require('uuid')

const userDetailsSchema = new Schema({
  user_code: {
    type: String,
    default: uuid.v4
  },
  username: String,
  email: String,
  password: String,
  title: String,
  fullname: String,
  dob: {
    day: Number,
    month: Number,
    year: Number
  },
  country: String,
  state: String,
  city: String,
  mobile_number: String,
  phone_number: String,
  total_experience: Number,
  key_skills: String,
  functional_area: String,
  education_qualification: String,
  specialization: String,
  current_organization_details: {
    organization: String,
    designation: String,
    job_profile: String,
    exp_from: Number,
    exp_to: Number
  },
  past_organization_details: {
    organization: String,
    designation: String,
    job_profile: String,
    exp_from: Number,
    exp_to: Number
  },
  resume_url: String,
  picture: {
    type: String,
    default: 'https://res.cloudinary.com/de1pywi3f/image/upload/v1596770840/ProfilePictures/noimage_pk4mh2.png'
  },
  role: {
    type: String,
    default: 'USER',
    enum: ['USER', 'ADMIN']
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_on',
    updatedAt: 'updated_on'
  },
  collection: 'user_details',
  versionKey: false
})

module.exports = mongoose.model('user_details', userDetailsSchema)
