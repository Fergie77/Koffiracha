import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'
import KeenSlider from 'keen-slider'
import Lottie from 'lottie-web'
import SplitType from 'split-type'

export const buttonAnimation = () => {
  const button = document.querySelectorAll("[gsap-button='true']")
  const smallbutton = document.querySelectorAll("[gsap-button-2='true']")

  button.forEach((element) => {
    if (element.querySelector('.hover-effect-background')) {
      element.addEventListener('mouseenter', () => {
        gsap.to(element.querySelector('.hover-effect-background'), {
          y: 150,
          ease: 'power4.out',
          duration: 1.5,
        })
        gsap.to(element.querySelector('.button-text_mover'), {
          y: -40,
          ease: 'power4.out',
          duration: 1,
        })
      })
      element.addEventListener('mouseleave', () => {
        gsap.to(element.querySelector('.hover-effect-background'), {
          y: -50,
          ease: 'power4.out',
          duration: 1.5,
        })
        gsap.to(element.querySelector('.button-text_mover'), {
          y: 0,
          ease: 'power4.out',
          duration: 1,
        })
      })
    }
  })
  smallbutton.forEach((element) => {
    if (element.querySelector('.hover-effect-background')) {
      element.addEventListener('mouseenter', () => {
        gsap.to(element.querySelector('.hover-effect-background'), {
          y: 150,
          ease: 'power4.out',
          duration: 1.5,
        })
        gsap.to('.hamburger-line', {
          background: '#f0fe53',
          ease: 'power4.out',
          duration: 1.5,
        })
        gsap.to(element.querySelector('.button-text_mover'), {
          y: -40,
          ease: 'power4.out',
          duration: 1,
        })
      })
      element.addEventListener('mouseleave', () => {
        gsap.to(element.querySelector('.hover-effect-background'), {
          y: -20,
          ease: 'power4.out',
          duration: 1.5,
        })
        gsap.to('.hamburger-line', {
          background: 'black',
          ease: 'power4.out',
          duration: 1.5,
        })
        gsap.to(element.querySelector('.button-text_mover'), {
          y: 0,
          ease: 'power4.out',
          duration: 1,
        })
      })
    }
  })
}

export const scaleUpAnimation = () => {
  const elements = document.querySelectorAll("[gsap='scale-up']")
  elements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, { scale: 1.15, duration: 0.2, ease: 'power2.out' })
    })
    element.addEventListener('mouseleave', () => {
      gsap.to(element, { scale: 1, duration: 0.2, ease: 'power2.out' })
    })
  })
}

export const roundingImageElement = () => {
  const roundingElement = document.querySelector(
    '.rounding_background-image-wrapper'
  )

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: roundingElement,
      start: 'top 75%',
      end: 'bottom center',
      scrub: 2,
      onEnter: () => {
        pourPourPour().playAnimation()
      },
    },
  })

  tl.to(roundingElement, {
    borderRadius: 20,
  })
  tl.to(
    roundingElement.parentNode,
    {
      scale: 0.9,
    },
    '<'
  )
  tl.to(
    roundingElement.querySelector('.header30_background-image'),
    {
      scale: 1.15,
    },
    '<'
  )
}

