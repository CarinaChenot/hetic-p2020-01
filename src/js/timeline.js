class Timeline {
  constructor() {
    this.body = document.querySelector('body')
    this.url = document.location.href
    this.pageUrl = this.url.substring(this.url.lastIndexOf('/') + 1)
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
  init() {
    /**
     * init Timeline class
     * @function addClass
     */

    this.addClass()
  }
}

let timeline = new Timeline()
timeline.init()
