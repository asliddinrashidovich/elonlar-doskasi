const {Router} = require("express");
const { getProfilePage, updateProfile } = require("../controllers/userController");
const app = Router()

app.get("/:username", getProfilePage)
app.get("/change", updateProfile)

module.exports = app