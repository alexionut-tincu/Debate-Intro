document.addEventListener('DOMContentLoaded', () =>
{
	const loginForm = document.getElementById('loginForm');
	const quizForm = document.getElementById('quizForm');
	const logoutButton = document.getElementById('logoutButton');
	
	loginForm.addEventListener('submit', (event) => {
	    event.preventDefault();
	    const username = document.getElementById('username').value;
	    const password = document.getElementById('password').value;
    
	    fetch('/login', {
		method: 'POST',
		headers: {
		    'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	    }).then(response => response.json()).then(data => {
		if (data.success) {
		    localStorage.setItem('username', data.username);
		    alert('Login successful');
		    loginForm.style.display = 'none';
		    quizForm.style.display = 'block';
		    logoutButton.style.display = 'block';
		} else {
		    alert('Invalid username or password.');
		}
	    }).catch(error => console.error('Error:', error));
	});
    
	quizForm.addEventListener('submit', (event) => {
	    event.preventDefault();
	    const q1 = document.querySelector('input[name="q1"]:checked');
	    
	    if (q1) {
		const score = q1.value === 'British Parliament' ? 1 : 0;
		const username = localStorage.getItem('username');
    
		fetch('/submit-quiz', {
		    method: 'POST',
		    headers: {
			'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({ username, score })
		}).then(response => response.json()).then(data => {
		    if (data.success) {
			localStorage.setItem('score', data.score);
			alert('Quiz submitted! Your score is: ' + data.score);
		    } else {
			alert('Error submitting quiz.');
		    }
		}).catch(error => console.error('Error:', error));
	    } else {
		alert('Please answer all questions.');
	    }
	});
    
	logoutButton.addEventListener('click', () => {
	    localStorage.removeItem('username');
	    localStorage.removeItem('score');
	    alert('You have logged out.');
	    loginForm.style.display = 'block';
	    quizForm.style.display = 'none';
	    logoutButton.style.display = 'none';
	});
    
	const storedUsername = localStorage.getItem('username');
	if (storedUsername) {
	    alert('Welcome back, ' + storedUsername);
	    loginForm.style.display = 'none';
	    quizForm.style.display = 'block';
	    logoutButton.style.display = 'block';
	}
});