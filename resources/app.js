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
  appendChildren(document.body, trap.header(), trap.menu(), trap.footer())
}

var trap = {
  _header: null,
  _menu: null,
  _footer: null,
  header () {
    if (this._header) return this._header
    this._header = make('div')
    var logo = make('img')
    var cart = make('img')
    var stac = make('img')
    this._header.id = 'header'
    logo.id = 'logo'
    cart.id = 'nav-cart'
    stac.id = 'nav-stac'
    logo.alt = 'logo'
    cart.alt = 'shopping cart'
    stac.alt = 'navigation stac'
    appendChildren(this._header, stac, logo, cart)
    return this._header
  },
menu () {
    if (this._menu) return this._menu
    this._menu = make('div')
    var reinigung = make('span')
    var schutz = make('span')
    var gestaltung = make('span')
    var philosophy = make('span')
    var diy = make('span')
    this._menu.id = 'menu'
    reinigung.id = 'nav-reinigung'
    schutz.id = 'nav-schutz'
    gestaltung.id = 'nav-gestaltung'
    philosophy.id = 'nav-philosophy'
    diy.id = 'nav-diy'
    reinigung.innerText = 'Reingung'
    schutz.innerText = 'Schutz'
    gestaltung.innerText = 'Gestaltung'
    philosophy.innerText = 'Philosophy'
    diy.innerText = 'DIY'
    appendChildren(this._menu, reinigung, schutz, gestaltung, philosophy, diy)
    return this._menu
  },
  footer () {
    if (this._footer) return this._footer
    this._footer = make('div')
    var mig = make('img')
    var kontakt = make('span')
    var agb = make('span')
    this._footer.id = 'footer'
    mig.id = 'mig'
    kontakt.id = 'nav-kontakt'
    agb.id = 'nav-agb'
    mig.alt = 'made in germany'
    kontakt.innerText = 'Kontakt'
    agb.innerText = 'AGB'
    appendChildren(this._footer, mig, kontakt, agb)
    return this._footer
  }
}

window.onload = init
