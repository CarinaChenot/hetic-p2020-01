export default class Menu {
  constructor() {
    this.$button = document.querySelector('.toggle')
    this.$header = document.querySelector('.header')
    this.isOpen = this.$header.classList.contains('isOpen')
    this.$button.addEventListener('click', this.toggleState.bind(this))
  }
  setIsOpen(isOpen) {
    this.isOpen = isOpen
    this.updateDOM()
  }
  toggleState() {
    this.isOpen = !this.isOpen
    this.updateDOM()
  }
  updateDOM() {
    this.isOpen ? this.$header.classList.add('isOpen') : this.$header.classList.remove('isOpen')
  }
}
