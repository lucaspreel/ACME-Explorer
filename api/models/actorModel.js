'use strict'
const mongoose = require('mongoose') 
const Schema = mongoose.Schema

var mongoose_delete = require('mongoose-delete');

const ActorSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the actor name'
  },
  surname: { 
    type: String, 
    required: 'Kindly enter the actor surname'
  },
  email: {
    type: String, 
  },
  language: [{
    type: String,
    default: 'SPANISH',
    enum: ['ENGLISH', 'SPANISH', ]
  }],
  phone_number: {
    type: String,
    required: 'Kindly enter the phone number'
  },
  address: {
    type: String
  },
  isActive: {
    type: Boolean
  },
  role: [{
    type: String,
    required: 'Kindly enter the user role(s)',
    enum: ['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR']
  }],
}, { strict: false })

ActorSchema.plugin(mongoose_delete, { deletedAt : true });

module.exports = mongoose.model('Actors', ActorSchema)