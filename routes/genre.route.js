const Router = require("express").Router
const router = Router()
const { getGenres, createGenre, deleteGenre,  searchGenre, getUpdateGenre, updateGenre } = require("../controller/genre")

router.get("/", getGenres)
router.get("/search", searchGenre)
router.post("/create", createGenre)
router.get("/delete/:id", deleteGenre)
router.get("/update/:id", getUpdateGenre)
router.post("/update/:id", updateGenre)

module.exports = router