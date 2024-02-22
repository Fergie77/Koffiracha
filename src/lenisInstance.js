import Lenis from '@studio-freight/lenis'

// Function to conditionally initialize Lenis
function createLenis() {
  if (window.innerWidth >= 993) {
    return new Lenis({ lerp: 0.2 })
  }
  return null
}

export { createLenis }
