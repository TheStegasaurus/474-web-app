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

app.get('/classes/:major', (req, res) => {
  db.query('SELECT DISTINCT Prefix, Code, Name, Credits FROM catalog WHERE Prefix = ? ORDER BY Code', 
    [req.params.major],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let result = rows.map(row =>
        ({
           Prefix: row.Prefix,
           Code: row.Code,
           Name: row.Name,
           Credits: row.Credits
         })
      );
      res.json(result);
    }
  });
});

app.get('/class/:major/:number', (req, res) => {

  db.query('SELECT Description FROM catalog WHERE Prefix = ? AND Code = ?', 
    [req.params.major, req.params.number],
    (err, rows) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(rows[0].Description);
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


//TODO tutorial 2.1
//use the res.type to send a whole webpage????
//then i could use the url encoding stuff