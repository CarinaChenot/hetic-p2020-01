import './scss/main.scss'

import './js/menu.js'
import './js/scroll_anim.js'

import './js/3dHelmet'

const homeLink = document.querySelector('.header__wrapper')
const storyLink = document.querySelector('.story-link')

const main = document.querySelector('.content')

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed')
  updateLocation()
})

window.onpopstate = function() {
  updateLocation()
}

homeLink.addEventListener('click', e => {
  e.preventDefault()
  changeContent('home', true)
})

storyLink.addEventListener('click', e => {
  e.preventDefault()
  changeContent('story', true)
})

function updateLocation() {
  switch (window.location.hash) {
    case '#/':
      changeContent('home')
      break
    case '#/story':
      changeContent('story')
      break
  }
}

function changeContent(filename, redirect = false) {
  fetch(filename + '.html')
    .then((res) => {
      return res.text()
    })
    .then((data) => {
      if (redirect) {
        if (filename === 'home') filename = ''
        window.history.pushState('Home', 'Home', '#/' + filename)
      }

      main.innerHTML = data
    })
}

updateLocation()
