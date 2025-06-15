const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");

router.post("/", async (req, res) => {
  try {
    const asset = new Asset(req.body);
    const saved = await asset.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/client/:clientId", async (req, res) => {
  try {
    const assets = await Asset.find({ clientId: req.params.clientId });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;