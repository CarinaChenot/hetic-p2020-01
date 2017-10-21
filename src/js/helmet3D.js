import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setClearColor(0x000000, 0)

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10)

const material = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe: true })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 1000

function render() {
  requestAnimationFrame(render)
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
render()

let mouse = {}

document.addEventListener('mousedown', handleMouseDown, false)
document.addEventListener('mouseup', handleMouseUp, false)

function handleMouseDown(e) {
  mouse.initialClientX = e.clientX
  document.addEventListener('mousemove', handleMouseMove, false)
}

// TODO: setup by mouse velocity check https://codepen.io/mfriesenhahn/pen/bwkmWj
function handleMouseMove(e) {
  let mouseTravel = getMouseTravel(mouse.initialClientX, e.clientX)

  cube.rotation.y += mouseTravel / 500
  mouse.initialClientX = e.clientX
}

function handleMouseUp(e) {
  document.removeEventListener('mousemove', handleMouseMove)
}

function getMouseTravel(initial, current) {
  return current - initial
}
