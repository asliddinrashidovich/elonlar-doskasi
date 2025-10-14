const { Router } = require("express");
const app = Router();
const { homeController } = require("../controllers/homeController");

app.get("/", homeController)

module.exports = app;