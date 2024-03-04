import { closeNavFunction } from './Animations'

// export const hugeTextScaling = () => {
//   function adjustTextSize() {
//     const container = document.querySelector('.footer3_heading-wrapper') // Replace '.container' with your container's selector
//     const textElement = container.querySelector('.huge-text') // Replace '.text' with your text element's selector

//     let desiredWidth = container.offsetWidth - 60 // Get the container's current width
//     let currentFontSize = parseInt(
//       window.getComputedStyle(textElement, null).getPropertyValue('font-size'),
//       10
//     )
//     textElement.style.fontSize = currentFontSize + 'px' // Set initial font size

//     // Function to estimate the width of the text element
//     function getTextWidth(text, font) {
//       // Create a temporary canvas to measure text width
//       let canvas =
//         getTextWidth.canvas ||
//         (getTextWidth.canvas = document.createElement('canvas'))
//       let context = canvas.getContext('2d')
//       context.font = font
//       let metrics = context.measureText(text)
//       return metrics.width
//     }

//     let currentTextWidth = getTextWidth(
//       textElement.textContent,
//       currentFontSize +
//         'px ' +
//         window
//           .getComputedStyle(textElement, null)
//           .getPropertyValue('font-family')
//     )

//     // Adjust the font size until the text width is just less than or equal to the desired width
//     while (currentTextWidth < desiredWidth && currentFontSize < 1000) {
//       // Prevents infinite loops
//       currentFontSize++
//       textElement.style.fontSize = currentFontSize + 'px'
//       currentTextWidth = getTextWidth(
//         textElement.textContent,
//         currentFontSize +
//           'px ' +
//           window
//             .getComputedStyle(textElement, null)
//             .getPropertyValue('font-family')
//       )
//     }

//     // Optionally, decrease font size if it's too wide
//     while (currentTextWidth > desiredWidth) {
//       currentFontSize--
//       textElement.style.fontSize = currentFontSize + 'px'
//       currentTextWidth = getTextWidth(
//         textElement.textContent,
//         currentFontSize +
//           'px ' +
//           window
//             .getComputedStyle(textElement, null)
//             .getPropertyValue('font-family')
//       )
//     }
//   }
//   adjustTextSize()
//   // // Run the function when the document is fully loaded
//   // document.addEventListener('DOMContentLoaded', adjustTextSize)

//   // Optionally, adjust text size on window resize
//   window.addEventListener('resize', adjustTextSize)
// }

export const hugeTextScaling = () => {
  var title = document.querySelector('#footer-header')

  var titleText = title.innerHTML

  title.style.fontSize = 10.625 / (titleText.length / 5) + 'rem'

  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      title.style.fontSize =
        title.parentElement.clientWidth /
          68.4978902954 /
          (titleText.length / 5) +
        'rem'
    } else {
      title.style.fontSize =
        title.parentElement.clientWidth /
          47.4978902954 /
          (titleText.length / 5) +
        'rem'
    }
  }

  var x = window.matchMedia('(max-width: 600px)')
  myFunction(x) // Call listener function at run time
  window.addEventListener('resize', myFunction) // Attach listener function on state changes
}

export const shareRecipe = () => {
  // Select all elements with the class 'share-icon_link'
  const shareButtons = document.querySelectorAll('.share-icon_link')

  // Function to copy URL to clipboard
  function copyUrlToClipboard(url) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('URL copied to clipboard successfully!')
        alert('URL copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy URL:', err)
        alert('Failed to copy URL. Please try again.')
      })
  }

  // Add a click event listener to each button
  shareButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (navigator.share) {
        navigator
          .share({
            title: document.title,
            url: window.location.href,
          })
          .then(() => {
            console.log('Thanks for sharing!')
          })
          .catch((error) => {
            console.error('Error sharing:', error)
          })
      } else {
        // Fallback to copying the URL if sharing isn't supported
        copyUrlToClipboard(window.location.href)
      }
    })
  })
}

// Define a flag to keep track of whether scrolling is enabled or not
let isScrollingEnabled = true

export const stopScrolling = () => {
  // Check if the screen width is greater than 479px
  if (window.innerWidth > 479 && isScrollingEnabled) {
    // Disable scrolling by setting overflow hidden
    document.body.style.overflow = 'hidden'

    // Prevent touchmove event for mobile devices
    document.addEventListener('touchmove', preventScroll, { passive: false })

    isScrollingEnabled = false
  }
}

export const enableScrolling = () => {
  // Check if the screen width is greater than 479px
  if (window.innerWidth > 479 && !isScrollingEnabled) {
    // Enable scrolling by resetting overflow
    document.body.style.overflow = ''

    // Remove the event listener to re-enable touch scrolling on mobile
    document.removeEventListener('touchmove', preventScroll, { passive: false })

    isScrollingEnabled = true
  }
}

// Helper function to prevent scrolling on touch devices
function preventScroll(e) {
  e.preventDefault()
}

export const appendUrl = (modal, removeExistingParams = false) => {
  // Step 1: Get the current URL
  const currentUrl = window.location.href

  // Step 2: Create a URL object
  const url = new URL(currentUrl)

  // Step 3: Conditionally remove existing query parameters
  if (removeExistingParams) {
    // This clears all existing query parameters
    const searchParams = new URLSearchParams()
    if (modal) {
      // Add back the specific parameter if modal is provided
      searchParams.set('modalToOpen', modal)
    }
    url.search = searchParams.toString()
  } else {
    // This will add a new parameter or update the value if it already exists
    url.searchParams.set('modalToOpen', modal)
  }

  // Step 4: Update the browser's URL without reloading the page
  history.pushState({}, '', url)

  // If you want to reload the page with the new URL, you could use:
  // window.location.href = url;
}