export const floatingBottle = () => {
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal
    if (typeof attrVal !== 'string' || attrVal.trim() === '') return defaultVal
    if (attrVal === 'true' && defaultValType === 'boolean') return true
    if (attrVal === 'false' && defaultValType === 'boolean') return false
    if (isNaN(attrVal) && defaultValType === 'string') return attrVal
    if (!isNaN(attrVal) && defaultValType === 'number') return +attrVal
    return defaultVal
  }
  gsap.registerPlugin(Flip)
  ScrollTrigger.normalizeScroll(true)

  function createTimeline(componentEl, componentIndex) {
    let originEl = componentEl.querySelectorAll(
        "[tr-scrollflip-element='origin']"
      ),
      targetEl = componentEl.querySelectorAll(
        "[tr-scrollflip-element='target']"
      ),
      scrubStartEl = componentEl.querySelector('[tr-scrollflip-scrubstart]'),
      scrubEndEl = componentEl.querySelector('[tr-scrollflip-scrubend]')

    let startSetting = attr(
        'top top',
        scrubStartEl.getAttribute('tr-scrollflip-scrubstart')
      ),
      endSetting = attr(
        'bottom bottom',
        scrubEndEl.getAttribute('tr-scrollflip-scrubend')
      ),
      staggerSpeedSetting = attr(
        0,
        componentEl.getAttribute('tr-scrollflip-staggerspeed')
      ),
      staggerDirectionSetting = attr(
        'start',
        componentEl.getAttribute('tr-scrollflip-staggerdirection')
      ),
      scaleSetting = attr(
        false,
        componentEl.getAttribute('tr-scrollflip-scale')
      ),
      breakpointSetting = attr(
        0,
        componentEl.getAttribute('tr-scrollflip-breakpoint')
      )

    originEl.forEach(function (el, index) {
      let flipId = `${componentIndex}-${index}`
      el.setAttribute('data-flip-id', flipId)
      targetEl[index].setAttribute('data-flip-id', flipId)
    })

    gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, function () {
      const state = Flip.getState(originEl)
      let timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrubStartEl,
          endTrigger: scrubEndEl,
          start: startSetting,
          end: endSetting,
          scrub: 1,
        },
      })

      timeline.add(
        Flip.from(state, {
          targets: targetEl,
          scale: scaleSetting,
          stagger: {
            amount: staggerSpeedSetting,
            from: staggerDirectionSetting,
          },
        })
      )
    })

    const canvas = document.getElementById('hero-lightpass')

    const context = canvas.getContext('2d')

    const frameCount = 300
    const currentFrame = (index) =>
      `https://raw.githubusercontent.com/Fergie77/Koffiracha/main/Logo%20Animation/V2/0_${index
        .toString()
        .padStart(4, '0')}.webp`

    // Set canvas dimensions
    canvas.width = 900
    canvas.height = 1050

    const images = []

    //this figures out which index to give to the currentFrame, based on the index from frameCount
    function mapToRange(num) {
      // Calculate the percentage of num in the range 0-100
      const percentage = num / 100

      // Map the percentage to the range 0-51
      const result = percentage * 100

      // Round the result to the nearest integer
      return Math.round(result)
    }

    const preloadImages = () => {
      for (let i = 1; i < frameCount; i++) {
        const img = new Image()
        img.src = currentFrame(i)
        images.push(img)
      }
      setTimeout(() => {
        updateImage(0)
      }, 500)
    }

    const updateImage = (index) => {
      context.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
      const img = images[index]

      // Calculate the center position based on canvas dimensions
      const centerX = (canvas.width - img.width) / 2
      const centerY = (canvas.height - img.height) / 2

      context.drawImage(img, centerX, centerY)
    }

    preloadImages()

    gsap.to(canvas, {
      scrollTrigger: {
        trigger: scrubStartEl,
        endTrigger: scrubEndEl,
        start: startSetting,
        end: endSetting,
        scrub: 2,
      },
      frame: 0,
      duration: 1,
      ease: 'none',
      onUpdate: function () {
        const roundedIndex = Math.round(this.progress() * 300)
        const mappedIndex = mapToRange(roundedIndex)
        if (mappedIndex <= 0) {
          updateImage(0)
        } else if (mappedIndex >= 298) {
          updateImage(298)
        } else {
          updateImage(mappedIndex)
        }
      },
    })
  }

  document
    .querySelectorAll("[tr-scrollflip-element='component']")
    .forEach(function (componentEl, index) {
      createTimeline(componentEl, index)

      let resizeTimer
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          createTimeline(componentEl, index)
        }, 250)
      })
    })
}

