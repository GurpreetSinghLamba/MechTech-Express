const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OrderDetailsSchema = new Schema({
    user_id: String,
    order_id: String,
    product: String,
    quantity: String,
    base_price: String,
    total: String
});



const OrderDetails =mongoose.model('OrderDetails',OrderDetailsSchema);
module.exports = OrderDetails