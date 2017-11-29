import 'intersection-observer'

IntersectionObserver.prototype.POLL_INTERVAL = 100

function onIntersect(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('scrolled')

    if (entry.target.duration !== undefined) {
      if (entry.isIntersecting) entry.target.play()
      else if (!entry.isIntersecting) entry.target.pause()
    }
  })
}

const options = {
  rootMargin: '-200px', // To fire the event little bit after screen enters
}

const observer = new window.IntersectionObserver(onIntersect, options)

export function initScrollAnim() {
  ;[...document.querySelectorAll('.to-animate')].forEach(element => observer.observe(element))
}
