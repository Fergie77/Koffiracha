import { gsap } from 'gsap'

export const announcementAnimation = () => {
  const wrapper = document.querySelector('.announcement-bar_wrapper')
  const boxes = wrapper?.querySelectorAll('.announcement-bar_text')

  if (boxes) {
    gsap.to(boxes, {
      xPercent: -103.5,
      duration: 5,
      ease: 'none',
      repeat: -1,
    })
  }
}
