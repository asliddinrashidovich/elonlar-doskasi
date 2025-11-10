const { Router } = require("express");
const app = Router();
const { getHomePage } = require("../controllers/homeController");

app.get("/", getHomePage)

module.exports = app;