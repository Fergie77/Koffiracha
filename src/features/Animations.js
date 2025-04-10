import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'
import KeenSlider from 'keen-slider'
import Lottie from 'lottie-web'
import SplitType from 'split-type'

import {
  appendUrl,
  enableScrolling,
  hideNav,
  stopScrolling,
} from './Functionality'
import { setNavColourManual } from './NavbarSwapping'

gsap.registerPlugin(ScrollTrigger)

export const buttonAnimation = () => {
  const button = document.querySelectorAll("[gsap-button='true']")
  const smallbutton = document.querySelectorAll("[gsap-button-2='true']")
  const cartButton = document.querySelector('[gsap-button-cart=true]')

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
        gsap.to(element.querySelectorAll('.hamburger-line'), {
          background: 'var(--colour--white)',
          ease: 'power4.out',
          duration: 0,
        })
      })
      element.addEventListener('mouseleave', () => {
        gsap.to(element.querySelector('.hover-effect-background'), {
          y: -20,
          ease: 'power4.out',
          duration: 1.5,
        })
        gsap.to('.hamburger-line', {
          background: 'var(--colour--black)',
          ease: 'power4.out',
          duration: 0,
        })
      })
    }
  })

  if (cartButton.querySelector('.hover-effect-background')) {
    cartButton.addEventListener('mouseenter', () => {
      gsap.to(cartButton.querySelector('.hover-effect-background'), {
        y: 150,
        ease: 'power4.out',
        duration: 1.5,
      })

      gsap.to(cartButton.children[0], {
        color: 'var(--colour--white)',
        ease: 'power4.out',
        duration: 0,
      })
    })
    cartButton.addEventListener('mouseleave', () => {
      gsap.to(cartButton.querySelector('.hover-effect-background'), {
        y: -20,
        ease: 'power4.out',
        duration: 1.5,
      })
      gsap.to(cartButton.children[0], {
        color: 'var(--colour--black)',
        ease: 'power4.out',
        duration: 0,
      })
    })
  }
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

  setTimeout(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: roundingElement,
        start: 'top 75%',
        end: 'bottom center',
        scrub: 2,
      },
    })

    tl.to(roundingElement, {
      borderRadius: 36,
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
        scale: 1.05,
      },
      '<'
    )
  }, 1000)
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
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(Flip)

  ScrollTrigger.config({
    ignoreMobileResize: true,
  })

  // ScrollTrigger.normalizeScroll({
  //   allowNestedScroll: true,
  //   ignore: '#story-slider-1',
  //   //lockAxis: false,
  //   //type: 'touch,wheel,pointer', // now the page will be drag-scrollable on desktop because "pointer" is in the list
  // })
  // setTimeout(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  // }, 1000)
  function createTimeline(componentEl, componentIndex) {
    let originEl = componentEl.querySelectorAll(
        "[tr-scrollflip-element='origin']"
      ),
      targetEl = componentEl.querySelectorAll(
        "[tr-scrollflip-element='target']"
      ),
      scrubStartEl = componentEl.querySelector('[tr-scrollflip-scrubstart]'),
      scrubEndEl = componentEl.querySelector('[tr-scrollflip-scrubend]'),
      canvas = componentEl.querySelector('[element="animated-bottle"]') // Select canvas within the component

    if (!canvas) return // Skip if no canvas found in the current component

    let startSetting, endSetting

    // Check if the screen width is below 991px
    if (window.innerWidth < 991) {
      // For screens smaller than 991px
      startSetting = 'top top'
      endSetting = 'bottom bottom+=200px'
    } else {
      // For screens 991px and above
      startSetting = 'top top-=200px'
      endSetting = 'bottom bottom+=100px'
    }

    let staggerSpeedSetting = attr(
        0,
        componentEl.getAttribute('tr-scrollflip-staggerspeed')
      ),
      staggerDirectionSetting = attr(
        'start',
        componentEl.getAttribute('tr-scrollflip-staggerdirection')
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
          scale: true,
          stagger: {
            amount: staggerSpeedSetting,
            from: staggerDirectionSetting,
          },
        })
      )
    })

    const context = canvas.getContext('2d')
    const frameCount = 300
    let animationID = canvas.getAttribute('title')?.toString() || 'chilli-flame' // Default to 'V2' if no title
    let canvasWidth = 450
    let canvasHeight = 525

    // Check if the screen width is below 991px
    if (window.innerWidth < 479) {
      // For screens smaller than 991px
      const modifiedAnimationID = animationID + '-mobile'
      animationID = modifiedAnimationID
    } else {
      canvasWidth = 900
      canvasHeight = 1050
    }

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    // Simplified currentFrame function
    const currentFrame = (index) =>
      `https://raw.githubusercontent.com/Fergie77/Koffiracha/main/Logo%20Animation/${animationID}/0_${index
        .toString()
        .padStart(4, '0')}.webp`

    const images = []
    //let loadedImages = 0

    const preloadImages = () => {
      const imagePromises = Array.from({ length: frameCount }, (_, i) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve(img) // Resolving the promise with the loaded image
          img.onerror = reject // Rejecting the promise on an error
          img.src = currentFrame(i + 1) // Adjusted index by 1 since array is 0-based and images start from 1
        })
      })

      // Using Promise.all to wait for all images to be loaded
      return Promise.all(imagePromises)
        .then((loadedImages) => {
          images.length = 0 // Clear existing images array to prevent duplicates on resize
          images.push(...loadedImages) // Spread syntax to push all loaded images at once
          requestAnimationFrame(() => updateImage(0)) // Start animation with the first image
        })
        .catch((error) => console.error('Error loading images:', error)) // Catch and log any error during image loading
    }

    // Initially call preloadImages to load all images
    preloadImages()

    let currentIndex = 1

    const updateImage = (index) => {
      // Ensure we're not redrawing the same frame
      if (currentIndex !== index) {
        context.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas
        const img = images[index]
        const centerX = (canvas.width - img.width) / 2
        const centerY = (canvas.height - img.height) / 2

        context.drawImage(img, centerX, centerY)
        currentIndex = index // Update the current index
      }
    }

    preloadImages()

    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: scrubStartEl,
          endTrigger: scrubEndEl,
          start: startSetting,
          end: endSetting,
          scrub: 2,
        },
        frame: 0,
        duration: 1,
        ease: 'expo.inOut',
        onUpdate: function () {
          const progress = this.progress()
          const index = Math.floor(progress * (frameCount - 1))
          updateImage(index)
        },
      }
    )
  }

  setTimeout(() => {
    const scrollFlipElement = document.querySelectorAll(
      "[tr-scrollflip-element='component']"
    )

    scrollFlipElement.forEach((componentEl, index) => {
      createTimeline(componentEl, index)

      let resizeTimer
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          createTimeline(componentEl, index)
        }, 250)
      })
    })
  }, 500)
}

