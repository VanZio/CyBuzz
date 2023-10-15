

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
    const sql = "SELECT * FROM Reports ORDER BY report_id DESC LIMIT 1";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.get('/api/history', (req, res)=> {
    const sql = "SELECT * FROM Reports";
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.get('/api/results', (req, res) => {
    const sql1 = "SELECT report_id FROM Reports ORDER BY report_id DESC LIMIT 1";
    db.query(sql1, (err, data) => {
        if (err) {
            return res.json({ error: err });
        }

        if (data.length === 0) {
            return res.json({ message: "No reports found." });
        }

        const reportId = data[0].report_id;

        const sql2 = "SELECT vulnerability_id FROM ReportVulnerabilities WHERE report_id=?";
        db.query(sql2, [reportId], (err, result) => {
            if (err) {
                return res.json({ error: err });
            }

            const vulIds = result.map(item => item.vulnerability_id);
            const sql3 = "SELECT * FROM `Vulnerabilities` WHERE vulnerability_id IN (?);";
            db.query(sql3, [vulIds], (err, response) => {
                if (err) {
                    return res.json({ error: err });
                }
                return res.json(response);
            });
        });
    });
});


// Start the server
const port = 3001; // Choose an available port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
