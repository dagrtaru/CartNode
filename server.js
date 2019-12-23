let connect = require('connect');
let serveStatic = require('serve-static');
let mysql = require('mysql');
let request = require('request');

request.post(
			'http://localhost:8080/index.html',
			{ json : {key : 'value'} },
			function(error, response, body){
				if(!error && response.statusCode == 200){
					console.log(body);
				}
			});

var connection = mysql.createConnection({
	port : 8080,
	user : 'Arka',
	password : '',
	database : 'cart'
});

connection.connect(function(err){
	if(err){
		console.log("Error connecting to database: " + err.stack);
		return;
	}
	let createItems = `create table if not exists items(
						id int primary key auto_increment,
						name varchar(255) not null,
						price int(4) not null default 0)`;
	connection.query(createItems, function(err){
		if(err){
			console.log(err.message);
		}
	});
	let insert1 = `INSERT INTO items(name, price)
				  VALUES("Shampoo", 100)`;
	connection.query(insert1, (error, results, fields) => {
		if(error){
			console.log(err.message);
		}
		console.log("Item id: " + results.insertId);
	});
	let insert2 = `INSERT INTO items(name, price)
				  VALUES("Shampoo", 100)`;
	connection.query(insert2, (error, results, fields) => {
		if(error){
			console.log(err.message);
		}
		console.log("Item id: " + results.insertId);
	});
	let sql = `SELECT * from items`;
	connection.query(sql, (error, results, fields) => {
		if(error){
			console.log(error.message);
		}
		console.log(results);
	});
	connection.end(function(err){
		if(err){
			return console.log(err.message);
		}
	});
});


connect().use(serveStatic(__dirname)).listen(8080, function(){
	console.log("Server running on 8080...");
});
