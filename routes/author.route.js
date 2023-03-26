const Router = require("express").Router
const router = Router()
const { getAuthors, deleteAuthor, searchAuthor, createtAuthor } = require("../controller/author")

router.get("/", getAuthors)
router.get("/search", searchAuthor)
router.post("/create", createtAuthor)
router.get("/delete/:id", deleteAuthor)


module.exports = router