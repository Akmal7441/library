const Router = require("express").Router
const router = Router()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

router.post("/search", async (req, res) => {
    const {input} = req.body
    console.log(req.body)
    if(!input) {
        return res.json([])
    }
    const book = await prisma.book.findMany({
        where: {
            title: {
                contains: input.trim()
            }
        }
    })
    const genre = await prisma.genre.findMany({
        where: {
            name: {
                contains: input.trim()
            }
        }
    })
    const author = await prisma.author.findMany({
        where: {
            name: {
                contains: input.trim()
            }
        }
    })

    console.log(book, author, genre)

    res.json([...book, ...genre, ...author])
})

module.exports = router