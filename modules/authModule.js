const {Schema, model} = require("mongoose")

const userModule = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model("User", userModule)