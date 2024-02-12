export const hugeTextScaling = () => {
  function adjustTextSize() {
    const container = document.querySelector('.footer3_heading-wrapper') // Replace '.container' with your container's selector
    const textElement = container.querySelector('.huge-text') // Replace '.text' with your text element's selector

    let desiredWidth = container.offsetWidth - 60 // Get the container's current width
    console.log(container)
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
  //adjustTextSize()
  // // Run the function when the document is fully loaded
  // document.addEventListener('DOMContentLoaded', adjustTextSize)

  // Optionally, adjust text size on window resize
  window.addEventListener('resize', adjustTextSize)
}

export const shareRecipe = () => {
  // Select all elements with the class 'share-icon_link'
  const shareButtons = document.querySelectorAll('.share-icon_link')

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
        alert(
          'Sharing is not supported in your browser. Please copy the URL manually.'
        )
      }
    })
  })
}