export const pourLottieAnimations = (pageContainer) => {
  setTimeout(() => {
    let containers = pageContainer.querySelectorAll(
      '.pour_background-animation'
    )
    if (containers) {
      containers.forEach((container) => {
        const lottieColour = container.getAttribute('lottie-colour')
        if (lottieColour != 'red') {
          let lottieAnim = Lottie.loadAnimation({
            container: container,
            renderer: 'canvas',
            loop: false,
            autoplay: false,
            path: 'https://cdn.shopify.com/s/files/1/0551/2983/3536/files/KOFF_POUR_STROKE_NEON_FLAME.json',
          })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.parentElement,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => {
                lottieAnim.play()
              },
            },
          })

          tl
        } else {
          let lottieAnim = Lottie.loadAnimation({
            container: container,
            renderer: 'canvas',
            loop: false,
            autoplay: false,
            path: 'https://cdn.shopify.com/s/files/1/0551/2983/3536/files/KOFF_POUR_STROKE_NEON_FIRE.json',
          })
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.parentElement,
              start: 'top center',
              end: 'bottom center',
              onEnter: () => {
                lottieAnim.play()
              },
            },
          })

          tl
        }
      })
    }
    document.querySelector('html').style.scrollBehavior = 'auto'
  }, 200)
}

