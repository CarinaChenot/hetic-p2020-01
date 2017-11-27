import createHistory from 'history/createBrowserHistory'

const HOME_PAGE = 'home'
const STORY_PAGE = 'story'
const ERR_PAGE = '404'

class Navigation {
  constructor() {
    this.$content = document.querySelector('.content')
    this.$link = document.querySelectorAll('[data-link]')
    this.history = createHistory()
    this.currentPage = this.getCurrentPage()
    this.init()
  }
  init() {
    this.getFile(this.currentPage)
    this.$link.forEach(link => this.addEvents(link))
  }
  getCurrentPage() {
    let location = this.history.location.pathname.substr(1)

    return location === '' ? HOME_PAGE : location
  }
  addEvents(link) {
    link.addEventListener('click', e => {
      e.preventDefault()
      this.currentPage = link.getAttribute('data-link')
      this.update()
    })
  }
  update() {
    this.getFile()
    this.updateUrl()
  }
  updateUrl() {
    this.history.push('/' + (this.currentPage === HOME_PAGE ? '' : this.currentPage))
  }
  updateDOM(data) {
    this.$content.innerHTML = data

    switch (this.currentPage) {
      case HOME_PAGE:
        initHome()
        break
      case STORY_PAGE:
        initStory()
        break
    }
  }
  getFile(filename = this.currentPage) {
    fetch(filename + '.html').then(response => {
      if (response.ok) response.text().then(data => this.updateDOM(data))
      else this.handleError()
    })
  }
  handleError(err = ERR_PAGE) {
    this.currentPage = ERR_PAGE
    this.update()
  }
}

function initHome() {
  // Run scrips for home
  console.log('Init home scripts')
}

function initStory() {
  // Run scrips for story
  console.log('Init story scripts')
}

export {
  Navigation,
  initHome,
  initStory,
}