export const storySliderSlideIn = () => {
  const arrow = document.querySelector('[story-slider = "arrow"]')
  const slider = document.querySelector('[story-slider = "slider"]')
  const background = document.querySelector('[story-slider = "background"]')
  const easing = 'expo.inOut'
  const duration = 2
  let firstClick = false
  const easeInOutExpo = (t) => {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? 0.5 * Math.pow(2, 20 * t - 10)
      : 1 - 0.5 * Math.pow(2, -20 * t + 10)
  }

  const slideIn = () => {
    gsap.to(slider, {
      x: 0,
      ease: easing,
      duration: duration,
      onStart: removeListeners,
    })
    gsap.to(background, {
      x: '-50%',
      ease: easing,
      duration: duration,
    })
  }
  const slideOut = () => {
    gsap.to(slider, {
      x: '60%',
      ease: easing,
      duration: duration,
    })
    gsap.to(background, {
      x: '0%',
      ease: easing,
      duration: duration,
    })
  }
  const slideInSlightly = () => {
    gsap.to(slider, { x: '57%', ease: 'power2.out', duration: 0.5 })
  }
  const slideOutSlightly = () => {
    gsap.to(slider, { x: '60%', ease: 'power2.out', duration: 0.5 })
  }
  const removeListeners = () => {
    arrow.removeEventListener('click', slideIn)
    arrow.removeEventListener('mouseenter', slideInSlightly)
    arrow.removeEventListener('mouseleave', slideOutSlightly)
  }
  arrow.addEventListener('click', slideIn)
  arrow.addEventListener('mouseenter', slideInSlightly)
  arrow.addEventListener('mouseleave', slideOutSlightly)

  const addKeenSlider = () => {
    const ArrowButton = () => {
      arrow.addEventListener('click', () => {
        if (firstClick) {
          slider.next()
        }
        firstClick = true
      })
    }

    const revertSlider = () => {
      document.addEventListener('click', function (event) {
        // Check if the click target is not the specific element or its descendants

        if (
          event.target !== arrow &&
          !arrow.contains(event.target) &&
          event.target !== slider.container &&
          !slider.container.contains(event.target)
        ) {
          // This code will run when you click anything other than the specific element
          slideOut()
          firstClick = false
          arrow.addEventListener('click', slideIn)
          arrow.addEventListener('mouseenter', slideInSlightly)
          arrow.addEventListener('mouseleave', slideOutSlightly)
          slider.moveToIdx(0, false, { duration: 2000, easing: easeInOutExpo })
        }
      })
    }

    var slider = new KeenSlider(
      '.story-slider_wrapper',
      {
        loop: false,
        rubberband: false,
        slides: {
          perView: 4,
          spacing: 20,
        },
      },
      [ArrowButton, revertSlider]
    )
    slider
  }
  addKeenSlider()
}

export const pageTransition = () => {
  let container = document.querySelector('.page-transition')
  const hamburger = document.querySelector('#close-nav')

  let lottieAnim = Lottie.loadAnimation({
    container: container,
    renderer: 'canvas',
    loop: false,
    autoplay: false,
    path: 'https://uploads-ssl.webflow.com/6571a5766b38a3291e605413/657b1db7e1bbc3dc8b91e5eb_KOFF%20PAGE%20LOADER%203.json',
  })

  barba.preventRunning = true

  barba.hooks.enter((data) => {
    gsap.fromTo(
      data.current.container.children,
      {
        opacity: 1,
      },
      {
        opacity: 1,
        duration: lottieAnim.timeCompleted / 80,
        onStart: () => {
          lottieAnim.goToAndPlay(0, true)
          var event = new Event('click')
          hamburger.dispatchEvent(event)
        },
      }
    )

    data.next.container.classList.add('fixed')

    return gsap.from(data.next.container, {
      delay: 0.5,
      opacity: 0,
      duration: lottieAnim.timeCompleted / 60 / 3,
      ease: 'expo.inOut',
      onComplete: () => {
        window.scrollTo(0, 0)
        data.next.container.classList.remove('fixed')
      },
    })
  })

  const resizePageTransition = () => {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const originalWidth = 1920
    const originalHeight = 1080

    // Calculate the scale factor
    let scaleFactor = Math.max(
      originalWidth / viewportWidth,
      originalHeight / viewportHeight
    )

    if (container) {
      container.style.transform = `scale(${scaleFactor})`
    }
  }
  resizePageTransition()
}

export const scrollingText = () => {
  const scrollingTextWrapper = document.querySelectorAll(
    "[gsap-scrolling-text='true']"
  )

  scrollingTextWrapper.forEach((element) => {
    const tl = gsap.timeline()

    tl.to(element, {
      xPercent: -184,
      duration: 30,
      ease: 'linear',
    })

    tl.repeat(-1)
  })
}

export const igSlider = () => {
  const sliderEl = document.querySelector("[keen-slider='true']")
  var animation = { duration: 15000, easing: (t) => t }
  var slider = new KeenSlider(sliderEl, {
    loop: true,
    renderMode: 'performance',
    slides: {
      perView: 4,
      //origin: 'center',
      spacing: 40,
    },
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })
  slider
}

