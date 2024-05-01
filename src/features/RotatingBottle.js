import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'
import Lottie from 'lottie-web'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Flip)

export const rotatingBottleAnimation = (pageContainer) => {
  var container = pageContainer.querySelectorAll('[lottie-element="mobile"]')

  setTimeout(() => {
    container.forEach((element) => {
      const triggerElement = element.closest('.floating-bottle-section_wrapper')
      const endTrigger = triggerElement.querySelector('#endTrigger')
      let animationID =
        element.getAttribute('title')?.toString() || 'chilli-flame' // Default to 'V2' if no title

      var jsonPath = `https://cdn.shopify.com/s/files/1/0551/2983/3536/files/${
        animationID + '-mobile'
      }.json`
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
  }, 5000)

  ScrollTrigger.sort()
  ScrollTrigger.refresh()
}
