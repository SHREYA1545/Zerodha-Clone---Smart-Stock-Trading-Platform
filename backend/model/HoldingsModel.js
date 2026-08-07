const { model } = require("mongoose");
const { HoldingsSchema } = require("../schemas/HoldingsSchema");

// 1. Naam change karke HoldingsModel kiya, aur 'new model' ki jagah sirf 'model' aayega
const HoldingsModel = model("holding", HoldingsSchema);

// 2. model.exports ki jagah module.exports aayega
module.exports = { HoldingsModel };