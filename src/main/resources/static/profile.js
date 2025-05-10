// Retrieve student data from localStorage
const studentData = JSON.parse(localStorage.getItem('studentData'));

// Check if studentData exists (i.e., the user is logged in)
if (studentData) {
  // Populate profile fields with student data
  document.getElementById('studentName').textContent = studentData.name;
  document.getElementById('studentEmail').textContent = studentData.email;
} else {
  // Handle case where there's no logged-in data (redirect to login page)
  window.location.href = 'titlePage.html';
}

function goBack() {
  window.location.href = "dashboard.html";
}
