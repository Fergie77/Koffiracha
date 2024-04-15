import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import KeenSlider from 'keen-slider'

export const storySliderSlideIn = (
  arrow,
  close,
  sliderElement,
  background,
  mobileText
) => {
  const easing = 'expo.inOut'
  const duration = 2
  let firstClick = false
  let slider // Define slider here to be accessible in all functions

  const sliderOriginalPositionRef =
    window.getComputedStyle(sliderElement).transform
  var sliderOriginalPosition = new DOMMatrix(sliderOriginalPositionRef).e

  gsap.set(close, {
    opacity: 0,
  })

  let enableWheelControls
  let disableWheelControls

  const slideIn = () => {
    if (!slider) {
      console.error('Slider is not initialized')
      return
    }
    gsap.to(sliderElement, {
      x: '0%',
      ease: easing,
      duration: duration,
      onStart: removeListeners,
      onComplete: () => {
        if (typeof enableWheelControls === 'function') {
          enableWheelControls()
        }
      },
    })
    if (window.innerWidth < 479) {
      gsap.to(arrow, {
        opacity: 0,
        ease: easing,
        duration: duration,
        onComplete: () => {
          arrow.style.display = 'none'
        },
        onStart: () => {},
      })
      gsap.to(mobileText, {
        opacity: 0,
        ease: easing,
        duration: duration,
        onComplete: () => {
          mobileText.style.display = 'none'
        },
      })
    } else {
      if (background) {
        gsap.to(background, {
          x: '-40%',
          ease: easing,
          duration: duration,
        })
      }
    }

    gsap.to(close, {
      opacity: 1,
    })
  }

  const slideOut = () => {
    if (!slider) {
      console.error('Slider is not initialized')
      return
    }
    gsap.to(sliderElement, {
      x: sliderOriginalPosition,
      ease: easing,
      duration: duration,
      onStart: () => {
        firstClick = true
      },
      onComplete: () => {
        if (typeof disableWheelControls === 'function') {
          disableWheelControls()
          firstClick = false
          arrow.addEventListener('click', firstArrowClick)
        }
      },
    })

    if (window.innerWidth < 479) {
      gsap.to(arrow, {
        opacity: 1,
        ease: easing,
        duration: duration,
        onStart: () => {
          arrow.style.display = 'flex'
        },
      })
      gsap.to(mobileText, {
        opacity: 1,
        ease: easing,
        duration: duration,
        onStart: () => {
          mobileText.style.display = 'flex'
        },
      })
    } else {
      if (background) {
        gsap.to(background, {
          x: '0%',
          ease: easing,
          duration: duration,
        })
      }
    }

    gsap.to(close, {
      opacity: 0,
    })
  }

  const slideInSlightly = () => {
    gsap.to(sliderElement, {
      x: sliderOriginalPosition - 100,
      ease: 'power2.out',
      duration: 0.5,
    })
  }

  const slideOutSlightly = () => {
    gsap.to(sliderElement, {
      x: sliderOriginalPosition,
      ease: 'power2.out',
      duration: 0.5,
    })
  }

  const removeListeners = () => {
    arrow.removeEventListener('click', slideIn)
    arrow.removeEventListener('mouseenter', slideInSlightly)
    arrow.removeEventListener('mouseleave', slideOutSlightly)
    arrow.removeEventListener('click', firstArrowClick)
  }

  arrow.addEventListener('click', slideIn)
  arrow.addEventListener('mouseenter', slideInSlightly)
  arrow.addEventListener('mouseleave', slideOutSlightly)

  function firstArrowClick() {
    if (firstClick) {
      slider.next()
    }
    firstClick = true
  }

  const addKeenSlider = () => {
    const ArrowButton = () => {
      arrow.addEventListener('click', firstArrowClick)
    }

    const revertSlider = () => {
      document.addEventListener('click', function (event) {
        if (
          event.target !== arrow &&
          !arrow.contains(event.target) &&
          event.target !== sliderElement &&
          !sliderElement.contains(event.target)
        ) {
          slideOut()
          firstClick = false
          arrow.addEventListener('click', slideIn)
          arrow.addEventListener('mouseenter', slideInSlightly)
          arrow.addEventListener('mouseleave', slideOutSlightly)
          slider.moveToIdx(0, false)
        }
      })
    }

    function WheelControls(slider) {
      var touchTimeout
      var position = { x: 0, y: 0 }
      var wheelActive = false

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
        e.preventDefault()
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

      enableWheelControls = () => {
        slider.container.addEventListener('wheel', eventWheel, {
          passive: false,
        })
      }

      disableWheelControls = () => {
        slider.container.removeEventListener('wheel', eventWheel, {
          passive: false,
        })
      }
    }

    slider = new KeenSlider(
      sliderElement,
      {
        loop: false,
        rubberband: false,
        selector: '.story-slide',
        slides: {
          perView: 3.5,
        },
        breakpoints: {
          '(max-width: 768px)': {
            slides: {
              perView: 1.8,
            },
          },
          '(max-width: 479px)': {
            slides: {
              perView: 1,
            },
          },
        },
        dragStarted: function () {
          // This event fires when a drag starts
          // Disable Normalize Scroll to allow for slider interaction
          ScrollTrigger.normalizeScroll(false)
        },
        dragEnded: function () {
          // This event fires when a drag starts
          // Disable Normalize Scroll to allow for slider interaction
          ScrollTrigger.normalizeScroll(true)
        },
      },
      [ArrowButton, revertSlider, WheelControls]
    )
  }
  addKeenSlider()
}
