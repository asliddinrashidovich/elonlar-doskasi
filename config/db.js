const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/postersDadaB").then(() => console.log("MongoDB connected")).catch(err => console.error(err));
}

module.exports = connectDB