import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { addToCart } from './Animations'

//import { siteWideCartButtons } from './Animations'

export const navSwapping = () => {
  gsap.registerPlugin(ScrollTrigger)

  // const featuredProduct = document
  //   .querySelector('[cartitemid]')
  //   ?.getAttribute('cartitemid')

  const exploreTriggers = document.querySelectorAll(
    '[scroll-trigger="explore"]'
  )

  const addToCartTriggers = document.querySelectorAll(
    '[scroll-trigger="add-to-cart"]'
  )

  exploreTriggers.forEach((element) => {
    // Add a ScrollTrigger for the animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom bottom',

      onEnter: () => {
        // This code will be executed when the scroll trigger is entered
        gsap.to('.middle-button_wrapper .button-text', {
          y: (i, el) => {
            el.textContent = 'Explore Sauces'
            el.closest('a').setAttribute('href', '/pages/shop')
            el.closest('a').removeEventListener('click', addCartButtonListener)
          },
        })
      },
      onEnterBack: () => {
        // This code will be executed when the scroll trigger is entered
        gsap.to('.middle-button_wrapper .button-text', {
          y: (i, el) => {
            el.textContent = 'Explore Sauces'
            el.closest('a').setAttribute('href', '/pages/shop')
            el.closest('a').removeEventListener('click', addCartButtonListener)
          },
        })
      },
    })
  })

  const addCartButtonListener = (e) => {
    const productID = e.currentTarget.attributes.cartitemid.value
    addToCart(productID, 1, true) // Replace with dynamic variantId and quantity as needed
  }

  addToCartTriggers.forEach((element) => {
    const productID = element
      .querySelector('.product-id-code')
      .getAttribute('featuredcartitemid')

    // Add a ScrollTrigger for the animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom bottom',

      onEnter: () => {
        // This code will be executed when the scroll trigger is entered
        gsap.to('.middle-button_wrapper .button-text', {
          y: (i, el) => {
            el.textContent = 'Add to Cart'
            el.closest('a').setAttribute('cartitemid', productID)
            el.closest('a').setAttribute('href', '#')
            el.closest('a').removeEventListener('click', addCartButtonListener)
            el.closest('a').addEventListener('click', addCartButtonListener)
            //siteWideCartButtons()
          },
        })
      },
      onEnterBack: () => {
        // This code will be executed when the scroll trigger is entered
        gsap.to('.middle-button_wrapper .button-text', {
          y: (i, el) => {
            el.textContent = 'Add to Cart'
            el.closest('a').setAttribute('cartitemid', productID)
            el.closest('a').setAttribute('href', '#')
            el.closest('a').removeEventListener('click', addCartButtonListener)
            el.closest('a').addEventListener('click', addCartButtonListener)
            //siteWideCartButtons()
          },
        })
      },
    })
  })
}

let footerScrollTrigger = null

export const footerColourSwap = () => {
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

  // Only create a new ScrollTrigger if it doesn't already exist
  if (!footerScrollTrigger) {
    footerScrollTrigger = ScrollTrigger.create({
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
}

// Function to disable the ScrollTrigger
export const disableFooterColourSwap = () => {
  if (footerScrollTrigger) {
    //footerScrollTrigger.disable();
    // Optionally, you can also kill the trigger if you don't plan to re-enable it later
    footerScrollTrigger.kill()
    footerScrollTrigger = null
  }
}
