const { Router } = require("express");
const auth = require("./auth.routes");
const boards = require("./boards.routes");
const teams = require("./teams.routes");
const users = require("./users.routes");

const router = Router();
//routes
users(router);
auth(router);
teams(router);
boards(router);

module.exports = router;
