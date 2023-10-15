const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
    host: "feenix-mariadb.swin.edu.au",
    user: "s103989568",
    password: "170803",
    database: "s103989568_db"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

// Define a sample route
app.get('/api/reports', (req, res) => {
    const sql = "SELECT * FROM Reports";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.get('/api/vulnerabilities', (req, res)=> {
    const sql = "SELECT * FROM Vulnerabilities"
    db.query(sql, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    });
});

// Start the server
const port = 3001; // Choose an available port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
