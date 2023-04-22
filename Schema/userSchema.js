const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    customFields: {
     type: Object,
     required: false   
    }
})

module.exports = UserSchema;