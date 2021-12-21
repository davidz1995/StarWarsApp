const mongoose = require('mongoose');

const planetsSchema = mongoose.Schema({
    result: {
        type:Object,
        required:true
    }
})

exports.Planet = mongoose.model('Planet', planetsSchema)
