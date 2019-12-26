// Database name : cart
// Table name : items

const express = require('express');
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
app.get('/getitems', (req, res) => {
    let sql = 'SELECT * FROM items';                    
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send("Items fetched...");
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
