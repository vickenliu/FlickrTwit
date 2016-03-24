var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---------------------Ignore above here-------------------//

var placeHolder = ""

app.get('/', function(req, res) {
 res.redirect('/flickrtwit')
})

app.get('/flickrtwit', function(req, res) {
 res.render('touch', placeHolder)
})

app.get('/flickrtwit/:id', function(req,res){
  
})

module.exports = app;