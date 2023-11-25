"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ApiError = _interopRequireDefault(require("../error/ApiError"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _users = _interopRequireDefault(require("../db/users"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = router => {
  router.post("/login", async (req, res) => {
    const {
      email,
      password
    } = req.body;
    const user = await _users.default.findOne({
      email: email
    });
    if (!user) {
      throw new _ApiError.default("Incorrect password or email", 401, "userOrPasswordIncorrect");
    }
    const passwordConfirmed = await _bcryptjs.default.compare(password, user.password);
    if (passwordConfirmed) {
      const userJson = user.toJSON();
      const token = _jsonwebtoken.default.sign(userJson, process.env.JWT_SECRET);
      res.json({
        token: `Bearer ${token}`,
        user: userJson
      });
    } else {
      throw new _ApiError.default("Incorrect password or email", 401, "userOrPasswordIncorrect");
    }
  });
};
exports.default = _default;