export const productLinkHover = () => {
  // Select all product links
  const productLinks = document.querySelectorAll('.gallery3_product-link')

  // Function to set up the hover animation for each product link
  const setUpHoverAnimation = (element) => {
    // Ensure the element has a child with the class '.product-link_image'
    const imageElement = element.querySelector('.product-link_image')
    const addToCartElement = element.querySelector('.is-card-add-to-cart')
    const nameButtonElement = element.querySelector('.is-card-item')
    const nameButtonText = nameButtonElement.querySelector(
      '.animating-text-size'
    )
    if (!imageElement || !addToCartElement || !nameButtonElement) {
      console.warn('No image element found for', element)
      return
    }

    // Create a GSAP timeline for the element and pause it initially
    const tl = gsap.timeline({ paused: true })
    tl.to(imageElement, {
      scale: 1.1,
      rotateZ: 15,
      ease: 'back.out(1.5)',
      duration: 0.5,
    })
    tl.from(
      addToCartElement,
      {
        opacity: 0,
        scale: 0,
        ease: 'back.out(1.5)',
        duration: 0.5,
      },
      '<'
    )
    tl.fromTo(
      nameButtonElement,
      {
        borderColor: 'transparent',
        ease: 'back.out(1.5)',
        duration: 0.5,
      },
      {
        borderColor: 'black',
        ease: 'back.out(1.5)',
        duration: 0.5,
      },
      '<'
    )
    tl.from(
      nameButtonText,
      {
        scale: 1.5,
        ease: 'power2.out',
        duration: 0.5,
      },
      '<'
    )

    // Return a function to play or reverse the timeline
    return (playForward) => {
      playForward ? tl.play() : tl.reverse()
    }
  }

  // Iterate over each product link
  productLinks.forEach((element) => {
    // Set up the animation timeline for this element
    const hoverAnimation = setUpHoverAnimation(element)

    // Event listeners to play or reverse the animation
    element.addEventListener('mouseenter', () => hoverAnimation(true))
    element.addEventListener('mouseleave', () => hoverAnimation(false))
  })
}

export const accordionToggle = () => {
  const accordion = document.querySelectorAll('.accordion1_top')

  const toggleAnimation = (element, dropdown) => {
    // Determine if the dropdown is currently open
    const isOpen = gsap.getProperty(dropdown, 'height') !== 0

    // Determine the new height based on whether the dropdown is open
    const newHeight = isOpen ? 0 : 'auto'

    // Apply the animation with GSAP to the new height
    gsap.to(dropdown, { height: newHeight, ease: 'power2.out' })
  }

  accordion.forEach((element) => {
    // Initially set the height to 0
    gsap.set(element.nextElementSibling, { height: 0 })

    element.addEventListener('click', () => {
      toggleAnimation(element, element.nextElementSibling)
    })
  })
}

export const navAnimation = () => {
  const duration = 0.6
  const navbuttons = document.querySelector('.nav-buttons_wrapper')
  const navLinksList = document.querySelector('.nav-links_center')
  const hamburger = document.querySelector('#hamburger')
  const closeNav = document.querySelector('#close-nav')

  let tl = gsap.timeline({ paused: true })
  tl.fromTo(
    '.nav-links_wrapper',
    { width: '0%', height: '0%' },
    {
      width: '100%',
      height: '800%',
      ease: 'elastic(0.3,0.5)',
      duration: 1.5,
      onStart: () => {
        navLinksList.style.display = 'flex'
        navbuttons.style.zIndex = 1
        navLinksList.style.zIndex = 2
      },
      onReverseComplete: () => {
        navbuttons.style.zIndex = 2
        navLinksList.style.zIndex = 1
      },
    }
  )
  tl.to('.nav-background', { boxShadow: '0 2px 4px rgba(0, 0, 0, .1)' }, '<')
  tl.to('.nav-buttons_wrapper > *, .button.drop-shadow ', { opacity: 0 }, '<')
  tl.from(
    '.nav-links_list > *',
    {
      opacity: 0,
      y: 50,
      duration: duration,
      ease: 'power2.out',
      stagger: 0.1,
    },
    '<0.2'
  )

  function openNav() {
    tl.timeScale(2).play()
  }

  function closeNavFunction() {
    tl.timeScale(2).reverse()
  }

  hamburger.addEventListener('click', openNav)
  closeNav.addEventListener('click', closeNavFunction)

  // Check for clicks outside of menu to close it
  document.addEventListener('click', function (event) {
    // If the clicked element is not the specified element and not a descendant of it
    if (!document.querySelector('.nav').contains(event.target)) {
      closeNavFunction()
    }
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNavFunction()
    }
  })

  // Return the functions
  return { openNav, closeNavFunction }
}

const cartPopUpItemInfo = (data) => {
  const popupItem = document.querySelector('.cart-popup-item')
  const popupTitle = popupItem.querySelector('[popup="title"')
  const popupPrice = popupItem.querySelector('[popup="price"')
  popupTitle.textContent = data.items[0].product_title
  popupPrice.textContent = '£' + (data.items[0].price / 100).toFixed(2)
}

