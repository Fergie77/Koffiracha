import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export const navSwapping = () => {
  gsap.registerPlugin(ScrollTrigger)

  // Add a ScrollTrigger for the animation
  ScrollTrigger.create({
    trigger: '[scroll-trigger="buy-now"]',
    start: 'top bottom',
    end: 'bottom bottom',
    onEnter: () => {
      // This code will be executed when the scroll trigger is entered
      gsap.to('.middle-button_wrapper .button-text', {
        y: (i, el) => {
          el.textContent = 'Buy Now'
        },
      })
    },
    onLeave: () => {
      // This code will be executed when the scroll trigger is entered
      gsap.to('.middle-button_wrapper .button-text', {
        y: (i, el) => {
          el.textContent = 'Explore the sauce'
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
        },
      })
    },
    onLeave: () => {
      // This code will be executed when the scroll trigger is entered
      gsap.to('.middle-button_wrapper .button-text', {
        y: (i, el) => {
          el.textContent = 'Explore the sauce'
        },
      })
    },
  })
}
