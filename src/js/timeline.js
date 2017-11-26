const Lethargy = require('lethargy').Lethargy

class Timeline {
  constructor() {
    this.body = document.querySelector('body')
    this.main = document.querySelector('.story')
    this.content = document.querySelector('.timeline--active')
    this.nav = document.querySelectorAll('.timelineNav__item')
    this.allSlide = document.querySelectorAll('.timeline').length
    this.url = document.location.href
    this.pageUrl = this.url.substring(this.url.lastIndexOf('/') + 1)
    this.jamScroll = false
    this.translate = 0
    this.index = 0
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
    }, 1200)
  }
  up() {
    this.translate += 100
    console.log(this.translate)
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    if (this.index > 0) {
      this.index -= 1
    }
    this.update()
  }
  down() {
    this.translate -= 100
    console.log(this.translate)
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    if (this.index < this.allSlide - 1) {
      this.index += 1
    }
    this.update()
  }
  updateNav(attribute) {
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
    let attribute = this.content.getAttribute('data-date')
    this.updateNav(attribute)
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
  updateSlide(index) {
    this.translate = -100 * index
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    this.index = index
    this.update()
  }

  initScroll() {
    this.scrollEvent()
  }
  initNav() {
    let size = this.nav.length
    let that = this

    for (let i = 0; i < size; i++) {
      that.nav[i].addEventListener('click', function(e) {
        e.preventDefault()
        let indexSlide = that.nav[i].getAttribute('data-slide')
        that.updateSlide(parseInt(indexSlide))
      })
    }
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
      this.initNav()
    } else {
      this.body.classList.remove('body--story')
    }
  }
}

let timeline = new Timeline()
timeline.init()
