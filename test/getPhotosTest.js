var test = require('tape')
var fs = require('fs')

var testPhotos = fs.readFileSync('./testPhotos.json')
var expectedLinks = [ 'https://farm2.staticflickr.com/1472/25415135483_412f289070.jpg',
  'https://farm2.staticflickr.com/1615/25991731646_ef91423e3e.jpg',
  'https://farm2.staticflickr.com/1642/25951200541_8f8a67f7e2.jpg',
  'https://farm2.staticflickr.com/1672/26017561225_e85c3e0787.jpg',
  'https://farm2.staticflickr.com/1447/26017559095_228e1fcc1b.jpg',
  'https://farm2.staticflickr.com/1449/25950903341_46e806bfe3.jpg',
  'https://farm2.staticflickr.com/1487/25744443360_8bee026889.jpg',
  'https://farm2.staticflickr.com/1582/25924431722_c02fc1a289.jpg',
  'https://farm2.staticflickr.com/1458/25414414743_eb3c87fff4.jpg' ]

function getPhotos(photos) {
	var photos = JSON.parse(photos).photos.photo, links = []
    links = photos.map(function(photo){
    	return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
    })
    return links
}

var actualLinks = getPhotos(testPhotos)

test('test photo links', function(t) {
	t.deepEqual(actualLinks, expectedLinks, 'You successfully extracted the links!')
	t.end()
})

