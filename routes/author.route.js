const Router = require("express").Router
const router = Router()
const { getAuthors, deleteAuthor, searchAuthor, createtAuthor,getUpdateAuthor,updateAuthor } = require("../controller/author")

router.get("/", getAuthors)
router.get("/search", searchAuthor)
router.post("/create", createtAuthor)
router.get("/delete/:id", deleteAuthor)
router.get("/update/:id", getUpdateAuthor)
router.post("/update/:id", updateAuthor)

module.exports = router