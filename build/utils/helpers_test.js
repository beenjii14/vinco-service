"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = (0, _supertest["default"])(_index.app);
module.exports = {
  app: _index.app,
  api: api,
  server: _index.server
};