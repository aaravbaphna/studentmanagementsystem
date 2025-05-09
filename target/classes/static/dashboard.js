// Simulate student data (this should be set after login and stored in localStorage)
window.onload = function() {
  const studentData = JSON.parse(localStorage.getItem('studentData'));

  if (!studentData) {
    // If no student data is found, redirect to login page
    window.location.href = 'titlePage.html';
  } else {
    // Display student's name in the welcome message
    document.getElementById('studentName').textContent = studentData.name;
  }
};

// Placeholder functions for buttons (implement later)
function viewCourses() {
  window.location.href = 'courses.html';
}

function viewEnrolledCourses() {
   window.location.href = 'enrolledCourses.html';
}

function viewGrades() {
  window.location.href = 'grades.html';
}

function viewProfile() {
   window.location.href = 'profile.html';
}

 
