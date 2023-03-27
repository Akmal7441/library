const Router = require("express").Router
const router = Router()
const { getBooks, createBook, deleteBook, getUpdateBook, searchBook ,submitPage, updateBook} = require("../controller/book")

router.get("/add", submitPage)
router.get("/", getBooks)
router.get("/search", searchBook)
router.post("/add", createBook)
router.get("/delete/:id", deleteBook)
router.get("/update/:id", getUpdateBook)
router.post("/update/:id", updateBook)


module.exports = router