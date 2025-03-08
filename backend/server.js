// Involve necessary modules
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

// Create a Express server
const app = express();
app.use(bodyParser.json());

// Create a table
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results);
});

app.get('/api/hi', function (req, res) {
    res.status(200).send('OK');
});

// Send all data in lists table to client
app.get('/api/values', function (req, res) {
    // Get all data from DB
    db.pool.query('SELECT * FROM lists;',
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err);
            else
                return res.json(results);
        });
});

// Store received data from client in lists table
app.post('/api/value', function (req, res, next) {
    // Store data in DB
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err) {
                return res.status(500).send(err);
            } else
                return res.json({ success: true, value: req.body.value });
            }
        });
});

app.listen(8000, () => {
    console.log('Server is running on 8000');
});
