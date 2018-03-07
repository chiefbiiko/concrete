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
  appendChildren(document.body, 
    trap.header(), trap.nav(), trap.main(), trap.footer()
  )
}

window.onload = init
