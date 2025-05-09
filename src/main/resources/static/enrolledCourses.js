// enrolledCourses.js

function loadEnrolledCourses() {
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";

  const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  if (enrolledCourses.length === 0) {
    courseList.innerHTML = "<p>No courses enrolled.</p>";
    return;
  }

  enrolledCourses.forEach((course, index) => {
    const courseItem = document.createElement("div");
    courseItem.className = "course-item";

    const courseName = document.createElement("span");
    courseName.textContent = `${course.name} - ENROLLED`;

    const dropButton = document.createElement("button");
    dropButton.textContent = "Drop";
    dropButton.onclick = () => dropCourse(index);

    courseItem.appendChild(courseName);
    courseItem.appendChild(dropButton);
    courseList.appendChild(courseItem);
  });
}

function dropCourse(index) {
  const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  if (index >= 0 && index < enrolledCourses.length) {
    // ✅ Confirmation prompt added here
    const confirmDrop = confirm(`Are you sure you want to drop "${enrolledCourses[index].name}"?`);

    if (confirmDrop) {
      enrolledCourses.splice(index, 1);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
      alert("Course dropped successfully!");
      loadEnrolledCourses();
    }
  }
}

window.onload = loadEnrolledCourses;
