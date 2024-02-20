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
  sliderLoadAnimation,
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
} from './features/Animations'
import {
  hugeTextScaling,
  openChat,
  recipeFilters,
  shareRecipe,
} from './features/Functionality'
import {
  disableFooterColourSwap,
  footerColourSwap,
  navSwapping,
  setNavColourManual,
} from './features/NavbarSwapping'
import lenis from './lenisInstance'

barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains('no-barba'),
})

pageTransition()
navAnimation()

openCart()
loadCart()

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
      sliderLoadAnimation()
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
      scrollingText()
      accordionToggle()
      setTimeout(() => {
        recipeCardAnimation()
      }, 1000)
      recipeSlider()
      pourLottieAnimations()
    } else if (data.next.namespace == 'recipes') {
      scrollingText()
      accordionToggle()
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

// Use lenis as needed
lenis.on('scroll', () => {
  // Your code here
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
