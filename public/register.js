document.getElementById('register-form').addEventListener('submit', function (event) {
	event.preventDefault();
	const username = document.getElementById('reg-username').value;
	const password = document.getElementById('reg-password').value;
    
	fetch('/register', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ username, password })
	})
	.then(response => response.json())
	.then(data => {
	    const messageDiv = document.getElementById('register-message');
	    if (data.success) {
		messageDiv.innerHTML = 'Registration successful!';
	    } else {
		messageDiv.innerHTML = `Registration failed: ${data.message}`;
	    }
	});
    });
    