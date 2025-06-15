const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ["Stock", "Mutual Fund", "Cash", "Insurance"], required: true },
  value: { type: Number, required: true },
  gain: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Asset", assetSchema);
