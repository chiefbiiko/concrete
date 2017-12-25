var fs = require('fs')
var http = require('http')
var path = require('path')
var pump = require('pump')

var HOST = process.argv[3] || '127.0.0.1'
var PORT = parseInt(process.argv[2]) || 50000

var HTML = path.join(__dirname,'resources', 'index.html.gz')
var JS = path.join(__dirname, 'resources', 'app.js.gz')
var CSS = path.join(__dirname, 'resources', 'style.css.gz')
	
function onlisten () {
  console.log('httpserver listening @ ' + HOST + ':' + PORT)
}

function router (req, res) {
  var readStream

  if (/(index\.html)|(\/)$/i.test(req.url)) {
    res.setHeader('Content-Type', 'text/html')
    readStream = fs.createReadStream(HTML)
  } else if (/app\.js$/i.test(req.url)) {
    res.setHeader('Content-Type', 'application/javascript')
    readStream = fs.createReadStream(JS)
  } else if (/style\.css$/i.test(req.url)) {
    res.setHeader('Content-Type', 'text/css')
    readStream = fs.createReadStream(CSS)
  } else if (/(png)|(jpg)$/i.test(req.url)) {
    var pic = path.join(__dirname, 'img', req.url.replace(/^.+\/(.+)$/, '$1'))
    res.setHeader('Content-Type', 'application/octet-stream')
    readStream = fs.createReadStream(pic)
  } else {
    res.statusCode = 404
    return res.end()
  }

  res.writeHead(200, {
  //'Access-Control-Allow-Origin': '*',
    'Transfer-Encoding': 'chunked',
    'Content-Encoding': 'gzip'
  })

  pump(readStream, res, function (err) {
    if (err) return console.error(err)
  })

}

var httpserver = http.createServer(router)

httpserver.listen(PORT, HOST, onlisten)
