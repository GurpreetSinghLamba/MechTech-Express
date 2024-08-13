const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    user_id: String,
    order_total: String,
    tax: String,
    base_price: String
});



const Order =mongoose.model('Order',OrderSchema);
module.exports = Order