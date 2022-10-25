"use strict";

var _mongoose = require("mongoose");

var UserSchema = new _mongoose.Schema({
  name: String,
  firstName: String,
  lastName: String,
  email: String,
  avatar: {
    type: String,
    "default": 'https://picsum.photos/200'
  },
  password: String,
  role: {
    type: String,
    "enum": ['admin', 'user'],
    "default": 'user'
  },
  active: {
    type: Boolean,
    "default": true
  },
  createdAt: {
    type: Number,
    "default": ~~(new Date().getTime() / 1e3)
  },
  updatedAt: {
    type: Number,
    "default": ~~(new Date().getTime() / 1e3)
  }
}, {
  timestamps: false,
  _id: true,
  versionKey: false
});
UserSchema.set('toJSON', {
  transform: function transform(document, returnedObject) {
    returnedObject.createdAt = new Date(returnedObject.createdAt * 1e3);
    returnedObject.updatedAt = new Date(returnedObject.updatedAt * 1e3);
    delete returnedObject.password;
  }
});
var User = (0, _mongoose.model)('User', UserSchema);
module.exports = User;