export const cartPopUpAnimation = () => {
  const duration = 0.6
  const navbuttons = document.querySelector('.nav-buttons_wrapper')
  const navLinksList = document.querySelector('.cart-popup-links_center')
  const closeNav = document.querySelector('#close-cart-popup')
  const cartPopupItemsAnimated = document.getElementsByClassName(
    'cart-popup-links_list > *'
  )
  const openCartButton = navLinksList.querySelector('[function="open-cart"]')

  const cart = document.querySelector('.cart-links_wrapper')

  function handleMenuCloseButton(e) {
    // If the clicked element is not the specified element and not a descendant of it
    if (document.querySelector('.nav').contains(e.target)) {
      closeNav.removeEventListener('click', handleMenuCloseButton)
      document.removeEventListener('keydown', handleMenuCloseOutside)
      document.removeEventListener('click', handleMenuCloseOutside)
      closePopupFunction()
      addToCartAnimation().playAnimation()
    }
  }
  function handleMenuCloseOutside(e) {
    // If the clicked element is not the specified element and not a descendant of it
    if (
      e.type === 'click' &&
      !document.querySelector('.nav').contains(e.target)
    ) {
      document.removeEventListener('keydown', handleMenuCloseOutside)
      document.removeEventListener('click', handleMenuCloseOutside)
      closeNav.removeEventListener('click', handleMenuCloseButton)
      closePopupFunction()
      addToCartAnimation().playAnimation()
      openCartButton.removeEventListener('click', closePopupFunction)
    }
    if (e.type === 'keydown' && e.key === 'Escape') {
      document.removeEventListener('keydown', handleMenuCloseOutside)
      document.removeEventListener('click', handleMenuCloseOutside)
      closeNav.removeEventListener('click', handleMenuCloseButton)
      closePopupFunction()
      addToCartAnimation().playAnimation()
      openCartButton.removeEventListener('click', closePopupFunction)
    }
  }

  let tl = gsap.timeline({ paused: true })
  tl.fromTo(
    '.cart-popup-links_wrapper',
    { width: '0%', height: '0%' },
    {
      width: '100%',
      height: '600%',
      ease: 'elastic(0.3,0.5)',
      duration: 1.5,
      onStart: () => {
        navLinksList.style.display = 'flex'
        navbuttons.style.zIndex = 1
        navLinksList.style.zIndex = 2
        // Check for clicks outside of menu to close it
        document.addEventListener('click', handleMenuCloseOutside)
        document.addEventListener('keydown', handleMenuCloseOutside)
        closeNav.addEventListener('click', handleMenuCloseButton)
        openCartButton.addEventListener('click', closePopupFunction)
      },
      onReverseComplete: () => {
        navbuttons.style.zIndex = 2
        navLinksList.style.zIndex = 1
      },
    }
  )
  tl.to(
    '.cart-popup-background',
    { boxShadow: '0 2px 4px rgba(0, 0, 0, .1)' },
    '<'
  )
  tl.to('.nav-buttons_wrapper > *, .button.drop-shadow ', { opacity: 0 }, '<')
  tl.from(
    cartPopupItemsAnimated,
    {
      opacity: 0,
      y: 50,
      duration: duration,
      ease: 'power2.out',
      stagger: 0.1,
    },
    '<0.2'
  )

  function openNav() {
    if (cart.attributes.cart_state.value == 'closed') {
      tl.timeScale(2).play()
    }
  }

  function closePopupFunction() {
    tl.timeScale(2).reverse()
  }

  // Return the functions
  return { openNav, closePopupFunction }
}

