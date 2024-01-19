import barba from '@barba/core'
import Lenis from '@studio-freight/lenis'

import {
  buttonAnimation,
  floatingBottle,
  navAnimation,
  pageTransition,
  roundingImageElement,
  scaleUpAnimation,
  storySliderSlideIn,
  scrollingText,
  igSlider,
  productLinkHover,
  accordionToggle,
  cartAnimation,
  loadCart,
  openCart,
  siteWideCartButtons,
  sliderLoadAnimation,
  recipeCardAnimation,
} from './features/Animations'
import { navSwapping } from './features/NavbarSwapping'

barba.init({})

pageTransition()
navAnimation()
cartAnimation()
navSwapping()
buttonAnimation()
openCart()
loadCart()

barba.hooks.afterEnter((data) => {
  setTimeout(() => {
    siteWideCartButtons()
    //loadCart()
    if (data.next.namespace == 'home') {
      sliderLoadAnimation()
      floatingBottle()
      roundingImageElement()
      storySliderSlideIn()
      setTimeout(() => {
        igSlider()
      }, 1000)
      scrollingText()
    } else if (data.next.namespace == 'shop') {
      productLinkHover()
      igSlider()
    } else if (data.next.namespace == 'product') {
      scrollingText()
      accordionToggle()
      setTimeout(() => {
        recipeCardAnimation()
      }, 3000)
    } else if (data.next.namespace == 'recipes') {
      scrollingText()
      accordionToggle()
      recipeCardAnimation()
    }
  }, 10)

  scaleUpAnimation()
})

const lenis = new Lenis()

lenis.on('scroll', () => {})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
