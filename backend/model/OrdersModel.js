const { model } = require("mongoose");

const { OrdersSchema } = require("../schemas/OrdersSchema");

const OrdersModel = model("order", OrdersSchema); // ✅ Fix: removed "new"

module.exports = { OrdersModel }; // ✅ Fix: was "model.exports"