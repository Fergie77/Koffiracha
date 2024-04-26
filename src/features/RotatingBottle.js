import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'
import Lottie from 'lottie-web'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Flip)

export const rotatingBottleAnimation = () => {
  const player = document.querySelector('[lottie-element="mobile"]')
  // player.load(
  //   'https://uploads-ssl.webflow.com/6571a5766b38a3291e605413/662a8b3cccc4ab25860810b6_Chilli%20Flame%20Compressed.json'
  // )

  var container = document.querySelector('[lottie-element="mobile"]')

  var jsonPath =
    'https://uploads-ssl.webflow.com/6571a5766b38a3291e605413/662b81560e5a807d218ccfea_Chilli%20Flame%20Compressed%20More.json'
  var animation = Lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: jsonPath,
  })

  // player.addEventListener('ready', () => {
  // const target = document.querySelector('.bottle-destination')
  const origin = document.querySelector('.bottle-origin2')
  console.log(player)
  console.log(animation)
  const state = Flip.getState(player)
  origin.appendChild(player)
  // FLIP!
  const flip = Flip.to(state, {
    duration: 5,

    ease: 'power1.inOut',
  })

  // player.pause()
  //const frameCount = 50
  ScrollTrigger.create({
    trigger: '#trigger-test',
    start: 'top center',
    end: 'bottom bottom',
    endTrigger: '#endTrigger',
    markers: true,
    animation: flip,
    scrub: true,
    // onUpdate: (self) => {
    // let frame = Math.floor(self.progress * frameCount)
    //   player.seek(frame)
    // },
  })
  // })
}
