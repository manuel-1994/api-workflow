const { Router } = require("express");
const auth = require("./auth.routes");
const users = require("./users.routes");

const router = Router();
//routes
users(router);
auth(router);

module.exports = router;
