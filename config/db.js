const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL).then(() => console.log("MongoDB connected")).catch(err => console.error(err));
}

module.exports = connectDB