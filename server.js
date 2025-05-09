const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// ✅ MySQL connection config
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A@rav123",
  database: "student_management_system",
  connectTimeout: 5000  // optional timeout for debugging
});

// ✅ Connect to database
db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

// ✅ API Route
app.get("/api/courses", (req, res) => {
  console.log("➡️  GET /api/courses hit");

  db.query("SELECT * FROM courses", (err, results) => {
    if (err) {
      console.error("❌ Query error:", err.message);
      res.status(500).json({ error: "Failed to fetch courses" });
      return;
    }

    console.log("✅ Query successful, sending data");
    res.json(results);
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
