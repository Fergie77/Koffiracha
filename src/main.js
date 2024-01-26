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
  productLinkHover,
  accordionToggle,
  loadCart,
  openCart,
  siteWideCartButtons,
  sliderLoadAnimation,
  recipeCardAnimation,
  filtersDropdownAnimation,
  instagramSlider,
  pourPourPour,
  homepageHeroTextAnimation,
  mobileProductSlider,
  featuredProductAddToCart,
} from './features/Animations'
import { navSwapping } from './features/NavbarSwapping'

barba.init({})

pageTransition()
navAnimation()

navSwapping()
buttonAnimation()
openCart()
loadCart()

barba.hooks.afterEnter((data) => {
  setTimeout(() => {
    siteWideCartButtons()
    featuredProductAddToCart()

    if (data.next.namespace == 'home') {
      sliderLoadAnimation()
      floatingBottle()
      roundingImageElement()
      storySliderSlideIn()
      instagramSlider()
      pourPourPour()
      scrollingText()
      homepageHeroTextAnimation()
    } else if (data.next.namespace == 'shop') {
      productLinkHover()
      mobileProductSlider()
      filtersDropdownAnimation()
      instagramSlider()
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
      instagramSlider()
    }
  }, 10)

  scaleUpAnimation()
})

barba.hooks.enter(() => {
  window.fsAttributes = window.fsAttributes || []
  window.fsAttributes.push([
    'cmsfilter',
    () => {
      window.fsAttributes.cmsfilter.init()
    },
  ])
  window.fsAttributes.push([
    'cmsselect',
    () => {
      window.fsAttributes.cmsselect.init()
    },
  ])
  window.fsAttributes.push([
    'selectcustom',
    () => {
      window.fsAttributes.selectcustom.init()
    },
  ])
})

const lenis = new Lenis({ lerp: 0.2 })

lenis.on('scroll', () => {})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
