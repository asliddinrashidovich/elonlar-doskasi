const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const { engine } = require("express-handlebars")
const homeRoutes = require("./routes/homeRoutes")
const postersRoutes = require("./routes/postersRoutes")
const authRoutes = require("./routes/authRoutes")
const connectDB = require("./config/db")
const app = express()

// connect to Mongodb database
connectDB()

// connect env file
dotenv.config()
const PORT = process.env.PORT || 3000

// config express 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

// connect handlebars
app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")


// routes
app.use("/", homeRoutes)
app.use("/posters", postersRoutes)
app.use("/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}-port`)
})