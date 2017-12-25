var fs = require('fs')
var path = require('path')
var pump = require('pump')
var zlib = require('zlib')
var wishlist = require('f-d-wishlist')

var RESOURCES = path.join(__dirname, '..', 'resources')
var IMAGES = path.join(__dirname, '..', 'resources', 'img')

function onwishlist (err, list) {
  if (err) throw err
  
  var plains = list.files.filter(function (file) {
    return !file.endsWith('.gz')
  })

  plains.forEach(function (file) {
    var readStream = fs.createReadStream(file)
    var writeStream = fs.createWriteStream(file + '.gz')
    pump(readStream, zlib.createGzip(), writeStream, function (err) {
      if (err) throw err
    })
  }) 

}

wishlist(RESOURCES, { full: true }, onwishlist)
wishlist(IMAGES, { full: true }, onwishlist)
