const mongoose = require('mongoose');

const favoritesSchema = mongoose.Schema({
    id: {
        type:String,
        default:''
    },
    name: {
        type:String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    properties: {
        type: Object,
        default: 0
    },
    dateCreated:{
        type:Date,
        default: Date.now
    }
})

exports.Favorite = mongoose.model('Favorite', favoritesSchema)
