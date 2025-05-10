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

      // Send the student data to the server using POST request
      fetch('http://localhost:4000/api/createAccount', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData)
})
.then(async response => {
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
        // Try to extract error from JSON, or fallback to plain text
        const errText = contentType && contentType.includes("application/json")
          ? (await response.json()).error
          : await response.text();
        throw new Error(errText || "Unknown server error");
    }

    const data = await response.json();
    if (data.success) {
        alert("Account created successfully!");
        window.location.href = "titlePage.html";
    } else {
        errorMsg.textContent = data.error || "An error occurred. Please try again.";
    }
    })
.   catch(error => {
        console.error("Error:", error.message);
        errorMsg.textContent = `An error occurred: ${error.message}`;
    });

  }
});

