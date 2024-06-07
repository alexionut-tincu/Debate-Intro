document.getElementById('quiz-form').addEventListener('submit', function(event) {
	event.preventDefault();
	const username = localStorage.getItem('loggedInUser');
    
	const score = [
	    document.querySelector('input[name="q1"]:checked')?.value || 0,
	    document.querySelector('input[name="q2"]:checked')?.value || 0,
	    document.querySelector('input[name="q3"]:checked')?.value || 0,
	    document.querySelector('input[name="q4"]:checked')?.value || 0,
	    document.querySelector('input[name="q5"]:checked')?.value || 0,
	    document.querySelector('input[name="q6"]:checked')?.value || 0
	].reduce((acc, val) => acc + parseInt(val), 0);
    
	fetch('/submit-quiz', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify({ username, score })
	})
	.then(response => response.json())
	.then(data => {
	    const messageDiv = document.getElementById('quiz-message');
	    messageDiv.textContent = `Quiz submitted! Your score: ${data.score}`;
	});
    });
    