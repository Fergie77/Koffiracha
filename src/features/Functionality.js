import { gsap } from 'gsap'

import { closeNavFunction } from './Animations'

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
        alert('URL copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy URL:', err)
        alert('Failed to copy URL. Please try again.')
      })
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  // Function to generate the recipe page URL
  function generateRecipePageUrl() {
    // Define the base URL for the recipe page
    const recipeBaseUrl = 'https://koffiracha.com/pages/recipes'
    // Extract the recipe name from the current URL
    const recipeName = window.location.href.split('modalToOpen=')[1]
    // Construct the recipe page URL
    return `${recipeBaseUrl}?modalToOpen=${recipeName}`
  }

  // Add a click event listener to each button
  shareButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Generate the URL for the recipe page
      const recipePageUrl = generateRecipePageUrl()
      const recipeName = window.location.href.split('modalToOpen=')[1]
      const formattedRecipeName = toTitleCase(recipeName.split('-').join(' '))
      if (navigator.share) {
        navigator
          .share({
            //title: document.title,
            title: formattedRecipeName + ' - Koffiracha Hot Sauce',
            url: recipePageUrl,
          })
          .then(() => {
            console.log('Thanks for sharing!')
          })
          .catch((error) => {
            console.error('Error sharing:', error)
          })
      } else {
        // Use the generated recipe page URL as the fallback
        copyUrlToClipboard(recipePageUrl)
      }
    })
  })
}

// Define a flag to keep track of whether scrolling is enabled or not
let isScrollingEnabled = true

export const stopScrolling = () => {
  removeTouchAction()
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
  addTouchAction()
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

const removeTouchAction = () => {
  const bodyElement = document.querySelector('.page-wrapper')
  const htmlElement = document.querySelector('html')
  bodyElement.setAttribute('style', 'overflow: hidden; height: 100vh')
  htmlElement.setAttribute('style', 'scroll-behavior: auto;')
}

const addTouchAction = () => {
  const bodyElement = document.querySelector('.page-wrapper')
  const htmlElement = document.querySelector('html')
  bodyElement.setAttribute('style', '')
  htmlElement.setAttribute('style', 'scroll-behavior: auto;')
}

export const hideNav = (hideOrShow) => {
  const nav = document.querySelector('.nav')

  gsap.to(nav, {
    y: hideOrShow ? '200%' : '0%',
    ease: 'power2.Out',
  })
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
      console.log(element.querySelector('iframe'))
      const iframe = element.querySelector('iframe')
      const hideButton = () => {
        iframe.style.display = 'none'
      }

      async function getIframeContent() {
        const iframe = document.querySelector('.chat-button')
        // Wait for iframe to load
        await new Promise((resolve) => iframe.addEventListener('load', resolve))

        try {
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow.document
          //const elementInside = iframeDocument.querySelector('.some-element');
          console.log(iframeDocument)
        } catch (error) {
          console.error(
            'Cannot access iframe content - possible cross-origin restriction'
          )
        }
      }

      getIframeContent()

      iframe.addEventListener('load', () => {
        setTimeout(() => {
          const button =
            iframe.contentDocument.querySelector('#mountHere').firstChild
              .firstChild
          const iframeDocument =
            iframe.contentDocument || iframe.contentWindow.document
          console.log(iframeDocument)
          pseudoChatButton.addEventListener('click', () => {
            // let button2 = null
            // setTimeout(() => {
            //   const iframe2 = node.children[1]
            //   button2 = iframe2.contentDocument
            //     .querySelector('#mountHere')
            //     .querySelector('.message-window-iframe-xaqbo8')
            //   button2.parentElement.addEventListener('touchstart', hideButton)
            // }, 500)
            button.click()
            iframe.style.display = 'block'

            button?.addEventListener('click', hideButton)
            closeNavFunction()
          })
        }, 1000)

        iframe.style.display = 'none'
        childObserver.disconnect()
      })
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            // Check if the added node is an element (optional: check for specific child ID or class)
            if (node.nodeType === Node.ELEMENT_NODE) {
              // const iframe = node.children[0]
              // const hideButton = () => {
              //   iframe.style.display = 'none'
              // }
              // iframe.addEventListener('load', () => {
              //   setTimeout(() => {
              //     const button =
              //       iframe.contentDocument.querySelector('#mountHere')
              //         .firstChild.firstChild
              //     pseudoChatButton.addEventListener('click', () => {
              //       let button2 = null
              //       setTimeout(() => {
              //         const iframe2 = node.children[1]
              //         button2 = iframe2.contentDocument
              //           .querySelector('#mountHere')
              //           .querySelector('.message-window-iframe-xaqbo8')
              //         // button2.parentElement.addEventListener(
              //         //   'click',
              //         //   hideButton
              //         // )
              //         button2.parentElement.addEventListener(
              //           'touchstart',
              //           hideButton
              //         )
              //       }, 500)
              //       button.click()
              //       iframe.style.display = 'block'
              //       button?.addEventListener('click', hideButton)
              //       closeNavFunction()
              //     })
              //   }, 1000)
              //   iframe.style.display = 'none'
              //   childObserver.disconnect()
              // })
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

export const chatButton2 = () => {
  // Wait for the DOM content to be fully loaded
  // Access the iframe by its ID
  var iframe = document.getElementById('chat-button')

  // Make sure the iframe is fully loaded

  var iframeDocument = iframe.contentDocument || iframe.contentWindow.document

  // Access the button by its data-testid attribute or class
  var button = iframeDocument.querySelector(
    'button[data-testid="gorgias-chat-messenger-button"]'
  )

  // Check if the button exists
  if (button) {
    // Create an observer instance to monitor attribute changes
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'aria-expanded'
        ) {
          var expanded = button.getAttribute('aria-expanded')
          const secondButton = document.querySelector('#chat-button')
          if (!expanded) {
            button.style.display = 'none'
            secondButton.setAttribute('style', 'display= "none";')
            secondButton.style.display = 'none'
          } else {
            button.style.display = 'inline-flex'
            var x = window.matchMedia('(max-width: 768px)')
            if (x.matches) {
              secondButton.setAttribute('style', 'display= "none";')
              secondButton.style.display = 'none'
            }
          }
          // You can add additional code here to handle the change
        }
      })
    })

    // Configuration of the observer:
    var config = { attributes: true, attributeFilter: ['aria-expanded'] }

    // Start observing the target node for configured mutations
    observer.observe(button, config)
  } else {
    console.error('Button not found in iframe!')
  }
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
