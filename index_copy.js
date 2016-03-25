var dotenv= require('dotenv')
var Twitter = require('twitter')
dotenv.load()
var client= new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
})


function findTweets() {
  client.get('search/tweets',{q:'#'+searchItem}, function(err, tweets, response){
    if (err) {
      console.log(err, "error")
      return
      }

      console.log(tweets.statuses,'before callback')
      // callback(null, tweets.statuses)
  })
}

findTweets()
