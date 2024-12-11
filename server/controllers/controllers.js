const join = require("./join");
const login = require("./login");
const auth = require("../middleware/auth");
const course = require("./course");
const visit = require("./visit");

module.exports = { join, login, auth, course, visit };
