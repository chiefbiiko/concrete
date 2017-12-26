var fs = require('fs')
var http = require('http')
var path = require('path')
var zlib = require('zlib')

var HOST = process.argv[3] || '127.0.0.1'
var PORT = parseInt(process.argv[2]) || 50000

var RESOURCES = path.join(__dirname, 'RESOURCES')

var HTML = loadGzipBufferSync(path.join(RESOURCES, 'index.html'))
var JS   = loadGzipBufferSync(path.join(RESOURCES, 'app.js'))
var CSS  = loadGzipBufferSync(path.join(RESOURCES, 'style.css'))

var PICS = new Map(
  fs.readdirSync(path.join(RESOURCES, 'img')).map(function (pic) {
    return [ pic, loadGzipBufferSync(path.join(RESOURCES, 'img', pic)) ]
  })
)

function loadGzipBufferSync(file) {
  return zlib.gzipSync(fs.readFileSync(file))
}

function onlisten () {
  console.log('httpserver listening @ ' + HOST + ':' + PORT)
}

function router (req, res) { // keep-alive? share tcp socket with chat ws: ?
  var base = path.basename(req.url)

  res.statusCode = 200
  res.setHeader('Content-Encoding', 'gzip')

  if (!base || base === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.end(HTML)
  } else if (base === 'app.js') {
    res.setHeader('Content-Type', 'application/javascript')
    res.end(JS)
  } else if (base === 'style.css') {
    res.setHeader('Content-Type', 'text/css')
    res.end(CSS)
  } else if (PICS.has(base)) {
    res.setHeader('Content-Type', 'image/*')
    res.end(PICS.get(base))
  } else {
    res.statusCode = 404
    res.end()
  }

}

var httpserver = http.createServer(router)

httpserver.listen(PORT, HOST, onlisten)
