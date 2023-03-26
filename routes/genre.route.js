const Router = require("express").Router
const router = Router()
const { getGenres, createGenre, deleteGenre, updateGenre, searchGenre } = require("../controller/genre")

router.get("/", getGenres)
router.get("/search", searchGenre)
router.post("/create", createGenre)
router.get("/delete/:id", deleteGenre)
router.put("/update/:id", updateGenre)


module.exports = router