export const openChat = () => {
  const pseudoChatButton = document.querySelector('[element=chat-button]')

  // Function to be called when the specific element is added
  function onElementAdded(element) {
    // Monitor this element for additions of child elements
    observeChildAdditions(element)
  }

  // Function to observe child additions to the gorgias-chat-container
  function observeChildAdditions(element) {
    const childObserver = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            // Check if the added node is an element (optional: check for specific child ID or class)
            if (node.nodeType === Node.ELEMENT_NODE) {
              const iframe = node.children[0]

              const hideButton = () => {
                iframe.style.display = 'none'
              }

              iframe.addEventListener('load', () => {
                setTimeout(() => {
                  const button =
                    iframe.contentDocument.querySelector('#mountHere')
                      .firstChild.firstChild

                  pseudoChatButton.addEventListener('click', () => {
                    button.click()
                    iframe.style.display = 'block'
                    button.addEventListener('click', hideButton)
                    closeNavFunction()
                  })
                }, 1000)

                iframe.style.display = 'none'
                childObserver.disconnect()
              })

              // Execute any code in response to the child element addition here
            }
          })
        }
      }
    })

    // Start observing the element for child additions
    childObserver.observe(element, {
      childList: true, // Observe direct children additions
      // Optionally, observe subtree for all descendants
      // subtree: true,
    })

    // Remember to eventually disconnect the observer to avoid memory leaks
    // childObserver.disconnect();
  }

  // Create an observer instance linked to a callback function
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is the element we're looking for
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.id === 'gorgias-chat-container'
          ) {
            onElementAdded(node)
            // Optional: disconnect the main observer if you only need to track the first addition
            observer.disconnect()
          }
        })
      }
    }
  })

  // Start observing the document body for configured mutations
  observer.observe(document.body, {
    childList: true, // Observe direct children additions/removals
    subtree: true, // Observe all descendants
  })

  // You can place observer.disconnect() where appropriate to stop observing when no longer needed

  setTimeout(() => {}, 1000)
}

export const recipeFilters = () => {
  const cards = document.querySelectorAll('.gallery3_card-link')

  let filters = [{ text: 'All' }] // Initialize filters as an array with an object for 'All'

  cards.forEach((element) => {
    let cardFilter = Array.from(
      element.querySelector('.filters_wrapper').childNodes
    ).slice(1) // This skips the first child node

    cardFilter.forEach((childElement) => {
      const textContent = childElement.textContent.trim()
      // Check if the object already exists in the array
      const isDuplicate = filters.find((filter) => filter.text === textContent)
      // If the object does not exist, push it into the array
      if (!isDuplicate) {
        filters.push({ text: textContent })
      }
    })
  })

  // Get the select element by its ID
  const selectField = document.getElementById('field')

  // Clear existing options in the select field
  selectField.innerHTML = ''

  filters.forEach((filter) => {
    const option = document.createElement('option')
    option.textContent = filter.text
    option.value = filter.text
    selectField.appendChild(option)
  })
}

export const setCheckout = () => {
  const checkoutButton = document.querySelector('#checkout-button')
  checkoutButton.setAttribute('href', '/checkout')
}

// export const cookieClassSwap = () => {
//   const acceptButton = document.querySelector('#shopify-pc__banner__btn-accept')
//   const declineButton = document.querySelector(
//     '#shopify-pc__banner__btn-decline'
//   )

//   const dialogueWrapperButtons = document.querySelectorAll(
//     '.shopify-pc__banner__dialog button'
//   )
//   const managePrefs = document.querySelector(
//     '.shopify-pc__banner__btn-manage-prefs'
//   )
//   const cookieBanner = document.querySelector('.shopify-pc__banner')
//   cookieBanner.style.fontSize = '16px'
//   managePrefs.addEventListener('click', () => {
//     const dialogueWrapper = document.querySelector('.shopify-pc__prefs')
//     const inputs = document.querySelector(
//       '.shopify-pc__prefs__options'
//     ).childNodes

//     dialogueWrapper.style.fontSize = '16px'
//     inputs.forEach((element) => {
//       element.querySelectorAll('span').forEach((element) => {
//         element.style.width = '15px'
//         element.style.height = '15px'
//       })
//     })
//   })

//   dialogueWrapperButtons.forEach((element) => {
//     element.style.borderRadius = '18px'
//     element.style.lineHeight = '1'
//   })

//   acceptButton.classList.remove('shopify-pc__banner__btn-accept')

//   acceptButton.classList.add('skinny-button')
//   acceptButton.classList.add('is-yellow')
//   declineButton.classList.add('skinny-button')
//   declineButton.classList.add('is-outlined')
// }

export const cookieLinkSetter = () => {
  // Select the link by its ID
  var link = document.getElementById('cookies-link')

  // Check if the link exists to prevent errors
  if (link) {
    // Remove '/#' from the href, if it exists
    var hrefWithoutHash = link.href.replace('/#', '')

    // Ensure there's no trailing '/' before appending the parameter
    if (hrefWithoutHash.endsWith('/')) {
      hrefWithoutHash = hrefWithoutHash.slice(0, -1)
    }

    // Now append your parameter
    // Check if the modified URL already has parameters
    if (hrefWithoutHash.includes('?')) {
      // If there are already parameters, append the new one with an '&'
      hrefWithoutHash += '&tinycookie-preview'
    } else {
      // If there are no parameters, start the query string with '?'
      hrefWithoutHash += '?tinycookie-preview'
    }

    // Update the link's href attribute
    link.href = hrefWithoutHash
  }
}
