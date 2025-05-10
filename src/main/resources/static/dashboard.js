
window.onload = function() {
  const studentData = JSON.parse(localStorage.getItem('studentData')); //gets student name from local storage

  if (!studentData) {

    window.location.href = 'titlePage.html';
  } else {

    document.getElementById('studentName').textContent = studentData.name; //gets student name from the database
  }
};


function viewCourses() { //view courses
  window.location.href = 'courses.html';
}

function viewEnrolledCourses() {
   window.location.href = 'enrolledCourses.html';
}

function viewGrades() { //view grades
  window.location.href = 'grades.html';
}

function viewProfile() { //view profile
   window.location.href = 'profile.html';
}

 
