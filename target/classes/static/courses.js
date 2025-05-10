
async function fetchCourses() {
  try {
    const response = await fetch("http://localhost:4000/api/courses");
    if (!response.ok) throw new Error("Failed to fetch courses from server.");

    const data = await response.json();

    // Normalize the course data to match the frontend
    courses = data.map(course => ({
      courseId: course.CourseID,  // Adjust column name based on your API response
      name: course.CourseName,    // Adjust column name based on your API response
      credits: course.Credits
    }));

    renderCourses(courses);  // Call render function to display the courses
  } catch (error) {
    console.error("Error fetching courses:", error);
    alert("Unable to load courses. Check your server or database.");
  }
}

function renderCourses(filteredCourses) {
  const courseListContainer = document.getElementById("course-list");
  courseListContainer.innerHTML = "";  // Clear any existing courses

  filteredCourses.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";  // Adjust class for styling

    courseCard.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Course ID:</strong> ${course.courseId}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <button onclick="enrollCourse('${course.courseId}')">Enroll</button>
    `;

    courseListContainer.appendChild(courseCard);  // Append each course card to the container
  });
}

function filterCourses() {
  const searchInput = document.getElementById("course-search").value.toLowerCase();
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchInput) ||
    course.credits.toString().includes(searchInput)
  );
  renderCourses(filteredCourses);
}

async function enrollCourse(courseId) {
  const student = JSON.parse(localStorage.getItem("currentStudent"));
  if (!student || !student.StudentID) {
    alert("You must be logged in to enroll.");
    return;
  }

  const course = courses.find(c => c.courseId === courseId);
  if (!course) return;

  let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  if (enrolled.find(c => c.courseId === courseId)) {
    alert("Already enrolled in this course.");
    return;
  }

  const confirmEnroll = confirm(`Do you want to enroll in "${course.name}"?`);
  if (!confirmEnroll) return;

  // Save locally
  enrolled.push(course);
  localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));

  // Send POST request to backend
  try {
    const response = await fetch("http://localhost:4000/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentId: student.StudentID,
        courseId: course.courseId
      })
    });

    if (!response.ok) throw new Error("Enrollment failed.");
    
    alert(`Successfully enrolled in ${course.name}`);
  } catch (error) {
    console.error("Error enrolling:", error);
    alert("Enrollment failed on the server.");
  }
}

// Load courses when page is loaded
window.onload = fetchCourses;

