// Database name : cart
// Table name : items

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

//Create database connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database  : 'cart' 
});

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql connected");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//Create DB using routing basically
app.get('/createdb', (req, res) => {
    
    sql = 'CREATE DATABASE cart';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database successfully created...');
    });
});

//Create table 
app.get('/createitemstable', (req, res) => {
    let sql = 'CREATE TABLE items(items_id int AUTO_INCREMENT, title VARCHAR(255), price int, PRIMARY KEY (items_id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Items table created...');
    });
});

//Insert item
app.get('/additem1', (req, res) => {
    let item = {title : 'Shampoo', price : 100};
    let sql = 'INSERT INTO items SET ?';                    //? acts as a place holder where item will get replaced
    let query = db.query(sql, item, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Item 1 inserted successfully");
    });
});

//Dynamically adding items
app.get('/add', (req, res) => {
    res.render('additem');
});

app.post('/additem', (req, res) => {
    let item = {title : req.body.name, price : req.body.price};
    let sql = `INSERT INTO items SET ?`;
    let query = db.query(sql, item, (err, result) => {
        if(err) throw err;
        console.log("Item inserted: " + item);
        res.send("Item " + item + " inserted successfully!");
    });
});

//Insert another item
app.get('/additem2', (req, res) => {
    let item = {title : 'Soap', price : 40};
    let sql = 'INSERT INTO items SET ?';                    //? acts as a place holder where item will get replaced
    let query = db.query(sql, item, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Item 2 inserted successfully");
    });
});

//SELECT items
/*app.get('/getitems', (req, res) => {
    let sql = 'SELECT * FROM items';                    
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        ans = results;
        console.log(results);
        res.send(results);
    });
});

//SELECT single item
app.get('/getitem/:id', (req, res) => {
    let sql = `SELECT * FROM items WHERE items_id = ${req.params.id}`;                    
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Item fetched...");
    });
});*/

//SELECT all items and display them in the homepage
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM items';
    let ans = '';                    
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        ans = results;
        console.log(ans);
        res.render('home', {val : ans});
    });
});

//UPDATE item
app.get('/updateitem/:id', (req, res) => {
    let new_title = "Anti-Dandruff Shampoo";
    let sql = `UPDATE items SET title = '${new_title}' WHERE items_id = ${req.params.id}`;                    
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Item updated...");
    });
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});
