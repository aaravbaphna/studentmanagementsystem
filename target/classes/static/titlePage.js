const root = document.getElementById('root');

// Create title and description elements
const heading = document.createElement('h1');
heading.textContent = 'Student Academic Tracker';

const description = document.createElement('p');
description.textContent = 'Track student performance, courses, and grades efficiently.';

// Create container for login form
const container = document.createElement('div');
container.className = 'title-container';

// Create login form elements
const loginForm = document.createElement('form');
loginForm.id = 'loginForm';

const emailLabel = document.createElement('label');
emailLabel.setAttribute('for', 'email');
emailLabel.textContent = 'Email';
const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.id = 'email';
emailInput.name = 'email';
emailInput.required = true;

const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.textContent = 'Password';
const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.id = 'password';
passwordInput.name = 'password';
passwordInput.required = true;

const loginButton = document.createElement('button');
loginButton.textContent = 'Login';
loginButton.type = 'submit';

// Error message
const errorMessage = document.createElement('p');
errorMessage.id = 'error-message';
errorMessage.className = 'error';

// Create "Create Account" link
const createAccountText = document.createElement('p');
const createAccountLink = document.createElement('a');
createAccountLink.href = 'createAccount.html';
createAccountLink.textContent = "Don't have an account? Create new one here!";
createAccountLink.style.color = '#007bff';
createAccountLink.style.textDecoration = 'none';

createAccountText.appendChild(createAccountLink);

// Append form elements
loginForm.appendChild(emailLabel);
loginForm.appendChild(emailInput);
loginForm.appendChild(passwordLabel);
loginForm.appendChild(passwordInput);
loginForm.appendChild(loginButton);

container.appendChild(loginForm);
container.appendChild(createAccountText);
container.appendChild(errorMessage);

// Add everything to root
root.appendChild(heading);
root.appendChild(description);
root.appendChild(container);

// 🔐 Backend login via fetch
async function loginStudentFromDatabase(email, password) {
  try {
    const response = await fetch("http://localhost:4000/api/titlePage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) throw new Error("Invalid email or password.");

    const data = await response.json();

    // Normalize backend response
    const studentData = {
      studentId: data.StudentID,
      name: data.Name,
      email: data.Email
    };

    // Save student data in localStorage
    localStorage.setItem("studentData", JSON.stringify(studentData));

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.textContent = error.message;
  }
}

// 🔄 Handle form submission
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // 🎯 Dummy login (for testing/demo)
  if (email === "bob@school.edu" && password === "bob123") {
    const studentData = {
      studentId: 1, // Replace with a real student ID
      name: "Bob Smith",
      email: email
    };
    localStorage.setItem("studentData", JSON.stringify(studentData));
    window.location.href = "dashboard.html";
    return;
  }

  // 🌐 Use real backend login
  loginStudentFromDatabase(email, password);
});