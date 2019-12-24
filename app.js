let express = require('express');
let hbs = require('express-handlebars');

var app = express();

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	res.render('home');
});

app.listen(3000);