// app.js

function init () {
  var txt = document.createElement('p')
  txt.innerText = 'some fraud'
  var pic = document.createElement('img')
  pic.src = '/resources/img/me.jpg'
  document.body.appendChild(txt)
  document.body.appendChild(pic)
}

window.onload = init
