const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "donation_db",
  password: process.env.DB_PASSWORD || "HelloWorld",
  port: process.env.DB_PORT || 5432,
});

// Add debug logging
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err);
});

// Test connection
pool.connect((err, client, done) => {
  if (err) {
    console.error("❌ Error connecting to the database:", err);
  } else {
    console.log("✅ Successfully connected to database");
    done();
  }
});

module.exports = pool;
