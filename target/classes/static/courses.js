let courses = [];

async function fetchCourses() {
  try {
    const response = await fetch("http://localhost:4000/api/courses");
    if (!response.ok) throw new Error("Failed to fetch courses from server.");

    const data = await response.json();


    courses = data.map(course => ({
      courseId: course.CourseID,      
      name: course.CourseName,
      credits: course.Credits
    }));

    renderCourses(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    alert("Unable to load courses. Check your server or database.");
  }
}

function renderCourses(filteredCourses) { //code that shows the courses on the page 
  const courseListContainer = document.getElementById("course-list");
  courseListContainer.innerHTML = "";

  filteredCourses.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";

    courseCard.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Course ID:</strong> ${course.courseId}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <button onclick="enrollCourse(${course.courseId})">Enroll</button>
    `;

    courseListContainer.appendChild(courseCard);
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

function enrollCourse(courseId) { //allows enrollment, connection to backend
  const studentData = JSON.parse(localStorage.getItem("studentData"));
  if (!studentData) {
    alert("You must be logged in to enroll.");
    window.location.href = "titlePage.html";
    return;
  }

  const course = courses.find(c => c.courseId === courseId);
  if (!course) {
    alert("Course not found.");
    return;
  }

  const confirmEnroll = confirm(`Do you want to enroll in "${course.name}"?`);
  if (!confirmEnroll) return;

  fetch("http://localhost:4000/api/enroll", { //gets the data
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentId: parseInt(studentData.studentId),
      courseId: parseInt(course.courseId)
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(`❌ Enrollment failed: ${data.error}`);
      } else {
        alert(`✅ Enrolled in ${course.name}`);
        console.log(`Enrolled in course: ${course.courseId}`);
      }
    })
    .catch(err => {
      console.error("Enrollment error:", err);
      alert("❌ Enrollment request failed.");
    });
}

window.onload = () => fetchCourses();
