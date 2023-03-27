const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


module.exports.getAuthors = async (req, res) => {
    const author = await prisma.author.findMany()
    res.render("author", {
        author
    })
}

module.exports.createtAuthor = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).redirect("/author")
        }
        const author = await prisma.author.create({ data: { name } })
        res.redirect("/author")
    } catch (error) {
        console.log(error)
        res.status(400).render("author")
    }
}

module.exports.deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).redirect("author")
        }
        await prisma.author.delete({ where: { id: Number(id) } })
        res.redirect('/author')
    } catch (error) {
        console.log(error.message)
        res.status(400).redirect("/author")
    }
}

module.exports.updateAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const { title, authorId } = req.body
        if (!title || !authorId) {
            return res.status(400).render({ message: "title and auhtorId is required" })
        }
        const author = await prisma.author.update({ where: { id: Number(id) }, data: {authorId: Number(authorId) } })
        res.render('/author')
    } catch (error) {
        console.log(error)
        res.redirect('/author')
    }
}

module.exports.searchAuthor = async (req, res) => {
    try {
        const { input } = req.body
        const book = await prisma.book.findMany({
            where: {
                title: {
                    contains: input.trim()
                }
            }
        })
        res.render('author')
    } catch (error) {
        console.log(error)
        res.status(400).render({ message: error.message })
    }
}
module.exports.getUpdateAuthor = async (req,res) => {
    const book = await prisma.book.findFirst({where: {id: Number(req.params.id)}})
    const author = await prisma.author.findMany()
    const genre = await prisma.genre.findMany()
    res.render('updateBook',{book,author,genre})
}