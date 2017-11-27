const Lethargy = require('lethargy').Lethargy

class Timeline {
  constructor() {
    this.jamScroll = false
    this.translate = 0
    this.index = 0
    this.lethargy = new Lethargy()
  }
  jam() {
    /**
     * block momentarily the scroll
     * @var this.jamScroll bool for block the scroll
     */

    let that = this
    this.jamScroll = true
    setTimeout(function() {
      that.jamScroll = false
    }, 1200)
  }
  up() {
    /**
     * update the translation of .story when the scroll go up
     * @var this.translate value of the translate
     * @var this.main main content of the page
     * @var this.index index of the current slide
     * @function udpate update active class
     */

    this.translate += 100
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    if (this.index > 0) {
      this.index -= 1
    }
    this.update()
  }
  down() {
    /**
     * update the translation of .story when the scroll go down
     * @var this.translate value of the translate
     * @var this.main main content of the page
     * @var this.index index of the current slide
     * @function udpate update active class
     */

    this.translate -= 100
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    if (this.index < this.allSlide - 1) {
      this.index += 1
    }
    this.update()
  }
  updateNav(attribute) {
    /**
     * add and remove active class for navigation
     * @param attribute current data-slide attribute
     * @var activeItem active slide
     * @var navigationItem active navigation item
     */

    let activeItem = document.querySelector('.timelineNav__item--active')
    if (activeItem != null) {
      activeItem.classList.remove('timelineNav__item--active')
    }

    let navigationItem = document.querySelector('.timelineNav__item--' + attribute)
    navigationItem.classList.add('timelineNav__item--active')
  }
  update() {
    /**
     * update active class for the current slide and udpate the content var for scroll event
     * @var activeItem
     * @var this.content
     * @function updateNav add active class for navigation
     * @function scrollEvent scroll event of the current slide
     */

    let activeItem = document.querySelector('.timeline--active')
    this.content = document.querySelector('.timeline--' + this.index)
    activeItem.classList.remove('timeline--active')
    this.content.classList.add('timeline--active')
    let attribute = this.content.getAttribute('data-date')
    this.updateNav(attribute)
    this.scrollEvent()
  }

  lethargyScroll(e) {
    /**
     * lethargy checking for direction of the scroll
     * @var this.lethargy define the lethragy librairi
     * @function up translation up
     * @function down translation down
     * @function jam block the scroll
     */

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
    /**
     * scroll event on the current content
     * @var this.content current active slide for scroll event
     * @function lethargyScroll lethargy checking for scroll
     */

    let that = this
    this.content.addEventListener('mousewheel', function(e) { that.lethargyScroll(e) })
    this.content.addEventListener('DOMMouseScroll', function(e) { that.lethargyScroll(e) })
    this.content.addEventListener('wheel', function(e) { that.lethargyScroll(e) })
    this.content.addEventListener('MozMousePixelScroll', function(e) { that.lethargyScroll(e) })
  }
  updateSlide(index) {
    /**
     * update slide translation when click on nav
     * @var this.translate value of the translate
     * @var this.main main content of the page
     * @var this.index index of the current slide
     * @function udpate update active class
     */

    this.translate = -100 * index
    this.main.style.transform = 'translateY(' + this.translate + 'vh)'
    this.index = index
    this.update()
  }

  initScroll() {
    /**
     * init the scroll event
     * @function scrollEvent() scroll event on the current content
     */

    this.scrollEvent()
  }
  initNav() {
    /**
     * init the click event on slide navigation
     * @var this.nav all nav item
     * @var size number of nav item
     * @var indexSlide current index of nav item
     * @function updateSlide update slide translation
     */

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
     * @var this.pageUrl link of the current page
     * @var this.body select the body
     */

    this.body.classList.add('body--story')

    this.initScroll()
    this.initNav()
  }
  selects() {
    this.body = document.querySelector('body')
    this.main = document.querySelector('.story')
    this.content = document.querySelector('.timeline--active')
    this.nav = document.querySelectorAll('.timelineNav__item')
    this.allSlide = document.querySelectorAll('.timeline').length
  }
  loading() {
    let that = this
    let watch = setInterval(function() {
      if (document.querySelector('.story') != null) {
        that.selects()
        that.init()
        clearInterval(watch)
      }
    }, 10)
  }
}

function initTimeline() {
  const timeline = new Timeline()
  timeline.loading()
}

export {
  Timeline,
  initTimeline,
}
