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

app.post("/api/titlePage", (req, res) => {
  console.log("➡️  POST /api/titlePage hit with:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM students WHERE LOWER(Email) = LOWER(?)",
    [email],
    (err, results) => {
      if (err) {
        console.error("❌ Query error:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Plain text password comparison
      if (password !== user.Password) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const studentData = {
        StudentID: user.StudentID,
        Name: user.Name,
        Email: user.Email
      };

      console.log("✅ Login successful for:", studentData.Email);
      res.json(studentData);
    }
  );
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
