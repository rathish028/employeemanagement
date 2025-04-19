const express = require('express');
const app = express();
const mysql2 = require('mysql2');
const cors = require('cors');
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config()

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))



//database connection
const db = mysql2.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    // insecureAuth:process.env.insecureAuth
});
console.log("process.env.db_port", process.env.user)
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log("database connected");
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const employeeId = req.body.employeeId;
    const department = req.body.department;
    const designation = req.body.designation;
    const project = req.body.project;
    const type = req.body.type
    const status = req.body.status


    //db queries
    db.query(
        'INSERT INTO information (name, employeeId, department, designation, project, type, status) VALUES (?,?,?,?,?,?,?)',
        [name, employeeId, department, designation, project, type, status],
        (err, result) => {
            if (err) {
                console.log('Error executing SQL query:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('values inserted');
            }
        });
});

app.get('/get-users', (req, res) => {
    db.query("SELECT * FROM information", (err, result) => {
        if (err) {
            console.log('Error executing SQL query (while getting employee list)', err);
        }
        else {
            res.send(result);
        }
    })
})

app.get('/get-users/:id', (req, res) => {
    const employeeId = req.body.employeeId
    db.query("SELECT * FROM information WHERE employeeId = ?",[employeeId], (err, result) => {
        if (err) {
            console.log('Error executing SQL query (while getting employee list)', err);
        }
        else {
            res.send(result);
        }
    })
})

app.put('/update-users', (req, res) => {
    const employeeId = req.body.employeeId;
    const name = req.body.name;
    const department = req.body.department
    const designation = req.body.designation
    const project = req.body.project
    const type = req.body.type
    const status = req.body.status
    db.query("UPDATE information SET name = ?, department = ?, designation = ?, project = ?, type = ?, status = ?  WHERE employeeId = ?", [name, department,designation, project, type, status, employeeId], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
});

app.delete('/delete/users/:id', (req, res) => {
    const employeeId = req.params.employeeId;
    db.query("DELETE FROM information WHERE employeeId = ?", [employeeId], (error, result) => {
        if (error) {
            console.log('Error deleting user',error);
        }
        else {
            res.send(result);
        }
    });
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});