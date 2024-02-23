import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import { addToCart } from './Animations'

//import { siteWideCartButtons } from './Animations'

export const navSwapping = () => {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.killAll()
  // const featuredProduct = document
  //   .querySelector('[cartitemid]')
  //   ?.getAttribute('cartitemid')

  const exploreTriggers = document.querySelectorAll(
    '[scroll-trigger="explore"]'
  )

  // const exploreRecipesTriggers = document.querySelectorAll(
  //   '[scroll-trigger="explore-recipes"]'
  // )

  const addToCartTriggers = document.querySelectorAll(
    '[scroll-trigger="add-to-cart"]'
  )

  if (exploreTriggers && exploreTriggers.length > 0) {
    exploreTriggers.forEach((element) => {
      // Add a ScrollTrigger for the animation
      setTimeout(() => {
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

  // if (exploreRecipesTriggers && exploreRecipesTriggers.length > 0) {
  //   exploreRecipesTriggers.forEach((element) => {
  //     // Add a ScrollTrigger for the animation
  //     setTimeout(() => {
  //       ScrollTrigger.create({
  //         trigger: element,
  //         start: 'top bottom',
  //         end: 'bottom bottom',

  //         onEnter: () => {
  //           // This code will be executed when the scroll trigger is entered
  //           gsap.to('.middle-button_wrapper .button-text', {
  //             y: (i, el) => {
  //               el.textContent = 'Explore Made 4 U'
  //               el.closest('a').setAttribute('href', '/pages/recipes')
  //               el.closest('a').removeEventListener(
  //                 'click',
  //                 addCartButtonListener
  //               )
  //             },
  //           })
  //         },
  //         onEnterBack: () => {
  //           // This code will be executed when the scroll trigger is entered
  //           gsap.to('.middle-button_wrapper .button-text', {
  //             y: (i, el) => {
  //               el.textContent = 'Explore Made 4 U'
  //               el.closest('a').setAttribute('href', '/pages/recipes')
  //               el.closest('a').removeEventListener(
  //                 'click',
  //                 addCartButtonListener
  //               )
  //             },
  //           })
  //         },
  //       })
  //     }, 1000)
  //   })
  // }

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
          end: 'bottom bottom',

          onEnter: () => {
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
                el.closest('a').removeEventListener(
                  'click',
                  addCartButtonListener
                )
                el.closest('a').addEventListener('click', addCartButtonListener)
                //siteWideCartButtons()
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

export const footerColourSwap = () => {
  ScrollTrigger.killAll()

  setTimeout(() => {
    // Only create a new ScrollTrigger if it doesn't already exist
    if (!footerScrollTrigger) {
      footerScrollTrigger = ScrollTrigger.create({
        trigger: '[scroll-trigger="footer"]',
        start: 'bottom bottom',
        end: 'bottom bottom',

        onEnter: () => {
          setNewColour('.nav', '--colour--black', '#ffffff')
          setNewColour('.nav', '--colour--yellow', '#000000')
          setNewColour('.nav', '--colour--white', '#000000')
        },
        onLeaveBack: () => {
          setNewColour('.nav', '--colour--black', '#000000')
          setNewColour('.nav', '--colour--yellow', '#E6FE52')
          setNewColour('.nav', '--colour--white', '#ffffff')
        },
      })
    }
  }, 100)

  return { setNewColour }
}

export const setNavColourManual = (colour) => {
  if (colour == 'yellow') {
    setNewColour('.nav', '--colour--black', '#000000')
    setNewColour('.nav', '--colour--yellow', '#E6FE52')
    setNewColour('.nav', '--colour--white', '#ffffff')
  } else if (colour == 'black') {
    setNewColour('.nav', '--colour--black', '#ffffff')
    setNewColour('.nav', '--colour--yellow', '#000000')
    setNewColour('.nav', '--colour--white', '#000000')
  } else if (colour == 'red') {
    setNewColour('.nav', '--colour--black', '#000000')
    setNewColour('.nav', '--colour--yellow', '#FF6E65')
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

export const checkIfRedProduct = () => {
  const colour = document.querySelector('[lottie-colour]')
  if (colour?.getAttribute('lottie-colour') == 'red') {
    setNavColourManual('red')
  }
}
