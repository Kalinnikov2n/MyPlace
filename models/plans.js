const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/quik', { useNewUrlParser: true });

const plansSchema = new mongoose.Schema({
    user: String,
    place: String,
    cat: String,
    adress: String,
    counter: Number

});


module.exports = mongoose.model('plans', plansSchema);