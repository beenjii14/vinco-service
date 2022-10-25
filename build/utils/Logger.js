"use strict";

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configLogger = {
  env: process.env.NODE_ENV || 'development',
  level: process.env.LEVEL || 'info',
  serviceName: process.env.SERVICE_NAME || 'name-service'
}; // Modify according to your needs

var timeZone = function timeZone() {
  return new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    hour12: true
  });
};

var _winston$format = _winston["default"].format,
    combine = _winston$format.combine,
    timestamp = _winston$format.timestamp,
    printf = _winston$format.printf;
var debugFormat = printf(function (l) {
  return "".concat(l.timestamp, " [").concat(l.service, " -> ").concat(l.level, "]: ").concat(l.message);
});

var Logger = _winston["default"].createLogger({
  level: configLogger.level,
  defaultMeta: {
    service: configLogger.serviceName
  },
  transports: [new _winston["default"].transports.Console()]
});

var formats = [_winston["default"].format.splat(), _winston["default"].format.simple(), _winston["default"].format.colorize(), _winston["default"].format.json({
  space: 0
})];

if (configLogger.env !== 'production') {
  formats.push(timestamp({
    format: timeZone
  }), debugFormat);
}

Logger.format = combine.apply(void 0, formats);
module.exports = {
  Logger: Logger
};