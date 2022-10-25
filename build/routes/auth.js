"use strict";

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _auth.auth);
router["delete"]('/', _auth.logout);
module.exports = router;