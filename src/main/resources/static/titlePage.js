const root = document.getElementById('root');

// Create title and description elements (above the container)
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

// Create "Create Account" link/button
const createAccountText = document.createElement('p');
const createAccountLink = document.createElement('a');
createAccountLink.href = 'createAccount.html';
createAccountLink.textContent = "Don't have an account? Create new one here!";
createAccountLink.style.color = '#007bff';
createAccountLink.style.textDecoration = 'none';

createAccountText.appendChild(createAccountLink);

// Append form elements to the container
loginForm.appendChild(emailLabel);
loginForm.appendChild(emailInput);
loginForm.appendChild(passwordLabel);
loginForm.appendChild(passwordInput);
loginForm.appendChild(loginButton);

container.appendChild(loginForm);
container.appendChild(createAccountText);
container.appendChild(errorMessage);

// Append everything to the root element
root.appendChild(heading);
root.appendChild(description);
root.appendChild(container);

// JavaScript for handling the form submission
// JavaScript for handling the form submission
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Simulate login validation
  if (email === "bob@school.edu" && password === "bob123") {
    // Store student data to localStorage
    const studentData = {
      name: "Bob Smith", // Or pull from a list/database if available
      email: email
    };
    localStorage.setItem("studentData", JSON.stringify(studentData));

    // Redirect to dashboard page on successful login
    window.location.href = "dashboard.html";
  } else {
    errorMessage.textContent = "Invalid email or password.";
  }
});


