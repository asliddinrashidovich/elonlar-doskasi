const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const session = require("express-session")
const MongoStore= require("connect-mongodb-session")(session)
const { engine } = require("express-handlebars")
const homeRoutes = require("./routes/homeRoutes")
const postersRoutes = require("./routes/postersRoutes")
const profileRoutes = require("./routes/profileRoutes")
const authRoutes = require("./routes/authRoutes")
const connectDB = require("./config/db")
const app = express()

// connect env file
dotenv.config()
const PORT = process.env.PORT || 3000

// connect to Mongodb database
connectDB()

// Initilaze session storage

const store = new MongoStore({
    collection: "session",
    uri: process.env.MONGODB_URL
})

// config express 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

// session use

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

// connect handlebars
app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")


// routes
app.use("/", homeRoutes)
app.use("/posters", postersRoutes)
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}-port`)
})

