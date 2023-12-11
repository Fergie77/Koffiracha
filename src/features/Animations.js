import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Flip } from 'gsap/all'
import KeenSlider from 'keen-slider'

export const buttonAnimation = () => {
  const button = document.querySelectorAll("[gsap-button='true']")

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
}

export const roundingImageElement = () => {
  gsap.registerPlugin(ScrollTrigger)
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
  window.addEventListener('DOMContentLoaded', function () {
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal
      if (typeof attrVal !== 'string' || attrVal.trim() === '')
        return defaultVal
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
          //gsap.from('.inflating-logo', { opacity: 0 })
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
  })
}

export const storySliderSlideIn = () => {
  const arrow = document.querySelector('[story-slider = "arrow"]')
  const slider = document.querySelector('[story-slider = "slider"]')
  const background = document.querySelector('[story-slider = "background"]')
  const easing = 'expo.inOut'
  const duration = 2

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
        slider.next()
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
      [ArrowButton]
    )
    slider
  }
  addKeenSlider()
}
