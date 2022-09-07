const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        Admin: Number, // 2000
        Editor: Number, // 2001
        User: {
            type: Number,
            default: 2002
        },
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
})

module.exports = mongoose.model('User', userSchema);