const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const { engine } = require("express-handlebars")
const homeRoutes = require("./routes/homeRoutes")
const postersRoutes = require("./routes/postersRoutes")
const mongoose = require("mongoose")
const app = express()

dotenv.config()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.engine(".hbs", engine({extname: ".hbs"}))
app.set("view engine", ".hbs")


const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/postersDadaB").then(() => console.log("MongoDB connected")).catch(err => console.error(err));
}


// routes
app.use("/", homeRoutes)
app.use("/posters", postersRoutes)
connectDB()

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}-port`)
})