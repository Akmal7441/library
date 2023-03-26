const express = require("express")
const app = express()
const {create} = require("express-handlebars")

const exhbs = create({
    extname:'hbs',
    defaultLayout:'layout'
})

app.engine('hbs', exhbs.engine)

app.set('view engine', 'hbs');
app.set('views', './views'); 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", require("./routes/search"))
app.use("/auth" , require("./routes/auth.route"))
app.use("/book", require("./routes/book.route"))
app.use("/author", require("./routes/author.route"))
app.use("/genre", require("./routes/genre.route"))

const port = 4000
app.listen(port, () => {
    console.log("Server working on " + port);
})
 
function normalizePort(val) { // number // string // false
    const num = parseInt(val)
    if (isNaN(num)) {
        return val
    }

    if (num) {
        return num
    }

    return false
}