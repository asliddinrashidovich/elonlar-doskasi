const { Router } = require("express")
const { getLoginPage, getRegisterPage } = require("../controllers/authController")
const app = Router()

app.get("/login", getLoginPage)
app.get("/signup", getRegisterPage)

module.exports = app
