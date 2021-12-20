const mongoose = require('mongoose');

const charactersSchema = mongoose.Schema({
    result: {
        type:Object,
        required:true
    }
})

exports.Character = mongoose.model('Character', charactersSchema)
