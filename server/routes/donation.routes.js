const express = require("express");
const router = express.Router();
const pool = require("../config/database");

// Debug middleware with detailed logging
router.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// GET all donations with error handling
router.get("/", async (req, res) => {
  try {
    console.log("Attempting to fetch donations...");
    const result = await pool.query(
      "SELECT * FROM items ORDER BY created_at DESC"
    );
    console.log("Fetched donations:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({
      error: error.message,
      detail: error.detail,
      hint: error.hint,
    });
  }
});

// POST new donation with enhanced error handling
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      condition,
      category,
      donorName,
      contactInfo,
      age,
      images,
    } = req.body;

    console.log("Processing donation request:", {
      title,
      description,
      condition,
      category,
      donorName,
      contactInfo,
      age,
      imagesCount: images?.length || 0,
    });

    if (!title || !description) {
      console.log("Validation failed: missing required fields");
      return res.status(400).json({
        error: "Title and description are required",
      });
    }

    const query = `
      INSERT INTO items (
        title,
        description,
        condition,
        category,
        donor_name,
        contact_info,
        age,
        images
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      title,
      description,
      condition,
      category,
      donorName,
      contactInfo,
      age,
      images || [],
    ];

    console.log(
      "Executing query with values:",
      JSON.stringify(values, null, 2)
    );

    const result = await pool.query(query, values);
    console.log("Database response:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to create donation:", {
      error: error.message,
      stack: error.stack,
      detail: error.detail,
      hint: error.hint,
    });

    res.status(500).json({
      error: error.message,
      detail: error.detail,
      hint: error.hint,
    });
  }
});

module.exports = router;
