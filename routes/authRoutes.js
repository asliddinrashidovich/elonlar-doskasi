const { Router } = require("express")
const { getLoginPage, getRegisterPage, registerNewUser, loginUser } = require("../controllers/authController")
const app = Router()

app.get("/login", getLoginPage)
app.get("/signup", getRegisterPage)
app.post("/signup", registerNewUser)
app.post("/login", loginUser)

module.exports = app
