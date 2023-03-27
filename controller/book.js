const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


module.exports.getBooks = async (req, res) => {
    const book = await prisma.book.findMany({ include: { author: true, genre: true } })
    res.render("book", {
        book
    })
}

module.exports.createBook = async (req, res) => {
    try {
        const { title, authorId, genreId } = req.body
        if (!title && !authorId && !genreId) {
            return res.status(400).render("addBook")
        }
        const book = await prisma.book.create({ data: {title, authorId: Number(authorId), genreId: Number(genreId)} })
        res.redirect("/book")
    } catch (error) {
        console.log(error)
        res.render("addBook")
    }
}

module.exports.submitPage = async (req,res) => {
    const author = await prisma.author.findMany()
    const genre = await prisma.genre.findMany()
    res.render("addBook", {
        author,
        genre
    })
}

module.exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).render("addBook")
        }
        await prisma.book.delete({ where: { id: Number(id) } })
        res.redirect('/book')
    } catch (error) {
        console.log(error.message)
        res.redirect('/book')
    }
}

module.exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const { title, authorId, genreId } = req.body
        if (!title || !authorId) {
            return res.status(400).render("addBook")
        }
        await prisma.book.update({ where: { id: Number(id) },data: {title, authorId: Number(authorId), genreId: Number(genreId)} })
        res.redirect('/book')
    } catch (error) {
        console.log(error)
        res.redirect('/book')
    }
}

module.exports.searchBook = async (req, res) => {
    try {
        const { input } = req.body
        const book = await prisma.book.findMany({
            where: {
                title: {
                    contains: input.trim()
                }
            }
        })
        res.render('book')
    } catch (error) {
        console.log(error)
        res.render('book')
    }
}

module.exports.getUpdateBook = async (req,res) => {
    const book = await prisma.book.findFirst({where: {id: Number(req.params.id)}})
    const author = await prisma.author.findMany()
    const genre = await prisma.genre.findMany()
    res.render('updateBook',{book,author,genre})
}