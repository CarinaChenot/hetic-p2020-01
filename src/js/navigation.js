import createHistory from 'history/createBrowserHistory'
import { initTimeline } from './timeline'
import { initAnimToggle } from './anim_toggle'
import { initScrollAnim } from './scroll_anim'
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
    this.history = createHistory()
    this.currentPage = this.getCurrentPage()
    this.$links = document.querySelectorAll('[data-link]')
    this.addEvents()
    this.getContent(this.currentPage)
  }
  retrieveBodyLinks() {
    let bodyLinks = document.querySelectorAll('[data-body-link]')
    this.addEvents(bodyLinks)
  }
  addEvents(links = this.$links) {
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        this.currentPage = link.getAttribute('data-link') || link.getAttribute('data-body-link')
        this.update()
      })
    })
  }
  updateCurrentPage() {
    this.currentPage = this.getCurrentPage()
  }
  getCurrentPage() {
    let location = this.history.location.pathname.substr(1)

    return location === '' ? HOME_PAGE : location
  }
  update() {
    let mobileAppUrl

    if (this.currentPage === 'app' && (mobileAppUrl = this.mobileAppUrl())) {
      window.location = mobileAppUrl
      return
    }

    this.getContent()
    this.updateUrl()
  }
  mobileAppUrl() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    if (/android/i.test(userAgent)) {
      return 'https://play.google.com/store/apps/details?id=com.google.android.youtube'
    } else if (/iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'https://itunes.apple.com/fr/app/youtube/id544007664?mt=8'
    }

    return false
  }
  updateUrl() {
    this.history.push('/' + (this.currentPage === HOME_PAGE ? '' : this.currentPage))
    window && window.scroll(0, 0)
  }
  updateDOM(data) {
    this.$content.innerHTML = data

    initTranslation()

    switch (this.currentPage) {
      case HOME_PAGE:
        initHome()
        this.retrieveBodyLinks()
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
  initScrollAnim()
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
