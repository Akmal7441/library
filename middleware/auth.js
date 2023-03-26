const {verify} = require("jsonwebtoken")
const { secret_jwt } = require("../constants")

module.exports = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization) res.redirect("/login")
    const token = authorization.split(" ")[1]
    if(!token) res.redirect("/login")
    const check = await verify(token, secret_jwt)
    if(!check)  res.redirect("/login")
    next()
}