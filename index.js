var twitter = require('twitter')
var dotenv = require('dotenv')
var request = require('request')

dotenv.load()

function getFlickrPhotos( tag, callback ){
  var query = [
    'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=',
    process.env.FLICKR_API_KEY,
    '&tags=',tag,'&per_page=10&format=json&nojsoncallback=1'
  ].join('')
  request(query, function (error, response, body) {
    if (err) {
      callback(err)
      return
    }

    var photos = JSON.parse(body).photos.photo, links = []
    links = photos.map(function(photo){
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
    })
    callback(null, links)
  }
}
