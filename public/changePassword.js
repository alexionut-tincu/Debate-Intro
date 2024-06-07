document.getElementById('change-password-form').addEventListener('submit', function(event) {
	event.preventDefault();
	const username = document.getElementById('change-username').value;
	const oldPassword = document.getElementById('old-password').value;
	const newPassword = document.getElementById('new-password').value;
    
	fetch('/change-password', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ username, oldPassword, newPassword })
	})
	.then(response => response.json())
	.then(data => {
	    const messageDiv = document.getElementById('change-password-message');
	    messageDiv.textContent = data.message;
	});
    });
    