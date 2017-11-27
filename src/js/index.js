import { Navigation } from './navigation'
import Menu from './menu'
import './scroll_anim'
import './translation'
import './3dHelmet'
// import './timeline'

const nav = new Navigation()
const menu = new Menu()

nav.history.listen(() => {
  if (menu.isOpen) menu.setIsOpen(false)
})
