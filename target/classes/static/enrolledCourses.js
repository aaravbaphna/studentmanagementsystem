async function loadEnrolledCourses() {
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  
  if (!student || !student.StudentID) {
    alert("You must be logged in to view enrolled courses.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:4000/api/enrolled-courses?studentId=${student.StudentID}`);
    
    if (!response.ok) throw new Error("Failed to fetch enrolled courses.");

    const enrolledCourses = await response.json();

    const courseListContainer = document.getElementById("course-list");
    courseListContainer.innerHTML = "";

    if (enrolledCourses.length === 0) {
      courseListContainer.innerHTML = "<p>No enrolled courses found.</p>";
      return;
    }

    enrolledCourses.forEach(course => {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";

      courseCard.innerHTML = `
        <h3>${course.CourseName}</h3>
        <p><strong>Course ID:</strong> ${course.CourseID}</p>
        <p><strong>Credits:</strong> ${course.Credits}</p>
        <button onclick="dropCourse('${course.CourseID}')">Drop</button>
      `;

      courseListContainer.appendChild(courseCard);
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    alert("Failed to load enrolled courses.");
  }
}

async function dropCourse(courseId) {
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  if (!student || !student.StudentID) {
    alert("You must be logged in to drop courses.");
    return;
  }

  const confirmDrop = confirm(`Are you sure you want to drop the course with ID ${courseId}?`);
  if (!confirmDrop) return;

  try {
    const response = await fetch("http://localhost:4000/api/drop-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentId: student.StudentID,
        courseId: courseId
      })
    });

    if (!response.ok) throw new Error("Failed to drop course.");
    
    alert(`Successfully dropped course ${courseId}`);
    loadEnrolledCourses(); // Reload enrolled courses
  } catch (error) {
    console.error("Error dropping course:", error);
    alert("Failed to drop the course.");
  }
}

window.onload = loadEnrolledCourses;

