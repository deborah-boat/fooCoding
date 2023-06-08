const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const mysql = require('mysql2');
let currentUser = null;

//create MYSQL connection 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mrsowusu@92',
  database: 'todo_database',
});

app.listen('3000', () => {
  console.log('Server started on port 3000');
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected');
});

app.use(express.json());

// set user
app.post('/user', (req, res) => {
  currentUser = req.body.name;
  res.send('using user ' + currentUser);
});

// get users lists
app.get('/lists', (req, res) => {
  db.execute(
    'SELECT list_name,list_id from todos inner join users on users.user_id = todos.user_id where users.username = ?',
    [req.body.name],
    function (err, results, fields) {
      console.log(results);
      res.send(results);
    },
  );
});

// delete item in to do list
app.delete('/deleteItem', (req, res) => {
  db.execute(
    'DELETE FROM list_items WHERE task_id =?',
    [req.body.task_id],
    function (err, results, fields) {
      console.log(results);
      res.send(results);
    },
  );
});

// delete to do list
app.delete('/deleteList', (req, res) => {
  db.execute(
    'DELETE FROM todos WHERE list_id = ?',
    [req.body.list_id],
    function (err, results, fields) {
      console.log(results);
      res.send(results);
    },
  );
});

// create list
app.post('/createList', (req, res) => {
  db.execute(
    'INSERT INTO `todo_database`.`todos` (`user_id`, `list_name`) VALUES (?, ?)',
    [req.body.user_id, req.body.list_name],
    function (err, results, fields) {
      console.log(results);
      res.send(results);
    },
  );
});

// insert item in to do list
app.put('/insertItem', (req, res) => {
  db.execute(
    'INSERT INTO `todo_database`.`list_items` (`list_id`, `item`, `completed`) VALUES (?, ?, 0)',
    [req.body.list_id, req.body.item],
    function (err, results, fields) {
      console.log(results);
      res.send(results);
    },
  );
});

// mark as completed
app.put('/completed', (req, res) => {
  db.execute(
    'UPDATE list_items SET completed = ? WHERE task_id = ?',
    [req.body.completed, req.body.task_id],
    function (err, results, fields) {
      console.log(results);
      res.send(results);
    },
  );
});

