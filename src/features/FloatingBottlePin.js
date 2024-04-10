import '@lottiefiles/lottie-player'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import lottie from 'lottie-web'

gsap.registerPlugin(ScrollTrigger)

export const floatingBottlePinAnimation = () => {
  //const player = document.querySelector('lottie-player')
  const player2 = document.querySelector('.new-bottle-origin')
  //const totalFrames = 300 // Assuming 300 is the total frame count of your Lottie animation

  LottieScrollTrigger({
    target: player2,
    path: 'https://uploads-ssl.webflow.com/6571a5766b38a3291e605413/66169644cad74b6ff5213724_KoffirachaTest.json',
    speed: 'medium',
    scrub: 1, // seconds it takes for the playhead to "catch up"
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See /docs/v3/Plugins/ScrollTrigger
  })

  function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      //speeds = { slow: '+=2000', medium: '+=1000', fast: '+=500' },
      st = {
        trigger: target,
        pin: true,
        markers: true,
        start: 'top top',
        //end: speeds[vars.speed] || '+=1000',
        end: () => `bottom +=${player2.offsetHeight}`,
        endTrigger: '.floating-bottle-section_wrapper',
        scrub: 1,
      },
      ctx = gsap.context && gsap.context(),
      animation = lottie.loadAnimation({
        container: target,
        renderer: vars.renderer || 'svg',
        loop: false,
        autoplay: false,
        path: vars.path,
        rendererSettings: vars.rendererSettings || {
          preserveAspectRatio: 'xMidYMid slice',
        },
      })
    for (let p in vars) {
      // let users override the ScrollTrigger defaults
      st[p] = vars[p]
    }
    animation.addEventListener('DOMLoaded', function () {
      let createTween = function () {
        animation.frameTween = gsap.to(playhead, {
          frame: animation.totalFrames - 1,
          ease: 'none',
          onUpdate: () => animation.goToAndStop(playhead.frame, true),
          scrollTrigger: st,
        })
        return () => animation.destroy && animation.destroy()
      }
      ctx && ctx.add ? ctx.add(createTween) : createTween()
      // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })
    return animation
  }

  // gsap.to(
  //   {},
  //   {
  //     // An empty object since we're just using this to leverage the onUpdate
  //     scrollTrigger: {
  //       trigger: player,
  //       endTrigger: '.floating-bottle-section_wrapper',
  //       start: 'top 10%',
  //       end: () => `bottom 20%+=${player.offsetHeight}`,
  //       scrub: true, // Set to true or increase the number for more smoothing
  //       pin: player,
  //       invalidateOnRefresh: true,
  //       markers: true,
  //       onUpdate: (self) => {
  //         // Calculate progress based on the scrollTrigger's progress
  //         const progress = self.progress
  //         // Smoothly interpolate the frame index based on the animation progress
  //         const frameIndex = Math.floor(
  //           gsap.utils.interpolate(0, totalFrames - 1, progress)
  //         )
  //         player.seek(frameIndex)
  //       },
  //     },
  //   }
  // )
}