export const cartAnimation = () => {
  const navbuttons = document.querySelector('.nav-buttons_wrapper')
  const navLinksList = document.querySelector('.cart-links_center')
  const cartButton = document.querySelector('#cart-button')
  const closeNav = document.querySelector('#close-cart')
  const cart = document.querySelector('.cart-links_wrapper')
  cart.setAttribute('cart_state', 'closed')

  function openNav() {
    const cartItems = document
      .querySelector('.cart-items_layout')
      .querySelectorAll('.cart-item')
    const itemsHeight = 90 * cartItems.length
    const cartHeight = 280 + itemsHeight + 'px'

    //height of main element
    gsap.fromTo(
      cart,
      { width: '0%', height: '0%' },
      {
        width: '100%',
        height: cartHeight,
        ease: 'elastic(0.3,0.5)',
        duration: 0.75,
        onStart: () => {
          navLinksList.style.display = 'flex'
          navbuttons.style.zIndex = 1
          navLinksList.style.zIndex = 2
          cart.setAttribute('cart_state', 'open')
          // Check for clicks outside of menu to close it
          document.addEventListener('click', closeCartFunction)
          document.addEventListener('keydown', closeCartFunction)
          closeNav.addEventListener('click', closeCartFunction)
        },
        onReverseComplete: () => {
          navbuttons.style.zIndex = 2
          navLinksList.style.zIndex = 1
          cart.setAttribute('cart_state', 'closed')
          //closeNav.removeEventListener('click', closeCartFunction)
        },
      }
    )
    //hide menu
    gsap.to('.nav-buttons_wrapper > *, .button.drop-shadow ', { opacity: 0 })
  }

  function updateCartHeight() {
    const cartItems = document
      .querySelector('.cart-items_layout')
      .querySelectorAll('.cart-item')
    const itemsHeight = 90 * cartItems.length
    const cartHeight = 280 + itemsHeight + 'px'

    //height of main element
    gsap.to(cart, {
      width: '100%',
      height: cartHeight,
      ease: 'elastic(0.3,0.5)',
      duration: 0.75,
    })
  }

  function closeCartFunction(event) {
    if (
      (event.type === 'click' &&
        !document.querySelector('.nav').contains(event.target)) ||
      (event.type === 'keydown' && event.key === 'Escape') ||
      (event.currentTarget &&
        event.currentTarget.getAttribute &&
        event.currentTarget.getAttribute('id') === 'close-cart')
    ) {
      const cart = document.querySelector('.cart-links_wrapper')
      gsap.to(cart, {
        width: '0%',
        height: '0%',
        ease: 'elastic(0.3,0.5)',
        duration: 0.75,
        onComplete: () => {
          navLinksList.style.display = 'none'
          navbuttons.style.zIndex = 2
          navLinksList.style.zIndex = 1
          cart.setAttribute('cart_state', 'closed')
        },
      })
      gsap.to('.cart-background', { boxShadow: '0 2px 4px rgba(0, 0, 0, .1)' })
      gsap.to(
        '.nav-buttons_wrapper > #hamburger, .nav-buttons_wrapper > .middle-button_wrapper, .nav-buttons_wrapper > #cart-button, .button.drop-shadow ',
        { opacity: 1 }
      )
      document.removeEventListener('click', closeCartFunction)
      document.removeEventListener('keydown', closeCartFunction)
    }
  }
  function addListeners() {
    cartButton.addEventListener('click', openNav)
    closeNav.addEventListener('click', closeCartFunction)
  }

  // Return the functions
  return { openNav, closeCartFunction, updateCartHeight, addListeners }
}

const createCartItem = (cartDataItem, newItem, cart, data) => {
  //check if newly added product already exists in the cart or not
  const cartTest = Array.from(cart.children).find((element) => {
    return element.attributes.product_id.value == cartDataItem.id
  })

  //if it exists, update quantity
  if (cartTest) {
    cartTest.querySelector('[cart-item="quantity"]').textContent =
      cartDataItem.quantity
    cartTest.querySelector('[cart-item="quantity"]').textContent =
      cartDataItem.quantity
    cartTest.querySelector('[cart-item="price"]').textContent =
      '£' + (cartDataItem.final_line_price / 100).toFixed(2)
  }
  // If not, add as new line product
  else {
    newItem.style.display = 'flex'
    newItem.querySelector('[cart-item="quantity"]').textContent =
      cartDataItem.quantity
    newItem.querySelector('[cart-item="title"]').textContent =
      cartDataItem.product_title
    newItem.querySelector('[cart-item="price"]').textContent =
      '£' + (cartDataItem.final_line_price / 100).toFixed(2)
    newItem.setAttribute('product_id', cartDataItem.id)
    cart.appendChild(newItem)
  }
  document.querySelector('[cart="total"]').textContent =
    '£' + (data.items_subtotal_price / 100).toFixed(2)
}

function handleQuantityChange(e) {
  const cartElement = e.currentTarget.closest('.cart-item')
  if (e.currentTarget.children[0].getAttribute('quantity-button') === 'add') {
    addToCart(cartElement.attributes.product_id.value, 1)
  } else {
    decreaseQuantity(cartElement.attributes.product_id.value)
  }
}

export const quantityButtons = () => {
  const cartItems = document
    .querySelector('.cart-items_layout')
    .querySelectorAll('.cart-item')

  cartItems.forEach((cartElement) => {
    cartElement
      .querySelectorAll('.quantity-button_link')
      .forEach((linkElement) => {
        // Remove existing event listeners to prevent duplicates
        linkElement.removeEventListener('click', handleQuantityChange)

        // Add the event listener
        linkElement.addEventListener('click', handleQuantityChange)
      })
  })
}

