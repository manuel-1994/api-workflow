const { Router } = require("express");
const auth = require("./auth.routes");
const teams = require("./teams.routes");
const users = require("./users.routes");

const router = Router();
//routes
users(router);
auth(router);
teams(router);

module.exports = router;
