const db = require("../config/db");
const { CurrentTime } = require("../config/date");

const time = CurrentTime();

const loginId = req.body.id;

const name = req.body.name;
