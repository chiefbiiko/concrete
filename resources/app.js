// app.js

function make (tag) {
  return document.createElement(tag)
}

function $ (selector) {
  var nl = document.querySelectorAll(selector)
  return nl.length === 1 ? nl.item(0) : Array.from(nl)
}

function appendChildren (parent, ...children) {
  while (children.length) parent.appendChild(children.shift())
}

function init () {
  var boxconf = {
    src: 'https://github.com/chiefbiiko/ballify/raw/master/testfiles/minime.jpg',
    price: 419
  }
  // appendChildren(trap.mainBody(), trap.makeBox(boxconf))
  for (var i = 0; i < 8; i++) trap.mainBody().appendChild(trap.makeBox(boxconf))
  appendChildren(document.body,
    trap.header(), trap.nav(), trap.main(), trap.footer()
  )
}

window.onload = init
