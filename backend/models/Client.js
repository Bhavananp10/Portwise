
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  riskTolerance: String,
  goals: [String],
  income: Number,
  liabilities: Number,
  taxStatus: String,
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
