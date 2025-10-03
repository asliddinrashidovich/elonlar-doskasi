const { Router } = require("express");
const { posterController, addPosterController, addNewPosterController } = require("../controllers/postersController");
const router = Router();

router.get("/", posterController)
router.get("/add", addPosterController)
router.post("/add", addNewPosterController)

module.exports = router;