import barba from '@barba/core'

import { storySliderSlideIn } from './elements/storySlider'
import {
  buttonAnimation,
  floatingBottle,
  navAnimation,
  pageTransition,
  roundingImageElement,
  scaleUpAnimation,
  //storySliderSlideIn,
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
  cookieLinkSetter,
  //cookieClassSwap,
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
    //cookieClassSwap()
    cookieLinkSetter()
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
      // setTimeout(() => {
      floatingBottle()
      // }, 500)
      roundingImageElement()
      instagramSlider()
      pourPourPour()
      scrollingText()
      hugeTextSplitAnimation()
      storySliderSlideIn(
        document.querySelector('[story-slider = "arrow"]'),
        document.querySelector('[story-slider = "close"]'),
        document.querySelector('[story-slider = "slider"]'),
        document.querySelector('[story-slider = "background"]'),
        document.querySelector('[story-slider = "text"]')
      )
      storySliderSlideIn(
        document.querySelector('[testimonial-slider = "arrow"]'),
        document.querySelector('[testimonial-slider = "close"]'),
        document.querySelector('[testimonial-slider = "slider"]'),
        null,
        document.querySelector('[testimonial-slider = "text"]')
      )
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
      recipeModal()
    } else if (data.next.namespace == 'recipes') {
      scrollingText()
      recipeAccordionToggle()
      recipeCardAnimation()
      instagramSlider()
      shareRecipe()
      recipeModal()
      filtersDropdownAnimation()
      recipeFilters()
      pourLottieAnimations()
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
