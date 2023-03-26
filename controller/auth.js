const Joi = require('joi')
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const { sign } = require("jsonwebtoken")
const { secret_jwt } = require('../constants')

module.exports = {
    async getLogin(req, res) {
        res.render('login', {
            title: 'Login page',
        })
    },
    async login(req, res) {
        try {
            const error = loginValidation(req.body)
            if (!!error) {
                res.redirect('/auth/login')
                return
            }
            const { username, password } = req.body
            const admin = await prisma.admin.findFirst({ where: { username } })

            if (!admin) {
                res.redirect('/auth/login')
                return
            }

            const areSame = await bcrypt.compare(password, admin.password)

            if (!areSame) {
                res.redirect('/auth/login')
                return
            }

            const accestoken = await sign({ id: admin.id, username: admin.username }, secret_jwt, { expiresIn: "1d" })

            res.json({ accestoken })
        } catch (error) {
            console.log(error);
            res.redirect('/auth/login')
        }
    },
    async getRegister(req, res) {
        res.render('register', {
            title: 'Register page',
        })
    },
    async register(req, res) {
        const error = registerValidation(req.body)

        if (!!error) {
            res.redirect('/auth/register')
            return
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10)

        req.body.password = hashPassword

        const admin = await prisma.admin.create({ data: { username: req.body.username, password: req.body.password } })
        res.redirect('/book')
    },
    async logout(req, res) {
        res.redirect('/auth/login')

    }
}

function registerValidation(val) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    const result = schema.validate(val)

    return result.error
}

function loginValidation(val) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    const result = schema.validate(val)

    return result.error
}