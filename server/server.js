require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/agentRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

// MongoDB optional hai
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 4000 })
    .then(() => console.log("MongoDB connected"))
    .catch((e) =>
      console.warn(
        "MongoDB connect nahi hua (history save nahi hogi):",
        e.message
      )
    );
}

// Local development ke liye
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Vercel ke liye
module.exports = app;