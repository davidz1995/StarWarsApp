const mongoose = require('mongoose');

const filmsSchema = mongoose.Schema({
    result: {
        type:Object,
        required:true
    }
})

exports.Film = mongoose.model('Film', filmsSchema)
