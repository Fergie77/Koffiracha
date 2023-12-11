import Lenis from '@studio-freight/lenis'

import {
  buttonAnimation,
  floatingBottle,
  roundingImageElement,
  storySliderSlideIn,
} from './features/Animations'

buttonAnimation()
roundingImageElement()
floatingBottle()
storySliderSlideIn()

const lenis = new Lenis()

lenis.on('scroll', () => {})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
