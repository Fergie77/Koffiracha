import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { addToCart } from './Animations'

export const navSwapping = () => {
  const exploreTriggers = document.querySelectorAll(
    '[scroll-trigger="explore"]'
  )

  const addToCartTriggers = document.querySelectorAll(
    '[scroll-trigger="add-to-cart"]'
  )

  if (exploreTriggers && exploreTriggers.length > 0) {
    exploreTriggers.forEach((element) => {
      // Add a ScrollTrigger for the animation
      setTimeout(() => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top bottom-=200px',
          end: 'bottom bottom',

          onEnter: () => {
            // This code will be executed when the scroll trigger is entered
            gsap.to('.middle-button_wrapper .button-text', {
              y: (i, el) => {
                el.textContent = 'Explore Sauces'
                el.closest('a').setAttribute('href', '/pages/shop')
                el.closest('a').removeAttribute('cartitemid')
                el.closest('a').removeEventListener(
                  'click',
                  addCartButtonListener
                )
              },
            })
          },
          onEnterBack: () => {
            // This code will be executed when the scroll trigger is entered
            gsap.to('.middle-button_wrapper .button-text', {
              y: (i, el) => {
                el.textContent = 'Explore Sauces'
                el.closest('a').setAttribute('href', '/pages/shop')
                el.closest('a').removeAttribute('cartitemid')
                el.closest('a').removeEventListener(
                  'click',
                  addCartButtonListener
                )
              },
            })
          },
        })
      }, 1000)
    })
  }

  const addCartButtonListener = (e) => {
    const productID = e.currentTarget.attributes.cartitemid.value
    addToCart(productID, 1, true) // Replace with dynamic variantId and quantity as needed
  }

  if (addToCartTriggers && addToCartTriggers.length > 0) {
    addToCartTriggers.forEach((element) => {
      const productID = element
        .querySelector('.product-id-code')
        .getAttribute('featuredcartitemid')

      // Add a ScrollTrigger for the animation
      setTimeout(() => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top bottom',
          end: 'bottom bottom-=200px',
          onEnter: () => {
            // This code will be executed when the scroll trigger is entered
            //changes cart colour based on product
            /*
            if (productID == '40011779866688') {
              setNavColourManual('red')
            } else {
              setNavColourManual('yellow')
            }
            */

            gsap.to('.middle-button_wrapper .button-text', {
              y: (i, el) => {
                el.textContent = 'Add to Cart'
                el.closest('a').setAttribute('cartitemid', productID)
                el.closest('a').setAttribute('href', '#')
                el.closest('a').removeEventListener(
                  'click',
                  addCartButtonListener
                )
                el.closest('a').addEventListener('click', addCartButtonListener)
              },
            })
          },
          onEnterBack: () => {
            //changes cart colour based on product
            /*
            if (productID == '40011779866688') {
              setNavColourManual('red')
            } else {
              setNavColourManual('yellow')
            }
            */
            // This code will be executed when the scroll trigger is entered
            gsap.to('.middle-button_wrapper .button-text', {
              y: (i, el) => {
                el.textContent = 'Add to Cart'
                el.closest('a').setAttribute('cartitemid', productID)
                el.closest('a').setAttribute('href', '#')
                el.closest('a').removeEventListener(
                  'click',
                  addCartButtonListener
                )
                el.closest('a').addEventListener('click', addCartButtonListener)
              },
            })
          },
        })
      }, 1000)
    })
  }
}

let footerScrollTrigger = null

function setNewColour(parentSelector, var1, var2) {
  // Select the parent element
  const parentElement = document.querySelector(parentSelector)
  parentElement.style.setProperty(var1, var2)
}

export const footerColourSwap = (container) => {
  setTimeout(() => {
    const trigger = container.querySelector('[scroll-trigger="footer"]')

    ScrollTrigger.create({
      trigger: trigger,
      start: 'bottom bottom',
      end: 'bottom bottom',

      onEnter: () => {
        setNewColour('.nav', '--colour--black', '#ffffff')
        setNewColour('.nav', '--colour--yellow', '#000000')
        setNewColour('.nav', '--colour--white', '#000000')
      },
      onLeaveBack: () => {
        setNavColourManual(previousNavColour)
      },
    })
  }, 3000)
  return { setNewColour }
}

var previousNavColour

export const setNavColourManual = (colour) => {
  previousNavColour = 'yellow'
  if (colour == 'yellow') {
    setNewColour('.nav', '--colour--black', '#000000')
    setNewColour('.nav', '--colour--yellow', '#E6FE52')
    setNewColour('.nav', '--colour--white', '#ffffff')
    previousNavColour = 'yellow'
  } else if (colour == 'black') {
    setNewColour('.nav', '--colour--black', '#ffffff')
    setNewColour('.nav', '--colour--yellow', '#000000')
    setNewColour('.nav', '--colour--white', '#000000')
    previousNavColour = 'black'
  } else if (colour == 'red') {
    setNewColour('.nav', '--colour--black', '#000000')
    setNewColour('.nav', '--colour--yellow', '#FF6E65')
    setNewColour('.nav', '--colour--white', '#ffffff')
    previousNavColour = 'red'
  }
}

// Function to disable the ScrollTrigger
export const disableFooterColourSwap = () => {
  if (footerScrollTrigger) {
    // Optionally, you can also kill the trigger if you don't plan to re-enable it later
    footerScrollTrigger.kill()
    footerScrollTrigger = null
  }
}

export const checkIfRedProduct = () => {
  const colour = document.querySelector('[lottie-colour]')
  if (colour?.getAttribute('lottie-colour') == 'red') {
    setNavColourManual('red')
  }
}
