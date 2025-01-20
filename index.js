const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost', // Use localhost if MySQL is on the same machine
    user: 'root',      // Replace with your database username
    password: 'reactnative3883',  // Replace with your database password
    database: 'StudentInfo',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

// API to sync data
app.post('/sync', (req, res) => {
    const students = req.body.students;

    const query = 'INSERT INTO information (student_name, student_id) VALUES ?';
    const values = students.map((student) => [student.student_name, student.student_id]);

    db.query(query, [values], (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error syncing data' });
        }
        res.status(200).json({ message: 'Data synced successfully!' });
    });
});

// Start server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://192.168.214.173:3000');
});
