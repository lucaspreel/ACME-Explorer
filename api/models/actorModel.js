'use strict'
const mongoose = require('mongoose') 
const Schema = mongoose.Schema

var mongoose_delete = require('mongoose-delete');

var emailInUse = async function(email) 
{
    const user = await this.constructor.findOne({ email });
    if(user) 
    {
        if(this.id === user.id) 
        {
            return true;
        }
        return false;
    }
    return true;
};

var validEmail = function(email)
{
    return String(email)
    .toLowerCase()
    .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
}

var manyEmailValidators = [
    { validator: emailInUse, msg: 'The specified email address is already in use.'},
    { validator: validEmail, msg: 'This field must be a valid email.' }
];

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
      validate: manyEmailValidators,
      required : true
  },
  password: {
    type: String,
    minlength: 10,
    required: 'Kindly enter the actor password'
  },
  language: [{
    type: String,
    default: 'SPANISH',
    enum: ['ENGLISH', 'SPANISH', ]
  }],
  phone_number: {
    type: String
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


const ExpensePeriodSchema = new Schema({
  period: {
    type: String
  },
  moneySpent: { 
    type: Number 
  }
});

const ExplorerStatsSchema = new Schema({
  explorerId: {
      type: Schema.Types.ObjectId,
      ref: 'Actors'
  },
  yearExpense: [{ 
      type: Schema.Types.ObjectId,
      ref: 'ExpensePeriod'
  }],
  monthExpense: [{ 
    type: Schema.Types.ObjectId,
    ref: 'ExpensePeriod'
  }]
});

module.exports = mongoose.model('Actors', ActorSchema)
module.exports = mongoose.model('ExpensePeriod', ExpensePeriodSchema)
module.exports = mongoose.model('ExplorerStats', ExplorerStatsSchema)