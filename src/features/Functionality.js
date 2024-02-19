import { closeNavFunction } from './Animations'

export const hugeTextScaling = () => {
  function adjustTextSize() {
    const container = document.querySelector('.footer3_heading-wrapper') // Replace '.container' with your container's selector
    const textElement = container.querySelector('.huge-text') // Replace '.text' with your text element's selector

    let desiredWidth = container.offsetWidth - 60 // Get the container's current width
    let currentFontSize = parseInt(
      window.getComputedStyle(textElement, null).getPropertyValue('font-size'),
      10
    )
    textElement.style.fontSize = currentFontSize + 'px' // Set initial font size

    // Function to estimate the width of the text element
    function getTextWidth(text, font) {
      // Create a temporary canvas to measure text width
      let canvas =
        getTextWidth.canvas ||
        (getTextWidth.canvas = document.createElement('canvas'))
      let context = canvas.getContext('2d')
      context.font = font
      let metrics = context.measureText(text)
      return metrics.width
    }

    let currentTextWidth = getTextWidth(
      textElement.textContent,
      currentFontSize +
        'px ' +
        window
          .getComputedStyle(textElement, null)
          .getPropertyValue('font-family')
    )

    // Adjust the font size until the text width is just less than or equal to the desired width
    while (currentTextWidth < desiredWidth && currentFontSize < 1000) {
      // Prevents infinite loops
      currentFontSize++
      textElement.style.fontSize = currentFontSize + 'px'
      currentTextWidth = getTextWidth(
        textElement.textContent,
        currentFontSize +
          'px ' +
          window
            .getComputedStyle(textElement, null)
            .getPropertyValue('font-family')
      )
    }

    // Optionally, decrease font size if it's too wide
    while (currentTextWidth > desiredWidth) {
      currentFontSize--
      textElement.style.fontSize = currentFontSize + 'px'
      currentTextWidth = getTextWidth(
        textElement.textContent,
        currentFontSize +
          'px ' +
          window
            .getComputedStyle(textElement, null)
            .getPropertyValue('font-family')
      )
    }
  }
  adjustTextSize()
  // // Run the function when the document is fully loaded
  // document.addEventListener('DOMContentLoaded', adjustTextSize)

  // Optionally, adjust text size on window resize
  window.addEventListener('resize', adjustTextSize)
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

export const stopScrolling = () => {
  //Disable scrolling
  document.body.style.overflow = 'hidden'
}

export const enableScrolling = () => {
  // Enable scrolling
  document.body.style.overflow = '' // or '' to revert to the default
  // Use lenis as needed
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
