var trap = {
  _header: null,
  _nav: null,
  _main: null,
  _mainSidebar: null,
  _mainBody: null,
  _footer: null,
  header () {
    if (this._header) return this._header
    this._header = make('div')
    var logo = make('img')
    var cart = make('img')
    var stac = make('img')
    this._header.id = 'header'
    logo.id = 'header-logo'
    cart.id = 'header-cart'
    stac.id = 'header-stac'
    logo.alt = 'logo'
    cart.alt = 'shopping cart'
    stac.alt = 'nav stac'
    appendChildren(this._header, stac, logo, cart)
    return this._header
  },
  main () {
    if (this._main) return this._main
    this._main = make('div')
    this._main.id = 'main'
    appendChildren(this._main, this.mainSidebar(), this.mainBody())
    return this._main
  },
  mainSidebar () {
    if (this._mainSidebar) return this._mainSidebar
    this._mainSidebar = make('div')
    this._mainSidebar.id = 'main-sidebar'
    this._mainSidebar.innerText = 'mainSidebar'
    return this._mainSidebar
  },
  mainBody () {
    if (this._mainBody) return this._mainBody
    this._mainBody = make('div')
    this._mainBody.id = 'main-body'
    this._mainBody.innerText = 'mainBody'
    return this._mainBody
  },
  nav () {
    if (this._nav) return this._nav
    this._nav = make('div')
    var reinigung = make('span')
    var schutz = make('span')
    var gestaltung = make('span')
    var philosophy = make('span')
    var diy = make('span')
    this._nav.id = 'nav'
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
    appendChildren(this._nav, reinigung, schutz, gestaltung, philosophy, diy)
    return this._nav
  },
  footer () {
    if (this._footer) return this._footer
    this._footer = make('div')
    var mig = make('img')
    var kontakt = make('span')
    var agb = make('span')
    this._footer.id = 'footer'
    mig.id = 'footer-made-in-germany'
    kontakt.id = 'footer-kontakt'
    agb.id = 'footer-agb'
    mig.alt = 'made in germany'
    kontakt.innerText = 'Kontakt'
    agb.innerText = 'AGB'
    appendChildren(this._footer, mig, kontakt, agb)
    return this._footer
  },
  /*
  conf: Object
    {
      src: String,
      info: String,
      price: Number // if product price
    }
  */
  makeBox (conf) {
    if (!conf) conf = {}
    var box = make('div')
    var top = make('div')
    box.classList.add('box')
    top.classList.add('box-top')
    box.style.backgroundImage = 'url("' + conf.src + '")'
    top.innerText = conf.info || 'info text'

    appendChildren(box, top)
    if (conf.price) {
      var tag = make('span')
      var btn = make('span')
      tag.classList.add('price-tag')
      btn.classList.add('btn', 'buy-btn')
      tag.innerText = conf.price + '$'
      btn.innerText = 'Buy!'
      appendChildren(box, tag, btn)
    }
    return box
  }
}
