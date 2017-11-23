const Lethargy = require('lethargy').Lethargy

class Timeline {
  constructor() {
    this.body = document.querySelector('body')
    this.url = document.location.href
    this.pageUrl = this.url.substring(this.url.lastIndexOf('/') + 1)
    this.jamScroll = false;
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
    let that = this;
    this.jamScroll = true
    setTimeout(function(){
      that.jamScroll = false
    }, 1200)
  }
  up() {
    console.log('en haut')
  }
  down() {
    console.log('en bas')
  }
  scrollToHome() {
    let that = this
    let contentHome = document.querySelector('.timeline')
    let lethargy = new Lethargy()
    var scroll = function scroll(e) {
      if (that.jamScroll === false) {
        e.preventDefault()
        e.stopPropagation()
        if (lethargy.check(e) === 1) {
          that.up()
          that.jam();
        }
        else if (lethargy.check(e) === -1) {
          that.down()
          that.jam();
        }
      }
    }
    contentHome.addEventListener('mousewheel', scroll)
    contentHome.addEventListener('DOMMouseScroll', scroll)
    contentHome.addEventListener('wheel', scroll)
    contentHome.addEventListener('MozMousePixelScroll', scroll)
  }
  initScroll() {
    this.scrollToHome()
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
