const Lethargy = require('lethargy').Lethargy

class Timeline {
  constructor() {
    this.body = document.querySelector('body')
    this.main = document.querySelector('.story')
    this.content = document.querySelector('.timeline--1')
    this.allSlide = document.querySelectorAll('.timeline').length
    this.url = document.location.href
    this.pageUrl = this.url.substring(this.url.lastIndexOf('/') + 1)
    this.jamScroll = false
    this.translate = 0
    this.index = 1
    this.lethargy = new Lethargy()
  }
  addClass() {
    /**
     * add body class
     * @var this.pageUrl
     * @var this.body
     */

    if (this.pageUrl === 'story.html') {
      this.body.classList.add('body--story')
    } else {
      this.body.classList.remove('body--story')
    }
  }
  jam() {
    let that = this
    this.jamScroll = true
    setTimeout(function() {
      that.jamScroll = false
      console.log(that.jamScroll)
    }, 1200)
  }
  up() {
    this.translate += 100
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    if (this.index > 0) {
      this.index -= 1
    }
    this.update()
  }
  down() {
    this.translate -= 100
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    if (this.index < this.allSlide - 1) {
      this.index += 1
    }
    this.update()
  }
  nav(attribute) {
    let activeItem = document.querySelector('.timelineNav__item--active')
    if (activeItem != null) {
      activeItem.classList.remove('timelineNav__item--active')
    }

    let navigationItem = document.querySelector('.timelineNav__item--' + attribute)
    navigationItem.classList.add('timelineNav__item--active')
  }
  update() {
    let activeItem = document.querySelector('.timeline--active')
    this.content = document.querySelector('.timeline--' + this.index)
    activeItem.classList.remove('timeline--active')
    this.content.classList.add('timeline--active')
    if (this.content.getAttribute('data-date')) {
      let attribute = this.content.getAttribute('data-date')
      this.nav(attribute)
    }
    this.scrollEvent()
  }

  lethargyScroll(e) {
    let that = this
    if (window.innerWidth > 768) {
      if (that.jamScroll === false) {
        e.preventDefault()
        e.stopPropagation()
        if (that.lethargy.check(e) === 1) {
          that.up()
          that.jam()
        } else if (that.lethargy.check(e) === -1) {
          that.down()
          that.jam()
        }
      }
    }
  }
  scrollEvent() {
    let that = this
    this.content.addEventListener('mousewheel', function(e) { that.lethargyScroll(e) })
    this.content.addEventListener('DOMMouseScroll', function(e) { that.lethargyScroll(e) })
    this.content.addEventListener('wheel', function(e) { that.lethargyScroll(e) })
    this.content.addEventListener('MozMousePixelScroll', function(e) { that.lethargyScroll(e) })
  }

  initScroll() {
    this.scrollEvent()
  }
  init() {
    /**
     * add body class
     * @var this.pageUrl
     * @var this.body
     */

    if (this.pageUrl === 'story.html') {
      this.body.classList.add('body--story')
      this.initScroll()
    } else {
      this.body.classList.remove('body--story')
    }
  }
}

let timeline = new Timeline()
timeline.init()
