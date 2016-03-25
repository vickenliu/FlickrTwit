require('dotenv').config()
var express        = require('express') // import express.js
var hbs            = require('express-hbs') // handlebars
var bodyParser     = require('body-parser') // parse request bodies
var path           = require('path') // work with file paths
var methodOverride = require('method-override') // allow put, delete through post
var app = express() // create the express application

var testArr = [
    { url: "http://www.yehudakatz.com", title: "Katz Got Your Tongue" },
    { url: "http://www.sproutcore.com/block", title: "SproutCore Blog" },
  ]

app.get('/', function(req, res) {
 res.redirect('/index') // what is this doing? its redirecting to the second url
})

app.get('/index', function(req, res) {
 res.render('index.hbs')
})

module.exports = app;
