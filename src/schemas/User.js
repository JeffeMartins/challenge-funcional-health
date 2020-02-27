const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    conta: {
        type: Number,
        unique: true
    },
    saldo: Number,

});

module.exports = mongoose.model('User', UserSchema);