class Features {
  init() {
    this.$techBtn = document.querySelector('.tech__title')
    this.$tech = document.querySelector('.tech')
    this.$featureBtn = document.querySelector('.feature__title')
    this.$feature = document.querySelector('.feature')

    this.$techBtn.addEventListener('click', e => this.toggleTech(e))
    this.$featureBtn.addEventListener('click', e => this.toggleFeature(e))
  }
  toggleTech(e) {
    if (this.$tech.classList.contains('descrIsOpen')) this.$tech.classList.remove('descrIsOpen')
    else this.$tech.classList.add('descrIsOpen')
  }

  toggleFeature(e) {
    if (this.$feature.classList.contains('descrIsOpen')) this.$feature.classList.remove('descrIsOpen')
    else this.$feature.classList.add('descrIsOpen')
  }
}

export function initFeatures() {
  const features = new Features()
  features.init()
}
