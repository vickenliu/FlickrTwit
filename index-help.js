var twitter = require('twitter')
var dotenv = require('dotenv')
var request = require('request')

dotenv.load()
function trimSpace(str){
  var arr=str.split('');
  var result=arr.map(function(a){
    if(a!==' '){
      return a;
    }

  })
  return result.join('');
}
function getFlickrPhotos( tag, callback ){
  var query = [
    'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=',
    process.env.FLICKR_API_KEY,
    '&tags=',tag,'&per_page=9&format=json&nojsoncallback=1'
  ].join('')
  request(query, function (error, response, body) {
    if (error) {
      callback(error)
      return
    }

    var photos = JSON.parse(body).photos.photo, links = []
    links = photos.map(function(photo){
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
    })
    callback(null, links)
  })
}

var client = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

function getTweets (tag , callback) {
  client.get('search/tweets',{q:'#'+tag, lang:'en'}, function(err, tweets, response){
    if(err){ callback(err);  return }
    //console.log(tweets.statuses[0])
    callback(null, tweets.statuses)
  })
}


exports = module.exports = {
  getTweets: getTweets,
  getFlickrPhotos: getFlickrPhotos,
  trimSpace: trimSpace
}
