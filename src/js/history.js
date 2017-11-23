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

function getContent(filename, redirect = false) {
  if (filename.charAt(0) === '/') filename = filename.substr(1)
  if (filename === '') filename = 'home'

  fetch(filename + '.html')
    .then((res) => {
      return res.text()
    })
    .then((data) => {
      if (redirect) {
        if (filename === 'home') filename = ''
        history.push('/' + filename, { some: 'state' })
      }
      main.innerHTML = data
    })
}

getContent(history.location.pathname)
