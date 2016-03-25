#!/usr/bin/env node


/**
 * Set up server for app
 */

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var grab=require('./index-help')
var fs=require('fs')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var placeHolder = ""
var tag='NZFLAG';
app.get('/', function(req, res) {
  res.redirect('/photos')
})

app.post('/', function(req, res) {
  tag=req.body.tag
  tag=grab.trimSpace(tag).toUpperCase();
  fs.writeFileSync('./tag.json',JSON.stringify(tag))
res.redirect('/photos')
})


var count=0;
app.get('/photos', function(req, res) {
  var imageObjArr=[];
  tag = JSON.parse(fs.readFileSync('./tag.json') )
  tag=grab.trimSpace(tag).toUpperCase();
  grab.getFlickrPhotos(tag,function(err,images){
    imageObjArr=images.map(function(image){
      return {id:count++, image: image}
    })
    fs.writeFileSync('./photos.json',JSON.stringify(imageObjArr))
    res.render('index',{objs:imageObjArr});
  })

})

app.get('/photos/:id', function(req,res){
   var imageObjArr = JSON.parse(fs.readFileSync('./photos.json') )
   tag = JSON.parse(fs.readFileSync('./tag.json') )
   tag=grab.trimSpace(tag).toUpperCase();
   imageObjArr = imageObjArr.filter(function(obj){
    return obj.id == req.params.id;
   })
     grab.getTweets(tag,function(err,tweets){
      var texts=tweets.map(function(tweetObj){
        return tweetObj.text;
      })
      imageObjArr[0].tweets=[texts[0],texts[2],texts[4]];

      res.render('touch',{objs:imageObjArr});
     })

})

app.get('/:tag', function(req, res) {
  var imageObjArr=[];
  tag=req.params.tag
  tag=grab.trimSpace(tag).toUpperCase();
  grab.getFlickrPhotos(tag,function(err,images){
    imageObjArr=images.map(function(image){
      return {id:count++, image: image}
    })
    fs.writeFileSync('./tag.json',JSON.stringify(tag))
    fs.writeFileSync('./photos.json',JSON.stringify(imageObjArr))
    res.render('index',{objs:imageObjArr});
  })

})





/**
 * Module dependencies.
 */

var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,function(){
  console.log('the server is running ,listening to port 5000')
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}

module.exports = app;
