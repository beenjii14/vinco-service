"use strict";

var _auth = _interopRequireDefault(require("./auth"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (app) {
  app.use('/api/v1/auth', _auth["default"]);
  app.use('/api/v1/user', _user["default"]);
};