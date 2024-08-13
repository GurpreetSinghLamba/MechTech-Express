const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    service: String,
    base_price: String,
    time: String,
    detail: String
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
