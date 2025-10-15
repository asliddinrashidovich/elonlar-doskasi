const {Router} = require("express");
const getProfilePage = require("../controllers/userController");
const app = Router()

app.get("/:username", getProfilePage)

module.exports = app