export const loadCart = () => {
  const cart = document.querySelector('.cart-items_layout')
  const cartItemTemplate = document.querySelector('.cart-item')
  const cartQuantity = document.querySelector('[cart="quantity"]')

  fetch(window.Shopify.routes.root + 'cart.js')
    .then((response) => response.json())
    .then((data) => {
      // Clear the cart only if it needs to be updated
      if (cart.children.length !== data.items.length) {
        cart.textContent = ''
      }

      data.items.forEach((element) => {
        const newItem = cartItemTemplate.cloneNode(true)
        createCartItem(element, newItem, cart, data)
      })

      if (data.items.length === 0 && cart.children.length > 0) {
        document.querySelector('[cart="total"]').textContent =
          '£' + data.total_price.toFixed(2)
      }

      if (data.items.length === 0) {
        document.querySelector('[cart="total"]').textContent = '£0.00'
      }
      cartAnimation().updateCartHeight()

      cartQuantity.textContent = data.item_count
      cartItemTemplate.parentNode.style.display = 'none'
      quantityButtons()
    })
}

export const decreaseQuantity = (variantId) => {
  var cartContents = fetch(window.Shopify.routes.root + 'cart.js')
    .then((response) => response.json())
    .then((cart) => {
      // Find the line item ID for the item you want to subtract

      const lineItemId = cart.items.find(
        (item) => item.variant_id == variantId
      ).key // Replace variantId with the actual variant ID

      // Calculate the new quantity
      let newQuantity =
        cart.items.find((item) => item.key == lineItemId).quantity - 1
      newQuantity = Math.max(newQuantity, 0) // Ensures the quantity doesn't go below zero

      // Update the cart
      return fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: lineItemId,
          quantity: newQuantity,
        }),
      })
    })
    .then((response) => response.json())
    .then(() => {
      loadCart()
    })
    .catch((error) => console.error('Error:', error))
  cartContents
}

const addToCartAnimation = () => {
  const container = document.querySelector('.cart-add-lottie')

  function createAnimation() {
    return Lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'https://cdn.shopify.com/s/files/1/0641/1055/9404/files/KOFF_HEART_ICON_BLACK.json',
    })
  }

  let animation = createAnimation()

  function playAnimation() {
    if (animation) {
      animation.destroy() // Destroy the current animation
    }
    animation = createAnimation() // Recreate the animation
    gsap.set(container, {
      scale: 1,
    })
    gsap.to(container, {
      delay: 0.5,
      opacity: 1,
      onStart: () => {
        animation.play()
      },
      onComplete: () => {
        setTimeout(() => {
          gsap.to(container, {
            scale: 0.3,
            opacity: 0,
            ease: 'power4.out',
          })
          console.log('finished')
        }, 500)
      },
    })
  }

  return { playAnimation }
}

// Define addToCart function
export function addToCart(variantId, quantity) {
  return fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [
        {
          id: variantId,
          quantity: quantity,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadCart()
      cartPopUpItemInfo(data)

      cartPopUpAnimation().openNav()
      return data
    })
    .catch((error) => {
      console.error('Error adding item:', error)
    })
}

// Define clearCart function
export function clearCart() {
  return fetch(window.Shopify.routes.root + 'cart/clear.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loadCart()
      return data
    })
    .catch((error) => {
      console.error('Error clearing cart:', error)
    })
}

export const siteWideCartButtons = () => {
  // Attach event listeners
  const addToCartButtons = document.querySelectorAll(
    '.add-to-cart_button, .is-card-add-to-cart'
  )
  addToCartButtons.forEach((element) => {
    element.addEventListener('click', () => {
      const productID = element.attributes.cartitemid.value
      addToCart(productID, 1) // Replace with dynamic variantId and quantity as needed
    })
  })

  const clearCartButton = document.querySelector('#clear-cart')
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      clearCart()
    })
  }
}

export const openCart = () => {
  const openCartLinks = document.querySelectorAll("[function='open-cart'")
  const cartAnimationRef = cartAnimation()
  cartAnimationRef.addListeners()
  openCartLinks.forEach((element) => {
    element.addEventListener('click', () => {
      cartAnimationRef.openNav()
    })
  })
}

