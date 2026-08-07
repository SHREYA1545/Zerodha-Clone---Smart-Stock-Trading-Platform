const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");

// 1. 'new model' ki jagah sirf 'model' aayega
const PositionsModel = model("position", PositionsSchema);

// 2. 'model.exports' ki jagah 'module.exports' aayega
module.exports = { PositionsModel };