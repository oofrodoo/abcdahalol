const express = require("express");
const cors = require("cors");
const { findAvailablePort } = require("../scripts/portFinder");
const donationRoutes = require("./routes/donation.routes");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/donations", donationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, "localhost", () => {
  console.log(`⚡️[server]: Server running at http://localhost:${PORT}`);
  console.log(`🔍 Test the server: curl http://localhost:${PORT}/health`);
});
