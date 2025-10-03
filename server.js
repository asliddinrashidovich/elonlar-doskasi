const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const { engine } = require("express-handlebars")
const homeRoutes = require("./routes/homeRoutes")
const postersRoutes = require("./routes/postersRoutes")

const app = express()

dotenv.config()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")

// routes
app.use("/", homeRoutes)
app.use("/posters", postersRoutes)

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}-port`)
})