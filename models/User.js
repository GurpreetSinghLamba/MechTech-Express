const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    user_type: String,
    car_details: {
        make: String,
        model: String,
        year: String,
        plate_no: String
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
