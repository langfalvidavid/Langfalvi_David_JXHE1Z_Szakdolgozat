const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    isVerified: {type: Boolean, default: false}
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel