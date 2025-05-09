// Mock student data (replace with actual storage or backend in real use)
let studentData = {
  name: "John Doe",
  email: "john.doe@example.edu"
};

// Populate fields on page load
document.getElementById('name').value = studentData.name;
document.getElementById('email').value = studentData.email;



function goBack() {
  window.location.href = "dashboard.html";
}
