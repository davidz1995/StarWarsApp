const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
})

usersSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

usersSchema.set('toJSON', {
    virtuals:true
})

exports.User = mongoose.model('User', usersSchema)