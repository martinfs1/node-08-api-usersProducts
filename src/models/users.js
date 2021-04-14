const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    name:{
      type: String,
      required: [true, 'Name is required']
      
    },
    lastName:{
      type: String,
      required: [true, 'LastName is required']
      
    },
    email:{
      type: String,
      required: [true, 'Email is required'],
      index: true,
      unique: true,
    },     
    birthdate: Date,
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      required: true,
      default: 'USER_ROLE',
      enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    }

  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator, { message: 'already exist in the DB.' });
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("users", userSchema);
