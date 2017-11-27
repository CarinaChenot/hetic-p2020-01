import i18next from 'i18next'
import Backend from 'i18next-xhr-backend'
import Cache from 'i18next-localstorage-cache'
import LngDetector from 'i18next-browser-languagedetector'

require('../locales/en/partials.yaml')
require('../locales/en/home.yaml')
require('../locales/en/story.yaml')
require('../locales/fr/partials.yaml')
require('../locales/fr/home.yaml')
require('../locales/fr/story.yaml')

const lngBtn = document.querySelectorAll('[i18n-options]')

lngBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault()
    i18next.changeLanguage(btn.getAttribute('i18n-options'))
  })
})

i18next
  .use(Backend)
  .use(Cache)
  .use(LngDetector)
  .init({
    cache: {
      enabled: true,
    },
    ns: ['partials', 'home', 'story'],
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: true,
  })

i18next.on('languageChanged', () => {
  updateContent(getNodes())
})

function updateContent(nodes) {
  nodes.forEach(node => {
    node.innerText = i18next.t(node.getAttribute('data-i18n'))
  })
}

function getNodes() {
  return document.querySelectorAll('[data-i18n]')
}

export function initTranslation() {
  updateContent(getNodes())
}
