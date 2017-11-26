import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const navLink = document.querySelectorAll('[data-link]')
const main = document.querySelector('.content')

navLink.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    getContent(link.getAttribute('data-link'), true)
  })
})

const menu = document.querySelector('.header')

history.listen((location, action) => {
  if (menu.classList.contains('isOpen')) {
    menu.classList.remove('isOpen')
  }
})

getContent(history.location.pathname)

function getContent(filename) {
  if (filename.charAt(0) === '/') filename = filename.substr(1)
  if (filename === '') filename = 'home'

  fetch(filename + '.html').then(response => {
    if (response.ok) {
      if (filename === 'home') filename = ''
      response.text().then(data => {
        history.push('/' + filename)
        main.innerHTML = data
      })
    } else {
      history.push('/404')
      fetch('404.html').then(response => {
        response.text().then(data => {
          main.innerHTML = data
        })
      })
    }
  })
}
