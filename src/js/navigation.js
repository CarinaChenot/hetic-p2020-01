import createHistory from 'history/createBrowserHistory'
import { initTimeline } from './timeline'
import { initAnimToggle } from './anim_toggle'
import { initFeatures } from './features'
import { initTranslation } from './translation'
import { init3dHelmet } from './3dHelmet'

const HOME_PAGE = 'home'
const STORY_PAGE = 'story'
const SPECS_PAGE = 'specs'
const APP_PAGE = 'app'
const ERR_PAGE = '404'
const STORAGE_KEY = 'ch_page_'

class Navigation {
  constructor() {
    this.$content = document.querySelector('.content')
    this.$link = document.querySelectorAll('[data-link]')
    this.history = createHistory()
    this.currentPage = this.getCurrentPage()
    this.init()
  }
  init() {
    this.getContent(this.currentPage)

    this.$link.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        this.currentPage = link.getAttribute('data-link')
        this.update()
      })
    })
  }
  getCurrentPage() {
    let location = this.history.location.pathname.substr(1)

    return location === '' ? HOME_PAGE : location
  }
  update() {
    this.getContent()
    this.updateUrl()
  }
  updateUrl() {
    this.history.push('/' + (this.currentPage === HOME_PAGE ? '' : this.currentPage))
  }
  updateDOM(data) {
    this.$content.innerHTML = data
    initTranslation()

    switch (this.currentPage) {
      case HOME_PAGE:
        initHome()
        break
      case STORY_PAGE:
        initStory()
        break
      case SPECS_PAGE:
        initSpecs()
        break
      case APP_PAGE:
        initApp()
        break
    }
  }
  getContent() {
    let content = this.getStorage()

    if (content) {
      this.updateDOM(content)
    } else {
      this.getFile()
    }
  }
  getStorage() {
    return localStorage.getItem(STORAGE_KEY + this.currentPage)
  }
  setStorage(data) {
    localStorage.setItem(STORAGE_KEY + this.currentPage, data)
  }
  getFile(filename = this.currentPage) {
    fetch(filename + '.html').then(response => {
      if (response.ok) {
        response.text().then(data => {
          this.updateDOM(data)
          this.setStorage(data)
        })
      } else this.handleError()
    })
  }
  handleError(err = ERR_PAGE) {
    this.currentPage = ERR_PAGE
    this.update()
  }
}

function initHome() {
  init3dHelmet()
}

function initStory() {
  initTimeline()
}

function initApp() {
  initAnimToggle()
}

function initSpecs() {
  initFeatures()
}

export {
  Navigation,
  initHome,
  initStory,
}
