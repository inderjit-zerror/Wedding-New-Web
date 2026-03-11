"use client"
import Lamp from '@/components/elements/Lamp'
import React, { useEffect, useRef } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const HeroSection = () => {
  // <Lamp top="50%" left="50%" translateX="-50%" translateY="-50%" rotation="20deg" name={'DemoName'}/>

   const skyRef = useRef(null)
  const castleRef = useRef(null)

  useEffect(() => {

    // Sky Slow Movement
    gsap.to(skyRef.current, {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: skyRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    // Castle Fast Movement
    gsap.to(castleRef.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: castleRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

  }, [])
  return (
    <div className='w-full min-h-[300vh] relative bg-[#d1e7d1]'>
      <img 
      ref={skyRef}
      src={`/SkyBG.png`} 
      className='w-full h-[110vh]  object-cover object-center absolute top-0 left-0 z-10' 
      alt="IMG" 
      />

      <img 
      ref={castleRef}
      src={`/Castle.png`}
      className='w-full h-full object-cover object-center absolute top-0 left-0 z-20' 
      alt="IMG" 
      />
    </div>
  )
}

export default HeroSection
