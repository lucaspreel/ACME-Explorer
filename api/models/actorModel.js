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
  /*
  //esto funciona, es código original de los profesores
  email: {
    type: String,
    required: 'Kindly enter the actor email',
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  */
  /*
  //esto también funciona
  email: {
    type: String,
    validate: {
      
      validator: async function(email) 
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
      },
      message: props => 'The specified email address is already in use.'
    },
    required: [true, 'User email required']
  },
  */
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
}, 
{ strict: false },
{ timestamps: true })

ActorSchema.plugin(mongoose_delete, { deletedAt : true });

module.exports = mongoose.model('Actors', ActorSchema)