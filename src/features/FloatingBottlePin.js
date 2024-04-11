import '@lottiefiles/lottie-player'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import lottie from 'lottie-web'

gsap.registerPlugin(ScrollTrigger)

export const floatingBottlePinAnimation = () => {
  //const player = document.querySelector('lottie-player')
  const player2 = document.querySelector('.new-bottle-origin')
  const playerWrapper = document.querySelector('.new-bottle-wrapper')
  //const totalFrames = 300 // Assuming 300 is the total frame count of your Lottie animation
  ScrollTrigger.normalizeScroll({
    allowNestedScroll: true,
    ignore: '#story-slider-1',
    //lockAxis: false,
    //type: 'touch,wheel,pointer', // now the page will be drag-scrollable on desktop because "pointer" is in the list
  })
  LottieScrollTrigger({
    target: player2,
    path: 'https://uploads-ssl.webflow.com/6571a5766b38a3291e605413/6617c25f0180aec7c8363699_KoffirachaTest4.json',
    speed: 'medium',
    scrub: 2, // seconds it takes for the playhead to "catch up"
    renderer: 'canvas',
    // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See /docs/v3/Plugins/ScrollTrigger
  })

  function LottieScrollTrigger(vars) {
    let playhead = { frame: 0 },
      target = gsap.utils.toArray(vars.target)[0],
      //speeds = { slow: '+=2000', medium: '+=1000', fast: '+=500' },
      st = {
        trigger: target,
        // pin: target,
        //markers: true,
        start: 'top 10%',
        //end: speeds[vars.speed] || '+=1000',
        //end: () => `bottom 30%+=${player2.offsetHeight}`,
        end: 'bottom bottom',
        endTrigger: '.floating-bottle-section_wrapper',
        scrub: true,
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

  gsap.to(
    {},
    {
      // An empty object since we're just using this to leverage the onUpdate
      scrollTrigger: {
        trigger: playerWrapper,
        startTrigger: '#test-anchor',
        endTrigger: '#bottle-section-1',
        start: 'top 10%',
        //end: () => `bottom 20%+=${playerWrapper.offsetHeight}`,
        end: 'bottom bottom',
        scrub: true, // Set to true or increase the number for more smoothing
        pin: true,
        invalidateOnRefresh: true,
        markers: true,
      },
    }
  )
}
