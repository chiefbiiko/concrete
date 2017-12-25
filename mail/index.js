var fs = require('fs')
var path = require('path')
var nodemailer = require('nodemailer')

var credentials = path.join(__dirname, 'config', 'credentials.json')
var tokens = path.join(__dirname, 'config', 'tokens.json')
var cred = JSON.parse(fs.readFileSync(credentials))
var tok = JSON.parse(fs.readFileSync(tokens))

function updateTokens (access, refresh) {
  if (!access || !refresh) return console.error(Error('tokens are required'))
  fs.readFile(tokens, function (err, buf) {
    if (err) return console.error(err)
    var tok = JSON.parse(buf)
    tok.access_token = access
    tok.refresh_token = refresh
    fs.writeFile(tokens, JSON.stringify(tok), function (err) {
      if (err) return console.error(err)
    })
  })
}

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: 'noah.anabiik.schwarz@gmail.com',
        clientId: cred.client_id,
        clientSecret: cred.client_secret,
        refreshToken: tok.refresh_token,
        accessToken: tok.access_token
      //,expires: 1484314697598
    }
})

transporter.on('token', function (token) {
  console.log('got a new access token')
  console.log('user:', token.user)
  console.log('new access token:', token.accessToken)
  updateTokens(token.accessToken, token.refreshToken)
//console.log('Expires: %s', new Date(token.expires))
})

var message = {
  from: 'noah.anabiik.schwarz@gmail.com',
  to:  'noah.anabiik.schwarz@gmail.com',
  subject: 'nodemailer test',
  text: 'some plain jane text message'
}

transporter.sendMail(message, function (err, info) {
  if (err) return console.error(err)
  console.log('sent a message to %s', info.messageId)
})
