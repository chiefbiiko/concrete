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
  document.body.appendChild(trap.getHeader())
}

var trap = {
  _header: null,
  getHeader () {
    if (this._header) return this._header
    this._header = make('div')
    var logo = make('img')
    var cart = make('img')
    var reinigung = make('span')
    var schutz = make('span')
    var gestaltung = make('span')
    var philosophy = make('span')
    var diy = make('span')
    this._header.id = 'header'
    logo.id = 'logo'
    cart.id = 'nav-cart'
    reinigung.id = 'nav-reinigung'
    schutz.id = 'nav-schutz'
    gestaltung.id = 'nav-gestaltung'
    philosophy.id = 'nav-philosophy'
    diy.id = 'nav-diy'
    logo.alt = 'logo'
    cart.alt = 'shopping cart'
    reinigung.innerText = 'Reingung'
    schutz.innerText = 'Schutz'
    gestaltung.innerText = 'Gestaltung'
    philosophy.innerText = 'Philosophy'
    diy.innerText = 'DIY'
    appendChildren(this._header, logo, cart, reinigung, schutz, gestaltung, philosophy, diy)
    return this._header
  }
}

window.onload = init
