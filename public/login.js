document.getElementById('login-form').addEventListener('submit', function(event) {
	event.preventDefault();
	const username = document.getElementById('login-username').value;
	const password = document.getElementById('login-password').value;
    
	fetch('/login', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ username, password })
	})
	.then(response => response.json())
	.then(data => {
	    const messageDiv = document.getElementById('login-message');
	    if (data.success) {
		messageDiv.textContent = 'Login successful!';
		document.getElementById('quiz-section').style.display = 'block';
		localStorage.setItem('loggedInUser', username);
	    } else {
		messageDiv.textContent = 'Login failed: ' + data.message;
	    }
	});
    });
    