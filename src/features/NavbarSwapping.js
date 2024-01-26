import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

//import { siteWideCartButtons } from './Animations'

export const navSwapping = () => {
  gsap.registerPlugin(ScrollTrigger)

  const featuredProduct = document
    .querySelector('[cartitemid]')
    ?.getAttribute('cartitemid')

  // Add a ScrollTrigger for the animation
  ScrollTrigger.create({
    trigger: '[scroll-trigger="buy-now"]',
    start: 'top bottom',
    end: 'bottom bottom',
    markers: true,
    onEnter: () => {
      // This code will be executed when the scroll trigger is entered
      gsap.to('.middle-button_wrapper .button-text', {
        y: (i, el) => {
          el.textContent = 'Buy Now'
        },
      })
    },
    onEnterBack: () => {
      // This code will be executed when the scroll trigger is entered
      gsap.to('.middle-button_wrapper .button-text', {
        y: (i, el) => {
          el.textContent = 'Buy Now'
        },
      })
    },
  })

  // Add a ScrollTrigger for the animation
  ScrollTrigger.create({
    trigger: '[scroll-trigger="add-to-cart"]',
    start: 'top bottom',
    end: 'bottom bottom',
    onEnter: () => {
      // This code will be executed when the scroll trigger is entered
      gsap.to('.middle-button_wrapper .button-text', {
        y: (i, el) => {
          el.textContent = 'Add to Cart'
          el.closest('a').setAttribute('cartitemid', featuredProduct)
          //siteWideCartButtons()
        },
      })
    },
    onEnterBack: () => {
      // This code will be executed when the scroll trigger is entered
      gsap.to('.middle-button_wrapper .button-text', {
        y: (i, el) => {
          el.textContent = 'Add to Cart'
          el.closest('a').setAttribute('cartitemid', featuredProduct)
          //siteWideCartButtons()
        },
      })
    },
  })

  // Function to swap the values of two CSS variables for a specific element
  function swapCSSVariables(parentSelector, var1, var2) {
    // Select the parent element
    const parentElement = document.querySelector(parentSelector)

    // Check if parent element exists
    if (!parentElement) {
      console.error('Parent element not found')
      return
    }

    // Retrieve the current values of the CSS variables from the parent element
    const style = getComputedStyle(parentElement)
    const var1Value = style.getPropertyValue(var1).trim()
    const var2Value = style.getPropertyValue(var2).trim()

    // Swap the CSS variable values on the parent element
    parentElement.style.setProperty(var1, var2Value)
    parentElement.style.setProperty(var2, var1Value)
  }

  // Add a ScrollTrigger for the animation
  ScrollTrigger.create({
    trigger: '[scroll-trigger="footer"]',
    start: 'bottom bottom',
    end: 'bottom bottom',
    onEnter: () => {
      swapCSSVariables('.nav', '--colour--black', '--colour--yellow')
    },
    onLeaveBack: () => {
      swapCSSVariables('.nav', '--colour--black', '--colour--yellow')
    },
  })
}
