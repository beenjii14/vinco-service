"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Success = exports.Error = void 0;

var Success = function Success(_ref) {
  var res = _ref.res,
      data = _ref.data,
      _ref$message = _ref.message,
      message = _ref$message === void 0 ? '' : _ref$message,
      _ref$statusCode = _ref.statusCode,
      statusCode = _ref$statusCode === void 0 ? 200 : _ref$statusCode;
  res.status(statusCode).send({
    statusCode: statusCode,
    error: false,
    message: message,
    data: data
  });
};

exports.Success = Success;

var Error = function Error(_ref2) {
  var res = _ref2.res,
      message = _ref2.message,
      _ref2$statusCode = _ref2.statusCode,
      statusCode = _ref2$statusCode === void 0 ? 500 : _ref2$statusCode;
  res.status(statusCode).send({
    statusCode: statusCode,
    error: true,
    message: message,
    data: []
  });
};

exports.Error = Error;