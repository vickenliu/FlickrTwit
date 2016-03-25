var test = require('tape')
var fs = require('fs')

var testTweets = fs.readFileSync('./testTweets.json')
var expectedTweets = [ 'RT @BigLots: Check out our #Easter #Pinterest board here: https://t.co/6vPvDNCcpt for more inspiration! �� https://t.co/THyGWNmgHO',
  'RT @peta: #Vegan cream-filled chocolate eggs for those who used to ❤️ Cadbury Creme Eggs. #Easter\nhttps://t.co/7TpMlAamRL',
  'Great start to the weekend! @slugbrum was on point tonight �� big thanks to Bucky for hooking me up.. ��\n\n#Birmingham #easter',
  'MENS TAN POLO RALPH LAUREN ERWINS BOOTS/SNEAKERS/SHOES SIZE 10 https://t.co/rBKNaQm3Jf #FreshDressed #easter https://t.co/sRyzzl6iwr',
  'RT @apple_countyco: RT &amp; FOLLOW US @apple_countyco to win a #giftbox in time for #Easter #chocolate #cider winner picked on #goodfriday htt…',
  'What It\'s Like to Celebrate #Easter as an Atheist Surrounded by a Religious Family | VICE | #UnitedStates https://t.co/GYJErTn82t',
  'Check out SHERATON DESERT OASIS Easter Week 3/25-4/1/16 #Springbreak #VillaRental #GOLF  https://t.co/aK1s8zFi0t #Easter',
  '1/5 Why #Easter Friday is \'Good\' - “But he (Jesus) was pierced for our transgressions; he was crushed for our iniquities; upon him was the..',
  '#Easter It\'s not about the bunny. It\'s about the lamb...The rack of lamb we\'re having for dinner.',
  'RT @nswpolice: If you\'re caught using your mobile phone this #Easter long weekend you\'ll lose 8 demerit points. https://t.co/md5QSl9ZJt',
  'RT @photo_cj: If you @visitBlackpool this #Easter\nPop in @RNLIBlackpool Shop\nNr @TheBplTower\nNow open fully open https://t.co/54Wq0FoRom',
  'Wisemans Ferry #Easter celebration\nBistro open everyday \n#Jumping #Castle for the kiddies \n#Face Painting on Sunday https://t.co/ATq8AjuhOB',
  'RT @susandaisey1: Beach Decor-Beach house Beach Balls by HillbillyandME https://t.co/w8XrQYtSIV via @Etsy  #craftshout #Easter #spring #hom…',
  'Round 1 done #Easter #woglife #lafamiglia #prawns #oysters #wine https://t.co/3U7kyUi0kM',
  'Can\'t wait for tomorrow\'s story about how people could shop online but could not go in store today #Easter' ]

function getTweets(tweets) {
  // tweets = JSON.parse(tweets)
	tweets = JSON.parse(tweets).statuses.map(function(tweet){
    return tweet.text
  })
  return tweets
}

var actualTweets = getTweets(testTweets)

test('test tweets', function(t) {
	t.deepEqual(actualTweets, expectedTweets, 'You successfully extracted the tweets!')
  t.end()
})