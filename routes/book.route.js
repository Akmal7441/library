const Router = require("express").Router
const router = Router()
const { getBooks, createBook, deleteBook, updateBook, searchBook ,submitPage} = require("../controller/book")

router.get("/add", submitPage)
router.get("/", getBooks)
router.get("/search", searchBook)
router.post("/add", createBook)
router.get("/delete/:id", deleteBook)
router.put("/update/:id", updateBook)


module.exports = router