document.getElementById('delete-account-form').addEventListener('submit', function(event) {
	event.preventDefault();
	const username = document.getElementById('delete-username').value;
	const password = document.getElementById('delete-password').value;
    
	fetch('/delete-account', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ username, password })
	})
	.then(response => response.json())
	.then(data => {
	    const messageDiv = document.getElementById('delete-account-message');
	    messageDiv.textContent = data.message;
	});
    });
    