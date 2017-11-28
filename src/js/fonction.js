const techBtn = document.querySelector('.tech__title')
const tech = document.querySelector('.tech')
const featureBtn = document.querySelector('.feature__title')
const feature = document.querySelector('.feature')

techBtn.addEventListener('click', e => toggleTech(e))
featureBtn.addEventListener('click', e => toggleFeature(e))

function toggleTech(e) {
    if (tech.classList.contains('descrIsOpen')) tech.classList.remove('descrIsOpen')
    else tech.classList.add('descrIsOpen')
}

function toggleFeature(e) {
    if (feature.classList.contains('descrIsOpen')) feature.classList.remove('descrIsOpen')
    else feature.classList.add('descrIsOpen')
}