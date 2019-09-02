const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quik', { useNewUrlParser: true });

const placeSchema = new mongoose.Schema({
    title: String,
    adress: String,
    cat: String
});


module.exports = mongoose.model('places', placeSchema);