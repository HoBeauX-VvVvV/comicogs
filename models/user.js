const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true},
    issueNumber: { type: Number, required: true },
    author: { type: String, required: true },
    artist: { type: String, required: true },
    publisher: String,
    year: Number
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;

const userSchema = mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    collection: [ collectionSchema ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;