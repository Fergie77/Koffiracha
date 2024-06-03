import { gsap } from 'gsap'

export const announcementAnimation = () => {
  const wrapper = document.querySelector('.announcement-bar_wrapper')
  const boxes = wrapper?.querySelectorAll('.announcement-bar_text')

  if (boxes) {
    const screenSize = window.matchMedia('(max-width: 460px)')

    if (screenSize.matches) {
      gsap.to(boxes, {
        xPercent: -105,
        duration: 5,
        ease: 'none',
        repeat: -1,
      })
    } else {
      gsap.to(boxes, {
        xPercent: -103.5,
        duration: 5,
        ease: 'none',
        repeat: -1,
      })
    }
  }
}
