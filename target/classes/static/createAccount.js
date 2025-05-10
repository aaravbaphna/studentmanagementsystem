document.getElementById('createAccountForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMsg = document.getElementById('errorMsg');

  if (password !== confirmPassword) {
      errorMsg.textContent = "Passwords do not match.";
  } else {
      errorMsg.textContent = "";

      const studentData = {
          name: document.getElementById('studentName').value,
          email: document.getElementById('studentEmail').value,
          password: password
      };

      // Log student data for now (in real-world, send to a backend)
      console.log("Form submitted:", studentData);
      alert("Account created successfully!");

      // Reset the form after submission
      document.getElementById('createAccountForm').reset();
  }
});

  