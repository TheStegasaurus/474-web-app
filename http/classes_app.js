'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('html'));
app.set('json spaces', 2);

const pt = 8081;//process.env.PORT;

app.listen(pt, () => {
  console.log('Web server running as: ' + process.env.C9_HOSTNAME + ' on port: ' + pt);
});

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'jad006', // <-- Update this line with your username.
  database: 'c9'
});

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to the database.');
    throw err;
  } else {
    console.log('Connected to the database.');
  }
});

function makeUrl(id) {
  return 'http://' + process.env.C9_HOSTNAME + '/quotations/' + id;
}

app.get('/checkOffered/:major', (req, res) => {

  db.query('SELECT DISTINCT c.code FROM catalog as c' +
    ' LEFT JOIN enrollment AS e on c.prefix = e.subject and c.code = e.number' +
    ' WHERE prefix = ? AND e.nbr IS null' +
    ' ORDER BY c.code', 
    [req.params.major],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let result = rows.map(row =>
        ({
           Code: row.code
         })
      );
      res.json(result);
    }
  });
});

app.get('/classes/:major', (req, res) => {
  //This query gets the info to display in the row from the search term 
  //db.query('SELECT DISTINCT Prefix, Code, Name, Credits FROM catalog WHERE Prefix = ? ORDER BY Code', 
  
  
  db.query('SELECT DISTINCT c.Prefix, c.Code, c.Name, c.Credits, sub.number AS fills, sub2.code AS not_offered ' +
'FROM catalog AS c ' +
'LEFT Join (SELECT * FROM (SELECT number, avg(enrl_cap - enrolled) as avg_left '+
'FROM (SELECT distinct term, nbr, subject, number, enrolled, enrl_cap ' +
'FROM enrollment ' +
'WHERE subject = ? AND enrl_cap > 0) AS sub3 ' +
'GROUP BY number) as sub4 ' +
'WHERE avg_left < 2) AS sub ON sub.number = c.code ' +
'LEFT JOIN (SELECT DISTINCT c.code FROM catalog AS c ' +
'LEFT JOIN enrollment AS e ON c.prefix = e.subject AND c.code = e.number ' +
'WHERE prefix = ? AND e.nbr IS null ' +
'ORDER BY c.code) AS sub2 ON sub2.code = c.code ' +
'WHERE Prefix = ? ORDER BY c.Code',
    [req.params.major, req.params.major, req.params.major],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let result = rows.map(row =>
        ({
           Prefix: row.Prefix,
           Code: row.Code,
           Name: row.Name,
           Credits: row.Credits,
           Fills: row.fills,
           Not_offered: row.not_offered
         })
      );
      res.json(result);
    }
  });
});

app.get('/class/:major/:number', (req, res) => {

  db.query('SELECT Description, Name, Credits, program_usage FROM catalog WHERE Prefix = ? AND Code = ?', 
    [req.params.major, req.params.number],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let result = rows.map(row =>
        ({
           Name: row.Name,
           Description: row.Description,
           Credits: row.Credits,
           Program: row.program_usage
         })
      );
    res.json(result);
    }
  });



/*


var result = '';
result += req.params.major;
result += " ";
result += req.params.number;

res.json(result);
*/

  //console.log(d.sql);
});



app.get('/prereq/:major/:number?', (req, res) => {

if (!req.params.number)
{
//SELECT * FROM prereq WHERE prefix = ? ORDER BY code
  db.query('SELECT * FROM prereq AS p JOIN (SELECT DISTINCT c.code FROM catalog AS c LEFT JOIN enrollment AS e ON c.prefix = e.subject'+
  ' AND c.code = e.number WHERE prefix = ? AND e.nbr IS not null) AS sub ON sub.code = p.code WHERE p.prefix = ? ORDER BY p.code', 
    [req.params.major, req.params.major],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else 
    {
      let result = rows.map(row =>
      ({
         Prefix: row.prefix,
         Code: row.code,
         req_prefix: row.req_prefix,
         req_code: row.req_code
       })
      );
      res.json(result);
      }
    });
}
else 
{
  db.query('SELECT * FROM prereq WHERE prefix = ? AND code = ? ORDER BY code', 
    [req.params.major, req.params.number],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else 
    {
      let result = rows.map(row =>
      ({
         Prefix: row.prefix,
         Code: row.code,
         req_prefix: row.req_prefix,
         req_code: row.req_code
       })
      );
      res.json(result);
      }
    });
}

});


app.get('/instructor/:major/:class', (req, res) => {

  db.query('SELECT Instructor, count(*) AS count ' +
            'FROM (SELECT distinct term, nbr, Instructor ' +
            'FROM enrollment ' +
            'WHERE subject = ? ' +
            'AND number = ?) AS sub ' +
            'GROUP BY Instructor ' +
            'ORDER BY Instructor',
    [req.params.major, req.params.class],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let result = rows.map(row =>
        ({
           Instructor: row.Instructor,
           Count: row.count
         })
      );
      res.json(result);
    }
  });
});


//TODO tutorial 2.1
//use the res.type to send a whole webpage????
//then i could use the url encoding stuff