const menuBtn = document.querySelector('.toggle')
const header = document.querySelector('.header')

menuBtn.addEventListener('click', e => toggleState(e))

function toggleState(e) {
  if (header.classList.contains('isOpen')) header.classList.remove('isOpen')
  else header.classList.add('isOpen')
}
