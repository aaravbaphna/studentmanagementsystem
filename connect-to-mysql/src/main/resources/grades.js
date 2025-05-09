// grades.js

function goBack() {
  window.history.back();
}

const exampleGrades = ["A", "A-", "B+", "B", "C+", "C"];

const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

const tableBody = document.querySelector("#gradesTable tbody");

if (enrolledCourses.length === 0) {
  const row = document.createElement("tr");
  row.innerHTML = `<td colspan="3">No enrolled courses found.</td>`;
  tableBody.appendChild(row);
} else {
  enrolledCourses.forEach(course => {
    const grade = exampleGrades[Math.floor(Math.random() * exampleGrades.length)];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${course.name}</td>
      <td>${course.credits}</td>
      <td>${grade}</td>
    `;

    tableBody.appendChild(row);
  });
}

  