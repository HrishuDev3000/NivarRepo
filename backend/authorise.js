/*const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "sys",
    password: process.env.DB_PASS
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + db.threadId);
});

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error executing MySQL query: ' + err.stack);
                return res.status(500).json({ error: 'Error executing MySQL query' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            return res.status(500).json({ error: 'Error executing MySQL query' });
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    });
});

module.exports = router;
*/