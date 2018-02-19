import mongoose from 'mongoose'

var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
})

var User = mongoose.model('User', userSchema)

export default User