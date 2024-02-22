import barba from '@barba/core'

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
  testimonialSliderLoadAnimation,
  recipeCardAnimation,
  filtersDropdownAnimation,
  instagramSlider,
  pourPourPour,
  //homepageHeroTextAnimation,
  mobileProductSlider,
  //featuredProductAddToCart,
  pourLottieAnimations,
  hugeTextSplitAnimation,
  recipeSlider,
  recipeModal,
  recipeAccordionToggle,
} from './features/Animations'
import {
  hugeTextScaling,
  openChat,
  recipeFilters,
  setCheckout,
  shareRecipe,
} from './features/Functionality'
import {
  checkIfRedProduct,
  disableFooterColourSwap,
  footerColourSwap,
  navSwapping,
  setNavColourManual,
} from './features/NavbarSwapping'
import { createLenis } from './lenisInstance.js'

barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains('no-barba'),
})

pageTransition()
navAnimation()

openCart()
loadCart()
setCheckout()
barba.hooks.afterEnter((data) => {
  setTimeout(() => {
    openChat()
    siteWideCartButtons()
    buttonAnimation()
    //featuredProductAddToCart()
    navSwapping()
    disableFooterColourSwap()
    footerColourSwap()
    setNavColourManual('yellow')
    hugeTextScaling()
    if (data.next.namespace == 'home') {
      pourLottieAnimations()
      testimonialSliderLoadAnimation()
      floatingBottle()
      roundingImageElement()
      storySliderSlideIn()
      instagramSlider()
      pourPourPour()
      scrollingText()
      hugeTextSplitAnimation()
    } else if (data.next.namespace == 'shop') {
      productLinkHover()
      mobileProductSlider()
      filtersDropdownAnimation()

      pourLottieAnimations()
      roundingImageElement()
    } else if (data.next.namespace == 'product') {
      checkIfRedProduct()
      scrollingText()
      accordionToggle()
      setTimeout(() => {
        recipeCardAnimation()
      }, 1000)
      recipeSlider()
      pourLottieAnimations()
    } else if (data.next.namespace == 'recipes') {
      scrollingText()
      recipeAccordionToggle()
      recipeCardAnimation()
      instagramSlider()
      shareRecipe()
      recipeModal()
      filtersDropdownAnimation()
      recipeFilters()
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

// Initialize Lenis conditionally
const lenis = createLenis()

if (lenis !== null) {
  lenis.on('scroll', () => {
    // Your code here
  })

  // Define and immediately use the `raf` function within the conditional block
  ;(function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  })(0) // Immediately invoke with an initial `time` value, such as 0
} else {
  // Handle case where Lenis is not initialized (optional)
  console.log('Lenis is not initialized due to viewport width.')
}
