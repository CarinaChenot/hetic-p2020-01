const menuBtn = document.querySelector('.toggle')
menuBtn.addEventListener('click', e => toggleState(e))

function toggleState(e) {
  if (menuBtn.classList.contains('isOpen')) menuBtn.classList.remove('isOpen')
  else menuBtn.classList.add('isOpen')
}
