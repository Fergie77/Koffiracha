import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { storySliderSlideIn } from './elements/storySlider'
import {
  buttonAnimation,
  floatingBottle,
  navAnimation,
  pageTransition,
  roundingImageElement,
  scaleUpAnimation,
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
  mobileProductSlider,
  pourLottieAnimations,
  recipeSlider,
  recipeModal,
  recipeAccordionToggle,
} from './features/Animations'
import { announcementAnimation } from './features/AnnouncementScroller'
import {
  chatButton2,
  cookieLinkSetter,
  openChat,
  recipeFilters,
  setCheckout,
  shareRecipe,
  hideProduct,
  hideProductShopPage,
  copyrightYear,
} from './features/Functionality'
import {
  checkIfRedProduct,
  disableFooterColourSwap,
  footerColourSwap,
  navSwapping,
  setNavColourManual,
} from './features/NavbarSwapping'
import { rotatingBottleAnimation } from './features/RotatingBottle'

gsap.registerPlugin(ScrollTrigger)

barba.init({
  prevent: ({ el }) => el.classList && el.classList.contains('no-barba'),
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        //window.scrollTo(0, 0)
      },
      afterEnter() {},
    },
  ],
})

pageTransition()
navAnimation()
openCart()

loadCart()
setCheckout()

barba.hooks.afterEnter(() => {
  ScrollTrigger.killAll()
})

window.addEventListener('beforeunload', function () {
  // window.scrollTo(0, 0)
})

barba.hooks.afterEnter((data) => {
  setTimeout(() => {
    cookieLinkSetter()
    openChat()
    setTimeout(() => {
      chatButton2()
    }, 1000)
    navSwapping()
    copyrightYear()
    siteWideCartButtons()
    buttonAnimation()

    disableFooterColourSwap()

    setNavColourManual('yellow')

    if (data.next.namespace == 'home') {
      setTimeout(() => {
        pourLottieAnimations(data.next.container)
        rotatingBottleAnimation(data.next.container)
        hideProduct(data.next.container)
      }, 2000)
      announcementAnimation()
      testimonialSliderLoadAnimation()
      if (window.matchMedia('(min-width: 767px)').matches) {
        floatingBottle()
      }
      roundingImageElement() // is you
      footerColourSwap(data.next.container) // is you
      instagramSlider()
      pourPourPour()
      scrollingText()
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
      hideProductShopPage(data.next.container)
      productLinkHover()
      mobileProductSlider()
      filtersDropdownAnimation()
      pourLottieAnimations(data.next.container)
      roundingImageElement()
      footerColourSwap(data.next.container) // is you
    } else if (data.next.namespace == 'product') {
      checkIfRedProduct()
      scrollingText()
      accordionToggle()
      setTimeout(() => {
        recipeCardAnimation()
      }, 1000)
      recipeSlider()
      footerColourSwap(data.next.container) // is you
      pourLottieAnimations(data.next.container)
      recipeModal()
      shareRecipe()
      setTimeout(() => {
        window.okeWidgetApi.initAllWidgets()
      }, 500)
      footerColourSwap(data.next.container) // is you
    } else if (data.next.namespace == 'recipes') {
      scrollingText()
      recipeAccordionToggle()
      recipeCardAnimation()
      instagramSlider()
      shareRecipe()
      recipeModal()
      filtersDropdownAnimation()
      recipeFilters()
      pourLottieAnimations(data.next.container)
      footerColourSwap(data.next.container) // is you
    } else if (data.next.namespace == 'media-kit') {
      recipeAccordionToggle()
      pourLottieAnimations(data.next.container)
      footerColourSwap(data.next.container) // is you
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