export const sliderLoadAnimation = () => {
  const slider = document.querySelector('.testimonial15_mask')
  const slideElements = slider.children[0].querySelector(
    '.testimonial15_content'
  ).children
  const easeInOutCubicBezier = (t) => {
    if (t === 0) return 0
    if (t === 1) return 1
    if (t < 0.5) {
      // Adjust these values to approximate the first half of the cubic-bezier curve
      return 4 * t * t * t
    } else {
      // Adjust these values to approximate the second half of the cubic-bezier curve
      const f = 2 * t - 2
      return 0.5 * f * f * f + 1
    }
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: slider,
      start: 'top 75%',
      end: 'bottom center',
    },
  })

  tl.from(slideElements, {
    x: 300,
    opacity: 0,
    stagger: 0.2,
    ease: easeInOutCubicBezier,
    duration: 1,
  })
}

export const recipeCardAnimation = () => {
  const recipeCards = document.querySelectorAll('.gallery3_card-link')

  recipeCards.forEach((card) => {
    const container = card.querySelector('.gallery3_card-lottie')

    const lottie = Lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'https://cdn.shopify.com/s/files/1/0641/1055/9404/files/KOFF_HOVER_ANIMATION.json',
    })

    const image = card.querySelector('.gallery3_image')

    const hoverIn = () => {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.64,
        ease: 'back.out',
      })
    }

    const hoverOut = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.64,
        ease: 'expo.out',
      })
    }

    card.addEventListener('mouseover', () => {
      lottie.setDirection(1)
      lottie.play()
      hoverIn()
    })
    card.addEventListener('mouseleave', () => {
      lottie.setDirection(-1)
      lottie.play()
      hoverOut()
    })
  })
}

export const filtersDropdownAnimation = () => {
  const filtersToggleButton = document.querySelector('#toggle-filter-dropdown')
  const dropdownList = filtersToggleButton.nextElementSibling

  var isOpen = false

  gsap.set(dropdownList.children, {
    y: 50,
    opacity: 0,
    stagger: 0.1,
  })

  gsap.set(dropdownList, {
    height: '0',
    opacity: 0,
  })

  const openDropdown = () => {
    gsap.to(dropdownList, {
      height: 'auto',
      opacity: 1,
      duration: 0.75,
      ease: 'elastic(0.3,0.5)',
      onStart: () => {
        isOpen = true
      },
    })
    gsap.to(dropdownList.children, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
    })
  }
  const closeDropdown = () => {
    gsap.to(dropdownList, {
      height: '0',
      opacity: 0,
      ease: 'elastic(0.3,0.5)',
      duration: 0.75,
      onStart: () => {
        isOpen = false
      },
    })
    gsap.to(dropdownList.children, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
    })
  }

  const toggleDropdown = () => {
    if (!isOpen) {
      openDropdown()
    }
    if (isOpen) {
      closeDropdown()
    }
  }

  filtersToggleButton.addEventListener('click', toggleDropdown)
  document.addEventListener('click', (event) => {
    if (isOpen && !filtersToggleButton.parentNode.contains(event.target)) {
      closeDropdown()
    }
  })
}

export const instagramSlider = () => {
  const slider = document.querySelector('.instagram_component')
  const slides = slider.children

  const tl = gsap.timeline({ repeat: -1 })

  tl.to(slides, {
    x: '-101%',
    duration: 10,
    ease: 'linear',
    //paused: true,
  })

  tl.play()
}

export const pourPourPour = () => {
  const cubicBezierEasing = (t) => {
    const P1 = [0.005763688760806916, 0.9452054794520548]
    const P2 = [0.9985590778097982, 0.9360730593607306]
    return (
      (1 - t) ** 3 * 0.0 +
      3 * (1 - t) ** 2 * t * P1[1] +
      3 * (1 - t) * t ** 2 * P2[1] +
      t ** 3 * 1.0
    )
  }

  const text = new SplitType('#pourpourpour')

  gsap.set(text.lines[0], { y: '100%' })
  gsap.set(text.lines[2], { y: '-100%' })

  const playAnimation = () => {
    console.log(text.elements)
    gsap.to(text.elements, {
      scale: 1.2,
      delay: 0.25,
      duration: 0.5,
      ease: cubicBezierEasing,
    })
    gsap.to(text.lines[0], {
      y: '0%',
      duration: 0.5,
      delay: 0.25,
      ease: cubicBezierEasing,
    })
    gsap.to(text.lines[2], {
      y: '0%',
      duration: 0.5,
      delay: 0.25,
      ease: cubicBezierEasing,
    })
  }

  return { playAnimation }
}
