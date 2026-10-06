const express = require("express");
const mongoose = require("mongoose");
const COMPANIES = require("../config/companies");
const { CATEGORIES } = require("../services/categorizer");
const { runAgent } = require("../services/agent");
const Brief = require("../models/Brief");

const router = express.Router();
const dbConnected = () => mongoose.connection.readyState === 1;

// GET /api/companies  -> chips ke liye
router.get("/companies", (req, res) => {
  res.json({ companies: COMPANIES.map((c) => c.name), categories: CATEGORIES });
});

// POST /api/agent/run  body: { companies: ["Tesla","IBM"], days: 7 }
router.post("/agent/run", async (req, res) => {
  try {
    const { companies, days = 7 } = req.body;
    if (!Array.isArray(companies) || companies.length === 0 || companies.length > 10) {
      return res.status(400).json({ error: "Send between 1 and 10 companies." });
    }

    const output = await runAgent({ companyNames: companies, days: Number(days) });

    if (dbConnected()) {
      await Brief.create({ ...output, companies });
    }
    res.json(output);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/agent/history -> pichhle 10 briefs
router.get("/agent/history", async (req, res) => {
  if (!dbConnected()) return res.json({ history: [], note: "MongoDB not connected." });
  const history = await Brief.find().sort({ createdAt: -1 }).limit(10).select("generatedAt days companies brief");
  res.json({ history });
});

module.exports = router;
