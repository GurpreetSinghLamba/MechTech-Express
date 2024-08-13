const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TireSchema = new Schema({
    tire_size: String,
    width: String,
    profile: String,
    wheel_size: String,
    season: String
});



const Tire =mongoose.model('Tire',TireSchema);
module.exports = Tire