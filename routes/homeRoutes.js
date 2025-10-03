const { Router } = require("express");
const { homeController } = require("../controllers/homeController");
const app = Router();

app.get("/", homeController)

module.exports = app;