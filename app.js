const express = require('express');

const cors = require('cors');

const port = process.env.PORT || 7777;

const mysql = require('mysql');

const app = express();

app.use(cors());

//Config Mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'pim_student'
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
});

app.get('/alumni', (req, res) => {
    const { limit } = req.query;
    const GET_ALUMI = `SELECT * FROM Profile LIMIT ${limit}`;
    connection.query(GET_ALUMI, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                result
            })
        }
    })
})

app.get('/allstd', (req, res) => {
    const ALL_STD = `SELECT * FROM Profile`;
    connection.query(ALL_STD, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                result
            })
        }
    })
})

app.get('/worked', (req, res) => {
    const GET_WORKED = `SELECT * FROM Profile WHERE Profile.status = "ทำงานแล้ว"`;
    connection.query(GET_WORKED, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})


app.get('/checkstatus', (req, res) => {
    const { stuID } = req.query;
    const CHECK_STATUS = `SELECT * FROM Workplace LEFT JOIN Profile ON Profile.studentID = Workplace.studentID WHERE Workplace.studentID = "${stuID}"`;
    connection.query(CHECK_STATUS, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/searchStu', (req, res) => {
    const { stuName } = req.query;
    const SEARCH_STU = `SELECT * FROM Profile WHERE Profile.fullName LIKE '%${stuName}%'`;
    connection.query(SEARCH_STU, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/searchID', (req, res) => {
    const { stuID } = req.query;
    const SEARCH_STU_ID = `SELECT Profile.fullName,Profile.studentID,Profile.major,Profile.yearGraduate,Profile.educationLevel,Profile.email,Profile.thumnail,Profile.status,Workplace.Workplace,Workplace.Address,Workplace.Province,Workplace.Contact,Workplace.Status AS WorkplaceStatus FROM Profile LEFT JOIN Workplace ON Workplace.studentID = Profile.studentID WHERE Profile.studentID ="${stuID}"`;
    connection.query(SEARCH_STU_ID, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/searchbyid', (req, res) => {
    const { sID } = req.query;
    const SEARCH_STU_ID = `SELECT Profile.fullName,Profile.studentID,Profile.major,Profile.yearGraduate,Profile.educationLevel,Profile.email,Profile.thumnail,Profile.status,Workplace.Workplace,Workplace.Address,Workplace.Province,Workplace.Contact,Workplace.Status AS WorkplaceStatus FROM Profile LEFT JOIN Workplace ON Workplace.studentID = Profile.studentID WHERE Profile.sID ="${sID}"`;
    connection.query(SEARCH_STU_ID, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/admin/add', (req, res) => {
    const { fullName, studentID, major, yearGraduate, educationLevel, email, thumnail, status } = req.query;
    const ADD_STU = `INSERT INTO Profile 
    (fullName,studentID,major,yearGraduate,educationLevel,email,thumnail,status) VALUES ("${fullName}","${studentID}","${major}","${yearGraduate}","${educationLevel}","${email}","${thumnail}","${status}")`;
    connection.query(ADD_STU, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/admin/addworkplace', (req, res) => {
    const { status, workplace, address, province, contact, studentID } = req.query;
    const ADD_WORK = `INSERT INTO Workplace 
    (status,workplace,address,province,contact,studentID) VALUES ("${status}","${workplace}","${address}","${province}","${contact}","${studentID}")`;
    connection.query(ADD_WORK, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/deleteworkplace', (req, res) => {
    const { studentID } = req.query;
    const DELETE_WORKPLACE = `DELETE FROM Workplace WHERE Workplace.studentID = "${studentID}"`;
    connection.query(DELETE_WORKPLACE, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/updatestd', (req, res) => {
    const { fullName, studentID, major, yearGraduate, educationLevel, email, sID } = req.query;
    const UPDATE_STD = `UPDATE Profile SET fullName='${fullName}',studentID='${studentID}',major='${major}',
    yearGraduate='${yearGraduate}',educationLevel='${educationLevel}',email='${email}' WHERE sID='${sID}'`;
    connection.query(UPDATE_STD, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/updatworkplace', (req, res) => {
    const { workplace, address, province, contact, studentID } = req.query;
    const UPDATE_WORKPLACE = `UPDATE Workplace SET Workplace="${workplace}",
    Address="${address}",Province="${province}",Contact="${contact}",
    studentID="${studentID}" WHERE Workplace.studentID = "${studentID}"`;
    connection.query(UPDATE_WORKPLACE, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/updatestatusworkplace', (req, res) => {
    const { studentID } = req.query;
    const UPDATE_WORKPLACE_STATUS = `UPDATE Workplace SET studentID="${studentID}" WHERE studentID`;
    connection.query(UPDATE_WORKPLACE_STATUS, (err, data) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data
            })
        }
    })
})

app.get('/deletestd', (req, res) => {
    const { studentID } = req.query;
    const DELETE_STD = `DELETE FROM Profile WHERE studentID="${studentID}"`;
    connection.query(DELETE_STD, (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                result
            })
        }
    })
})


app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});