// courses.js

const courses = [
  { courseId: "CS101", name: "Introduction to Computer Science", credits: 3 },
  { courseId: "MATH102", name: "Calculus I", credits: 4 },
  { courseId: "BIO103", name: "Biology 101", credits: 3 },
  { courseId: "CS201", name: "Data Structures and Algorithms", credits: 3 },
  { courseId: "PHYS104", name: "Physics I", credits: 4 },
];

function renderCourses(filteredCourses) {
  const courseListContainer = document.getElementById("course-list");
  courseListContainer.innerHTML = "";

  filteredCourses.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";

    courseCard.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>Course ID:</strong> ${course.courseId}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <button onclick="enrollCourse('${course.courseId}')">Enroll</button>
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

function enrollCourse(courseId) {
  const course = courses.find(c => c.courseId === courseId);
  if (!course) return;

  let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  if (enrolled.find(c => c.courseId === courseId)) {
    alert("Already enrolled in this course.");
    return;
  }

  // ✅ Confirmation prompt before enrolling
  const confirmEnroll = confirm(`Do you want to enroll in "${course.name}"?`);
  if (!confirmEnroll) return;

  enrolled.push(course);
  localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));

  console.log(`Enrolled in course: ${courseId}`);
  alert(`Enrolled in ${course.name}`);
}

window.onload = () => renderCourses(courses);
