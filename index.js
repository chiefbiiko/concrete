var fs = require('fs')
var http = require('http')

var HOST = process.env.HOST || process.argv[2] || '127.0.0.1'
var PORT = parseInt(process.env.PORT) || parseInt(process.argv[3]) || 41900
var FILE = process.env.BALL || process.argv[4]
var BALL = fs.readFileSync(FILE)
var HEADERS = { 'content-encoding': 'gzip', 'content-type': 'text/html' }

function onrequest (req, res) {
  res.writeHead(200, HEADERS)
  res.end(BALL)
}

var onlisten = console.log.bind(null, 'httpserver live @ ' + HOST + ':' + PORT)
var httpserver = http.createServer(onrequest)

httpserver.listen(PORT, HOST, onlisten)
