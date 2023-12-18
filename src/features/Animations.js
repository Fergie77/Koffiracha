import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'
import KeenSlider from 'keen-slider'
import Lottie from 'lottie-web'

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
    },
  })

  tl.to(roundingElement, {
    borderRadius: 20,
    marginLeft: '2.5rem',
    marginRight: '2.5rem',
  })
  tl.to(
    roundingElement.querySelector('.header30_background-image'),
    {
      scale: 1.1,
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
        navLinksList.style.display = 'none'
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

    container.style.transform = `scale(${scaleFactor})`
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
      origin: 'center',
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
    // Determine the new height based on the current height
    const newHeight = dropdown.style.height === 'auto' ? 0 : 'auto'

    // Apply the animation with GSAP to the new height
    gsap.to(dropdown, { height: newHeight, ease: 'power2.out' })
  }

  accordion.forEach((element) => {
    // Initially set the height to 0
    gsap.set(element.nextSibling, { height: 0 })

    element.addEventListener('click', () => {
      toggleAnimation(element, element.nextSibling)
    })
  })
}
