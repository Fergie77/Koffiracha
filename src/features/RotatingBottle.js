import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'
import Lottie from 'lottie-web'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Flip)

export const rotatingBottleAnimation = (pageContainer) => {
  var container = pageContainer.querySelectorAll('[lottie-element="mobile"]')

  container.forEach((element) => {
    const triggerElement = element.closest('.floating-bottle-section_wrapper')
    const endTrigger = triggerElement.querySelector('#endTrigger')
    var jsonPath =
      'https://uploads-ssl.webflow.com/6571a5766b38a3291e605413/662a8b3cccc4ab25860810b6_Chilli%20Flame%20Compressed.json'
    var animation = Lottie.loadAnimation({
      container: element,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      path: jsonPath,
    })

    const origin = triggerElement.querySelector('.bottle-origin2')
    const state = Flip.getState(element)
    origin.appendChild(element)
    // FLIP!
    const flip = Flip.to(state, {
      duration: 5,
      absolute: true,
      ease: 'power1.inOut',
    })

    const frameCount = 50
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top 20%',
      end: 'bottom bottom',
      endTrigger: endTrigger,
      markers: true,
      animation: flip,
      scrub: true,
      onUpdate: (self) => {
        let frame = Math.floor(self.progress * frameCount)
        animation.goToAndStop(frame, true)
      },
    })
  })

  ScrollTrigger.sort()
  ScrollTrigger.refresh()
}
