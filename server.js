const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let users = [];

// Load users from JSON file
fs.readFile('users.json', (err, data) => {
    if (err && err.code !== 'ENOENT') {
        console.error('Error reading users.json:', err);
    } else {
        users = JSON.parse(data || '[]');
    }
});

// Save users to JSON file
function saveUsers() {
    fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error writing to users.json:', err);
        }
    });
}

// Register new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        res.json({ success: false, message: 'Username already exists' });
    } else {
        users.push({ username, password, score: 0 });
        saveUsers();
        res.json({ success: true });
    }
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, username: user.username });
    } else {
        res.json({ success: false });
    }
});

// Change password
app.post('/change-password', (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const user = users.find(u => u.username === username && u.password === oldPassword);
    if (user) {
        user.password = newPassword;
        saveUsers();
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Delete account
app.post('/delete-account', (req, res) => {
    const { username, password } = req.body;
    const index = users.findIndex(u => u.username === username && u.password === password);
    if (index !== -1) {
        users.splice(index, 1);
        saveUsers();
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Submit quiz score
app.post('/submit-quiz', (req, res) => {
    const { username, score } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        user.score = score;
        saveUsers();
        res.json({ success: true, score: user.score });
    } else {
        res.json({ success: false });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
