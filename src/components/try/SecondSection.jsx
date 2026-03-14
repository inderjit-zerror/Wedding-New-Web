'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SecondSection = () => {

  const sectionRef = useRef(null)
  const skyRef = useRef(null)
  const castleRef = useRef(null)
  const cloud1Ref = useRef(null)
  const cloud2Ref = useRef(null)

  useEffect(() => {

    const ctx = gsap.context(() => {

      // Sky moves slower (background)
      gsap.to(skyRef.current, {
        y: -450,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

      // Castle moves faster (foreground)
      gsap.to(castleRef.current, {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })

    }, sectionRef)

    // floating clouds
    gsap.to(cloud1Ref.current, {
      y: 40,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })

    gsap.to(cloud2Ref.current, {
      y: 30,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })

    return () => ctx.revert()

  }, [])

  return (
    <div ref={sectionRef} className='w-full h-[250vh] relative'>

      <div className='w-full h-svh absolute top-0 left-0 overflow-hidden z-[-1]'>
        <img
          ref={skyRef}
          src="/SkyBG.png"
          alt="Sky"
          className='w-full h-full object-cover object-bottom'
        />
      </div>

      <img
        ref={castleRef}
        src="/Castle.png"
        alt="Castle"
        className='w-full h-full object-cover object-center'
      />


      <img
        ref={cloud1Ref}
        src="/try/cloud.png"
        alt="Castle"
        className='w-1/2 object-cover object-center absolute top-[-5%] left-[-10%] z-80 opacity-50'
      />
      <img
        ref={cloud2Ref}
        src="/try/cloud.png"
        alt="Castle"
        className='w-1/2 object-cover object-center absolute top-[3%] right-[-10%] z-80 opacity-40'
      />

    </div>
  )
}

export default SecondSection