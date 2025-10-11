const { Router } = require("express");
const { posterController, addPosterController, addNewPosterController, getOnePoster, getEditPosterPage, updatePoster, deletePoster } = require("../controllers/postersController");
const router = Router();
const upload = require("../utils/fileUpload")

router.get("/", posterController)
router.get("/add", addPosterController)
router.post("/add", upload.single('image'), addNewPosterController)
router.get("/:id", getOnePoster)
router.get("/:id/edit", getEditPosterPage)
router.post("/:id/edit", updatePoster)
router.post("/:id/delete", deletePoster)

module.exports = router;