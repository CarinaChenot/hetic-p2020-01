class AnimToggle {
  init() {
    this.$images = document.querySelectorAll('.page')
    this.$leg = document.querySelectorAll('.leg')

    this.$images[0].addEventListener('mouseover', e => this.toggleImage(e, 0))
    this.$images[1].addEventListener('mouseover', e => this.toggleImage(e, 1))
    this.$images[2].addEventListener('mouseover', e => this.toggleImage(e, 2))
  }
  toggleImage(e, i) {
    if (!this.$images[i].classList.contains('imageIsHover')) {
      var n = 0
      while (n < 3) {
        if (n !== i) {
          this.$images[n].classList.remove('imageIsHover')
          this.$leg[n].classList.remove('descrIsOpen')
        }
        n++
      }

      this.$images[i].classList.add('imageIsHover')
      this.$leg[i].classList.add('descrIsOpen')
    }
  }
}

export function initAnimToggle() {
  const animToggle = new AnimToggle()
  animToggle.init()
}
