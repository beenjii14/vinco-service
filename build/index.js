"use strict";

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _config = _interopRequireDefault(require("../config"));

require("./mongodb");

var _routes = _interopRequireDefault(require("./routes"));

var _utils = require("./utils/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _cookieParser["default"])());
(0, _routes["default"])(app);

if (process.env.NODE_ENV !== 'test') {
  app.use((0, _morgan["default"])('dev'));
}

var server = app.listen(_config["default"].port, function () {
  _utils.Logger.info("\uD83D\uDE80 Server running on port ".concat(_config["default"].port));
});
module.exports = {
  app: app,
  server: server
};