const mongoose = require("mongoose");

// Har run ka result history ke liye save hota hai
const BriefSchema = new mongoose.Schema(
  {
    generatedAt: Date,
    days: Number,
    companies: [String],
    brief: mongoose.Schema.Types.Mixed,
    results: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brief", BriefSchema);
