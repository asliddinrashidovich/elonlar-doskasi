const {Schema, model} = require("mongoose")

const postersScheme = new Schema({
    title: {
        type: String,
        required: true
    }, 
    amount: {
        type: Number,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        min: 50
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    visits: {
        type: Number,
        default: 1
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

// createing index
postersScheme.index({
    title: "text",
    description: "text"
})

postersScheme.statics = {
    searchPartial: function(q){
        return this.find({
            $or: [
                { "title": new RegExp(q, "gi")} ,
                { "description": new RegExp(q, "gi")} 
            ]
        })
    },
    searchFull: function(q){
        return this.find({
            $text: {
                $search: q,
                $caseSensitive: false
            }
        })
    }
}

module.exports = model("Poster", postersScheme)