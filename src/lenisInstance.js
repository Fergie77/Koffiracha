import Lenis from '@studio-freight/lenis'

// Function to conditionally initialize Lenis
function createLenis() {
  if (window.innerWidth >= 993) {
    return new Lenis({ lerp: 0.2 })
  }
  return null
}

// Initialize Lenis instance
const lenis = createLenis()

// Function to stop Lenis
function stopLenis() {
  if (lenis) {
    console.log(lenis)
    lenis.stop()
    console.log(lenis)
  }
}

// Function to start Lenis
function startLenis() {
  if (lenis) {
    lenis.start()
  }
}

export { createLenis, stopLenis, startLenis }
