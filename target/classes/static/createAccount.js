document.getElementById('createAccountForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errorMsg = document.getElementById('errorMsg');
    
        if (password !== confirmPassword) {
            errorMsg.textContent = "Passwords do not match.";
            return;
        } else {
            errorMsg.textContent = "";
        }
    
        const studentData = {
            name: document.getElementById('studentName').value,
            email: document.getElementById('studentEmail').value,
            password: password
        };
    
        fetch('http://localhost:4000/api/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert("Account created successfully!");
      document.getElementById('createAccountForm').reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert("There was an error creating the account. Check the console.");
    });
    
    });