export default class Loader {
  constructor() {
    this.isLoading = true
  }
  init() {
    this.$loader = document.querySelector('.hero__loader')
    this.render()
  }
  loaded() {
    this.isLoading = false
    this.render()
  }
  render() {
    this.isLoading ? this.$loader.classList.add('isLoading') : this.$loader.classList.remove('isLoading')
  }
}
