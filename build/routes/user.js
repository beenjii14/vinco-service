"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = require("../controllers/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _user.getUsers);
router.get('/:id', _user.getUser);
router.post('/', _user.createUser);
router.put('/:id', _user.updateUser);
router["delete"]('/:id', _user.deleteUser);
module.exports = router;