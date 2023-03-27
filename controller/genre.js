const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


module.exports.getGenres = async (req, res) => {
    const genre = await prisma.genre.findMany()
    res.render("genre", {
        genre
    })
}

module.exports.createGenre = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.redirect("/genre")
        }
        const genre = await prisma.genre.create({ data: { name } })
        res.redirect("/genre")
    } catch (error) {
        console.log(error)
        res.status(400).render("genre")
    }
}

module.exports.deleteGenre = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).redirect("/genre")
        }
        await prisma.genre.delete({ where: { id: Number(id) } })
        res.redirect('genre')
    } catch (error) {
        console.log(error.message)
        res.status(400).redirect("/genre")
    }
}

module.exports.updateGenre = async (req, res) => {
    try {
        const { id } = req.params
        const { title, authorId,genreId} = req.body
        if (!title || !genreId) {
            return res.status(400).render({ message: "title and auhtorId is required" })
        }
        const genre = await prisma.genre.update({ where: { id: Number(id) }, data: {  genreId: Number(genreId)} })
        res.render('/genre')
    } catch (error) {
        console.log(error)
        res.redirect('/genre')
    }
}

module.exports.searchGenre = async (req, res) => {
    try {
        const { input } = req.body
        const book = await prisma.book.findMany({
            where: {
                title: {
                    contains: input.trim()
                }
            }
        })
        res.render('genre')
    } catch (error) {
        console.log(error)
        res.status(400).render({ message: error.message })
    }
}

module.exports.getUpdateGenre = async (req,res) => {
    const book = await prisma.book.findFirst({where: {id: Number(req.params.id)}})
    const author = await prisma.author.findMany()
    const genre = await prisma.genre.findMany()
    res.render('updateBook',{book,author,genre})
}