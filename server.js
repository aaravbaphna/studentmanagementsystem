const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// MySQL connection config
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "A@rav123",
  database: "student_management_system",
  connectTimeout: 5000  // optional timeout for debugging
});

// Connect to database
db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }
  console.log(" Connected to MySQL database");
});

// API Route
app.get("/api/courses", (req, res) => {
  console.log("➡️  GET /api/courses hit");

  db.query("SELECT * FROM courses", (err, results) => {
    if (err) {
      console.error("❌ Query error:", err.message);
      res.status(500).json({ error: "Failed to fetch courses" });
      return;
    }

    console.log("Query successful, sending data");
    res.json(results);
  });
});

app.post("/api/enroll", (req, res) => { //API route for enrollment, used to enroll for courses
  let { studentId, courseId } = req.body;

  // Parse to integers to ensure proper type
  studentId = parseInt(studentId);
  courseId = parseInt(courseId);

  if (!studentId || !courseId) {
    return res.status(400).json({ error: "Missing or invalid studentId or courseId" });
  }

  console.log(`➡️ Enroll request received: studentId=${studentId}, courseId=${courseId}`);

  db.query(
    "SELECT * FROM enrollments WHERE StudentID = ? AND CourseID = ?",
    [studentId, courseId],
    (err, results) => {
      if (err) {
        console.error("Query error:", err.message);
        return res.status(500).json({ error: "Query error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Already enrolled in this course" });
      }

      db.query(
        "INSERT INTO enrollments (StudentID, CourseID) VALUES (?, ?)",
        [studentId, courseId],
        (err, result) => {
          if (err) {
            console.error("Enrollment insert error:", err.message);
            return res.status(500).json({ error: "Enrollment failed" });
          }

          console.log(`Enrollment added: StudentID=${studentId}, CourseID=${courseId}`);
          res.json({ success: true });
        }
      );
    }
  );
});

// Get courses that the logged-in student is enrolled in

// Get enrolled courses for a specific student
app.get("/api/enrolled-courses", (req, res) => {
  const studentId = parseInt(req.query.studentId);

  if (!studentId) {
    return res.status(400).json({ error: "Student ID is required" });
  }

  console.log(`➡️  GET /api/enrolled-courses for studentId=${studentId}`);

  const query = `
    SELECT c.CourseID, c.CourseName, c.Credits
    FROM Courses c
    INNER JOIN Enrollments e ON c.CourseID = e.CourseID
    WHERE e.StudentID = ?
  `;

  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Query error:", err.message);
      return res.status(500).json({ error: "Failed to fetch enrolled courses" });
    }

    console.log(`Found ${results.length} enrolled course(s)`);
    res.json(results);
  });
});


app.post("/api/createAccount", (req, res) => { //API route for to create an account
  console.log("➡️  POST /api/createAccount hit with:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  

  db.query("INSERT INTO students (Name, Email, Password) VALUES (?, ?, ?)", 
    [name, email.toLowerCase(), password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Email already exists" });
      }
      console.error("Insert error:", err.message);
      return res.status(500).json({ error: "Failed to create account" });
    }

    console.log("ccount created for:", email);
    res.status(201).json({ message: "Account created successfully" });
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
        console.error("Query error:", err.message);
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

      console.log("Login successful for:", studentData.Email);
      res.json(studentData);
    }
  );
});

app.post("/api/drop-course", (req, res) => {
  const { studentId, courseId } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ error: "Missing studentId or courseId" });
  }

  db.query(
    "DELETE FROM enrollments WHERE StudentID = ? AND CourseID = ?",
    [studentId, courseId],
    (err, result) => {
      if (err) {
        console.error("Drop course query error:", err.message);
        return res.status(500).json({ error: "Failed to drop course" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      res.json({ success: true, message: `Dropped course ID ${courseId}` });
    }
  );
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
