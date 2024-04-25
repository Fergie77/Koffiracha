import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Flip)

export const rotatingBottleAnimation = () => {
  const player = document.querySelector('[lottie-element="mobile"]')
  console.log(player)
  player.load(
    'https://uploads-ssl.webflow.com/6571a5766b38a3291e605413/662a29a72e8bf4f328bdde18_Chilli%20Fire.json'
  )

  player.addEventListener('ready', () => {
    // const target = document.querySelector('.bottle-destination')
    const origin = document.querySelector('.bottle-origin')
    console.log(player)

    const state = Flip.getState(player)
    origin.appendChild(player)
    // FLIP!
    const flip = Flip.to(state, {
      duration: 5,

      ease: 'power1.inOut',
    })

    player.pause()
    const frameCount = 50
    ScrollTrigger.create({
      trigger: '#trigger-test',
      start: 'top center',
      end: 'bottom bottom',
      endTrigger: '#endTrigger',
      markers: true,
      animation: flip,
      scrub: true,
      onUpdate: (self) => {
        let frame = Math.floor(self.progress * frameCount)
        player.seek(frame)
      },
    })
  })
}