export const pageTransition = () => {
  let container = document.querySelector('.page-transition')
  const hamburger = document.querySelector('#close-nav')

  let lottieAnim = Lottie.loadAnimation({
    container: container,
    renderer: 'canvas',
    loop: false,
    autoplay: false,
    path: 'https://cdn.shopify.com/s/files/1/0551/2983/3536/files/KOFF_PAGE_LOADER_3.json',
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
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant',
        })
        data.next.container.classList.remove('fixed')
      },
    })
  })

  const resizePageTransition = () => {
    const screenWidth = window.innerWidth
    let scaleFactor
    if (container) {
      // Check if screen width is less than 993px
      if (screenWidth < 993) {
        // Apply rotation and scale for devices under 993px
        scaleFactor = 2.5
        container.style.transform = `scale(${scaleFactor}) rotate(270deg)`

        // Adjust position as needed when rotated
        container.style.transformOrigin = 'center center'
        container.style.overflow = 'hidden'
      } else {
        // Revert to default scale without rotation for wider screens
        scaleFactor = 1.266
        container.style.transform = `scale(${scaleFactor})`
      }
    }
  }

  // Initial call and add event listener for resize events
  resizePageTransition()
  window.addEventListener('resize', resizePageTransition)
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
    const xRotate = isOpen ? 0 : 45

    // Apply the animation with GSAP to the new height
    gsap.to(dropdown, {
      height: newHeight,
      ease: 'power2.out',
    })

    gsap.to(element.querySelector('.accordion1_icon'), {
      rotateZ: xRotate,
      ease: 'power2.out',
    })
  }

  accordion.forEach((element) => {
    // Initially set the height to 0
    if (!element.getAttribute('start-open')) {
      gsap.set(element.nextElementSibling, { height: 0 })
    } else {
      gsap.set(element.querySelector('.accordion1_icon'), { rotateZ: 45 })
    }

    element.addEventListener('click', () => {
      toggleAnimation(element, element.nextElementSibling)
    })
  })
}

export const recipeAccordionToggle = () => {
  const accordionElements = document.querySelectorAll('.accordion1_top')

  const closeAllDropdowns = (exceptElement) => {
    accordionElements.forEach((element) => {
      if (element !== exceptElement) {
        const dropdown = element.nextElementSibling
        gsap.to(dropdown, { height: 0, ease: 'power2.out' })
        gsap.to(element.querySelector('.accordion1_icon'), {
          rotateZ: 0,
          ease: 'power2.out',
        })
      }
    })
  }

  const toggleDropdown = (element) => {
    const dropdown = element.nextElementSibling
    const isOpen = gsap.getProperty(dropdown, 'height') !== 0
    const newHeight = isOpen ? 0 : 'auto'
    const xRotate = isOpen ? 0 : 45

    if (!isOpen) {
      closeAllDropdowns(element)
    }

    gsap.to(dropdown, {
      height: newHeight,
      ease: 'power2.out',
    })

    gsap.to(element.querySelector('.accordion1_icon'), {
      rotateZ: xRotate,
      ease: 'power2.out',
    })
  }

  accordionElements.forEach((element) => {
    // Set initial state based on the 'start-open' attribute
    if (!element.getAttribute('start-open')) {
      gsap.set(element.nextElementSibling, { height: 0 })
    } else {
      gsap.set(element.querySelector('.accordion1_icon'), { rotateZ: 45 })
    }

    element.addEventListener('click', () => {
      toggleDropdown(element)
    })
  })
}

// Assuming gsap is already imported
const duration = 0.6
let tl

