const images = document.querySelectorAll('.page')
const leg = document.querySelectorAll('.leg')

function toggleImage(e, i) {

  if (!images[i].classList.contains('imageIsHover')) {
    var n = 0
    while (n < 3) {
      if (n !== i) {
        images[n].classList.remove('imageIsHover')
        leg[n].classList.remove('descrIsOpen')
      }
      n++
    }

    images[i].classList.add('imageIsHover')
    leg[i].classList.add('descrIsOpen')
  }
}

images[0].addEventListener('mouseover', e => toggleImage(e, 0));
images[1].addEventListener('mouseover', e => toggleImage(e, 1));
images[2].addEventListener('mouseover', e => toggleImage(e, 2));

images[0].addEventListener('click', e => toggleImage(e, 0));
images[1].addEventListener('click', e => toggleImage(e, 1));
images[2].addEventListener('click', e => toggleImage(e, 2));