const initTimeline = () => {
  if (!tl) {
    const navbuttons = document.querySelector('.nav-buttons_wrapper')
    const navLinksList = document.querySelector('.nav-links_center')

    tl = gsap.timeline({ paused: true })
    tl.fromTo(
      '.nav-links_wrapper',
      { width: '0%', height: '0%' },
      {
        width: '100%',
        height: '650%',
        ease: 'elastic.out(0.3,0.5)',
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
  }
}

export const openNav = () => {
  initTimeline()
  tl.timeScale(2).play()
}

export const closeNavFunction = () => {
  initTimeline()
  tl.timeScale(2).reverse()
}

export const navAnimation = () => {
  initTimeline()
  const hamburger = document.querySelector('#hamburger')
  const closeNav = document.querySelector('#close-nav')

  hamburger.addEventListener('click', openNav)
  closeNav.addEventListener('click', closeNavFunction)

  document.addEventListener('click', function (event) {
    if (!document.querySelector('.nav').contains(event.target)) {
      closeNavFunction()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNavFunction()
    }
  })

  return { openNav, closeNavFunction }
}

const cartPopUpItemInfo = (data) => {
  const popupItem = document.querySelector('.cart-popup-item')
  const popupTitle = popupItem.querySelector('[popup="title"')
  const popupPrice = popupItem.querySelector('[popup="price"')

  popupTitle.textContent = data.items[0].product_title
  popupPrice.textContent = '£' + (data.items[0].price / 100).toFixed(2)
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
    gsap.to('.nav-buttons_wrapper > * ', { opacity: 0 })
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
        '.nav-buttons_wrapper > #hamburger, .nav-buttons_wrapper > .middle-button_wrapper, .nav-buttons_wrapper > #cart-button, .button-drop-shadow ',
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
      '£' + (cartDataItem.final_price / 100).toFixed(2)
  }
  // If not, add as new line product
  else {
    newItem.style.display = 'flex'
    newItem.querySelector('[cart-item="quantity"]').textContent =
      cartDataItem.quantity
    newItem
      .querySelector('[cart-item="image"]')
      .setAttribute('src', cartDataItem.image)
    newItem.querySelector('[cart-item="title"]').textContent =
      cartDataItem.product_title
    newItem.querySelector('[cart-item="price"]').textContent =
      '£' + (cartDataItem.final_price / 100).toFixed(2)
    newItem.setAttribute('product_id', cartDataItem.id)
    cart.appendChild(newItem)
  }
  document.querySelector('[cart="total"]').textContent =
    '£' + (data.items_subtotal_price / 100).toFixed(2)
}

function handleQuantityChange(e) {
  const cartElement = e.currentTarget.closest('.cart-item')
  if (e.currentTarget.children[0].getAttribute('quantity-button') === 'add') {
    addToCart(cartElement.attributes.product_id.value, 1, false)
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

  const cartIcon = document.querySelector('.cart-icon-2')

  const cartIconFull =
    'M26.6074,15.0137c-.0547-.5488-.5303-.9307-1.0947-.8955-.5498.0547-.9502.5449-.8955,1.0947l1.0869,10.8818c.0498.4922-.1064.9658-.4385,1.332-.332.3672-.7871.5693-1.2822.5693h-15.9668c-.4951,0-.9502-.2021-1.2822-.5693-.332-.3662-.4883-.8398-.4385-1.332l1.4512-14.5371c.0889-.8877.8291-1.5576,1.7217-1.5576h1.5371v2c0,.5527.4473,1,1,1s1-.4473,1-1v-2h5.9883v2c0,.5527.4473,1,1,1s1-.4473,1-1v-2.0012c.0021,0,.0038.0012.0059.0012.5522,0,1-.4478,1-1s-.4478-1-1-1c-.0021,0-.0038.0012-.0059.0012v-1.6887c0-2.7539-2.2402-4.9941-4.9941-4.9941s-4.9941,2.2402-4.9941,4.9941v1.6875h-1.5371c-1.9248,0-3.5205,1.4434-3.7119,3.3584l-1.4512,14.5371c-.1045,1.0459.2393,2.0938.9453,2.873.7051.7803,1.7139,1.2275,2.7656,1.2275h15.9668c1.0518,0,2.0605-.4473,2.7656-1.2275.7061-.7793,1.0498-1.8271.9453-2.873l-1.0869-10.8818ZM13.0059,6.3125c0-1.6514,1.3428-2.9941,2.9941-2.9941s2.9941,1.3428,2.9941,2.9941v1.6875h-5.9883v-1.6875Z'
  const cartIconEmpty =
    'M26.2432,11.3584c-.1914-1.915-1.7871-3.3584-3.7119-3.3584h-1.5371v-1.6875c0-2.7539-2.2402-4.9941-4.9941-4.9941s-4.9941,2.2402-4.9941,4.9941v1.6875h-1.5371c-1.9248,0-3.5205,1.4434-3.7119,3.3584l-1.4512,14.5371c-.1045,1.0459.2393,2.0938.9453,2.873.7051.7803,1.7139,1.2275,2.7656,1.2275h15.9668c1.0518,0,2.0605-.4473,2.7656-1.2275.7061-.7793,1.0498-1.8271.9453-2.873l-1.4512-14.5371ZM13.0059,6.3125c0-1.6514,1.3428-2.9941,2.9941-2.9941s2.9941,1.3428,2.9941,2.9941v1.6875h-5.9883v-1.6875ZM25.2656,27.4268c-.332.3672-.7871.5693-1.2822.5693h-15.9668c-.4951,0-.9502-.2021-1.2822-.5693-.332-.3662-.4883-.8398-.4385-1.332l1.4512-14.5371c.0889-.8877.8291-1.5576,1.7217-1.5576h1.5371v2c0,.5527.4473,1,1,1s1-.4473,1-1v-2h5.9883v2c0,.5527.4473,1,1,1s1-.4473,1-1v-2h1.5371c.8926,0,1.6328.6699,1.7217,1.5576l1.4512,14.5371c.0498.4922-.1064.9658-.4385,1.332Z'
  const cartIconCircle = document.querySelector('.cart-icon-circle')

  if (window.Shopify && window.Shopify.routes) {
    fetch(window.Shopify.routes.root + 'cart.js')
      .then((response) => response.json())
      .then((data) => {
        // Clear the cart only if it needs to be updated
        if (cart.children.length !== data.items.length) {
          cart.textContent = ''

          cartIcon.setAttribute('d', cartIconEmpty)
          cartIconCircle.style.display = 'none'
        }

        data.items.forEach((element) => {
          const newItem = cartItemTemplate.cloneNode(true)
          createCartItem(element, newItem, cart, data)
        })

        if (data.items.length > 0) {
          cartIcon.setAttribute('d', cartIconFull)
          cartIconCircle.style.display = 'block'
        }

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

// Define addToCart function
export function addToCart(variantId, quantity, openCart) {
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
      if (data.message != 'Cart Error') {
        cartPopUpItemInfo(data)
        if (openCart) {
          cartAnimation().openNav()
        }
      } else {
        alert('This product is not in stock')
      }

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
  const addCartButtonListener = (e) => {
    const productID = e.currentTarget.attributes.cartitemid.value
    addToCart(productID, 1, true) // Replace with dynamic variantId and quantity as needed
  }

  // Attach event listeners
  const addToCartButtons = document.querySelectorAll(
    '.add-to-cart_button, .is-card-add-to-cart, [cartitemid]'
  )
  addToCartButtons.forEach((element) => {
    element.removeEventListener('click', addCartButtonListener)
    element.addEventListener('click', addCartButtonListener)
  })

  const clearCartButton = document.querySelector('#clear-cart')
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart)
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

export const testimonialSliderLoadAnimation = () => {
  function WheelControls(slider) {
    var touchTimeout
    var position
    var wheelActive

    function dispatch(e, name) {
      position.x -= e.deltaX
      position.y -= e.deltaY
      slider.container.dispatchEvent(
        new CustomEvent(name, {
          detail: {
            x: position.x,
            y: position.y,
          },
        })
      )
    }

    function wheelStart(e) {
      position = {
        x: e.pageX,
        y: e.pageY,
      }
      dispatch(e, 'ksDragStart')
    }

    function wheel(e) {
      dispatch(e, 'ksDrag')
    }

    function wheelEnd(e) {
      dispatch(e, 'ksDragEnd')
    }

    function eventWheel(e) {
      // Only prevent default action for horizontal wheel events
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
      }

      if (!wheelActive) {
        wheelStart(e)
        wheelActive = true
      }
      wheel(e)
      clearTimeout(touchTimeout)
      touchTimeout = setTimeout(() => {
        wheelActive = false
        wheelEnd(e)
      }, 50)
    }

    slider.on('created', () => {
      slider.container.addEventListener('wheel', eventWheel, {
        passive: false,
      })
    })
  }

  const sliderRef = document.querySelector('.section_testimonial')
  const selector = '.testimonial-item'
  const arrow = sliderRef.querySelector(
    '[testimonial-slider = "arrow-desktop"]'
  )

  const ArrowButton = (slider) => {
    arrow.addEventListener('click', () => {
      let currentSlide = slider.track.details.rel
      slider.moveToIdx(currentSlide + 1)
    })
  }

  const slider = new KeenSlider(
    sliderRef,
    {
      selector: selector,
      slides: {
        perView: 1.4,
        spacing: 45,
      },
      loop: true,
      breakpoints: {
        '(max-width: 768px)': {
          slides: {
            perView: 1,
            spacing: 45,
          },
        },
        '(max-width: 479px)': {
          slides: {
            perView: 1.25,
            spacing: 20,
            //origin: 'center',
          },
        },
      },
    },
    [WheelControls, ArrowButton]
  )
  slider
}

export const recipeCardAnimation = () => {
  const recipeCards = document.querySelectorAll('.gallery3_card-link')

  const lottieColour = document.querySelector('.is-red-test')

  recipeCards.forEach((card) => {
    const container = card.querySelectorAll('.gallery3_card-lottie')

    let lottie = null

    container.forEach((element) => {
      //const lottieColour = element.getAttribute('lottie-colour')
      if (lottieColour) {
        if (lottieColour.classList.contains('w-condition-invisible')) {
          lottie = Lottie.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'https://cdn.shopify.com/s/files/1/0641/1055/9404/files/KOFF_HOVER_ANIMATION.json',
          })
        } else {
          lottie = Lottie.loadAnimation({
            container: element,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'https://cdn.shopify.com/s/files/1/0641/1055/9404/files/KOFF_HOVER_ANIMATION_NEON_FLAME.json',
          })
        }
      } else {
        lottie = Lottie.loadAnimation({
          container: element,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: 'https://cdn.shopify.com/s/files/1/0641/1055/9404/files/KOFF_HOVER_ANIMATION.json',
        })
      }
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
  const dropdownIcon = document.querySelector('.filter-dropdown_icon')

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
      boxShadow: '0 2px 4px rgba(0, 0, 0, .1)',
      borderRadius: '18px',
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
    gsap.to(dropdownIcon, {
      rotateZ: 45,
      ease: 'elastic(0.3,0.5)',
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
    gsap.to(dropdownIcon, {
      rotateZ: 0,
      ease: 'elastic(0.3,0.5)',
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
    duration: 15,
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

export const homepageHeroTextAnimation = () => {
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
  const text = new SplitType('.splt')

  text.lines.forEach((element, index) => {
    element.style.overflow = 'hidden'
    gsap.set(element, { y: '-40px' })
    gsap.set(element.firstChild, { y: '40px' })
    gsap.from(element.firstChild, {
      y: '300px',
      ease: cubicBezierEasing,
      delay: 0.5 + index / 10,
    })
  })
}

export const mobileProductSlider = () => {
  function checkScreenSize() {
    // Your JavaScript code for screens under 767px
    const slider = new KeenSlider('.blog1_list', {
      loop: true,
      slides: {
        perView: 1.2,
        origin: 'center',
      },
    })
    if (window.matchMedia('(max-width: 767px)').matches) {
      slider
    } else {
      // Optional: Your JavaScript code for screens over 767px
      slider.destroy()
    }
  }

  // Run the function on initial load
  checkScreenSize()

  // Add an event listener that runs the function when the window is resized
  window.addEventListener('resize', checkScreenSize)
}

export const hugeTextSplitAnimation = () => {
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

  const hugeText = document.querySelectorAll('[animation="split-text"]')

  // var mm = gsap.matchMedia()

  // mm.add('(min-width: 800px)', () => {
  hugeText.forEach((element) => {
    const splitText = new SplitType(element)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitText.elements,
        start: 'top top',
        end: 'bottom bottom',
      },
      defaults: {
        ease: cubicBezierEasing,
      },
    })
    tl.from(splitText.lines[0], { y: '150%', opacity: 0 }, '<')
    tl.from(splitText.lines[1], { y: '50%', opacity: 0 }, '<')
    tl.from(splitText.lines[2], { y: '-50%', opacity: 0 }, '<')
    tl.from(splitText.lines[3], { y: '-150%', opacity: 0 }, '<')
  })
  // })
}

export const recipeSlider = () => {
  function WheelControls(slider) {
    var touchTimeout
    var position
    var wheelActive

    function dispatch(e, name) {
      position.x -= e.deltaX
      position.y -= e.deltaY
      slider.container.dispatchEvent(
        new CustomEvent(name, {
          detail: {
            x: position.x,
            y: position.y,
          },
        })
      )
    }

    function wheelStart(e) {
      position = {
        x: e.pageX,
        y: e.pageY,
      }
      dispatch(e, 'ksDragStart')
    }

    function wheel(e) {
      dispatch(e, 'ksDrag')
    }

    function wheelEnd(e) {
      dispatch(e, 'ksDragEnd')
    }

    function eventWheel(e) {
      // Only prevent default action for horizontal wheel events
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
      }

      if (!wheelActive) {
        wheelStart(e)
        wheelActive = true
      }
      wheel(e)
      clearTimeout(touchTimeout)
      touchTimeout = setTimeout(() => {
        wheelActive = false
        wheelEnd(e)
      }, 50)
    }

    slider.on('created', () => {
      slider.container.addEventListener('wheel', eventWheel, {
        passive: false,
      })
    })
  }

  const sliderRef = document.querySelector('.gallery3_component')
  const selector = '.gallery3_card-link'

  const arrow = sliderRef.querySelector('[recipe-slider = "arrow"]')
  const addKeenSlider = () => {
    const ArrowButton = () => {
      arrow.addEventListener('click', () => {
        slider.next()
      })
    }

    const slider = new KeenSlider(
      sliderRef,
      {
        selector: selector,
        slides: {
          perView: 3.1,
          spacing: 24,
        },

        loop: true,
        breakpoints: {
          '(max-width: 768px)': {
            slides: {
              perView: 1.2,
              spacing: 45,
              origin: 'center',
            },
          },
          '(max-width: 479px)': {
            slides: {
              perView: 1.15,
              spacing: 20,
              origin: 'center',
            },
          },
        },
      },
      [WheelControls, ArrowButton]
    )
  }
  addKeenSlider()
}

export const recipeModal = () => {
  const recipeCards = document.querySelectorAll('.blog1_item')

  const currentURL = window.location.href
  const url = new URL(currentURL)

  const searchParams = url.searchParams

  const toggleModal = (e) => {
    const modal = e.currentTarget.nextElementSibling
    const modalInfo = modal.querySelector('.section_layout3')
    const modalBackground = modal.querySelector('.recipe-modal_background')
    const close = modal.querySelector('[recipe-modal="close"]')
    const modalLink = e.currentTarget.getAttribute('recipe-slug')

    appendUrl(modalLink)

    const tl = gsap.timeline({ paused: true })
    tl.set(modal, {
      display: 'none',
    })
    tl.set(modalInfo, {
      opacity: 0,
    })
    tl.set(modalBackground, {
      scaleY: 0,
    })

    tl.to(
      modal,
      {
        display: 'block',
      },
      '<'
    )

    tl.to(
      modalBackground,
      {
        scaleY: 1,
        duration: 1,
        ease: 'expo.inOut',
        onStart: () => {
          hideNav(true)
        },
        onReverseComplete: () => {
          hideNav(false)
        },
      },
      '<'
    )
    tl.to(
      modalInfo,
      {
        opacity: 1,
        onStart: () => {
          stopScrolling()

          setNavColourManual('black')
        },
        onComplete: () => {
          close.addEventListener('click', () => {
            tl.reverse()
          })
        },
        onReverseComplete: () => {
          close.removeEventListener('click', tl.reverse())
          enableScrolling()

          appendUrl('', true)
          setNavColourManual('yellow')
        },
      },
      '<0.5'
    )

    tl.play()
  }

  recipeCards.forEach((card) => {
    card.addEventListener('click', toggleModal)
  })

  if (searchParams.has('modalToOpen')) {
    const slug = searchParams.get('modalToOpen')

    const item = document.querySelector('[recipe-slug="' + slug + '"]')
    item.click()
  }
}
