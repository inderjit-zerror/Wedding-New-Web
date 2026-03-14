'use client'
import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {

    useEffect(() => {
        const TL = gsap.timeline()
        TL.to('.BLACKHI', {
            width: '100%',
            duration: 2,
            ease: 'power3.inOut'
        })
        TL.to('.StickyDIV', {
            backgroundColor: '#202020',
            duration: 2,
            ease: 'power3.inOut'
        }, 'a1')
        TL.to('.animatediv', {
            opacity: 0,
            ease: 'power3.inOut'
        }, 'a1')
        
        // ⭐ Clip animation
        TL.fromTo(
            ".InnerDiv",
            {
                clipPath: "inset(45% 45% 45% 45% round 100px)"
            },
            {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 2,
                ease: "power3.inOut"
            },
            "a1"
        )

        TL.from('.heroImg', {
            // delay:0.2,
            scale:1.5,
            duration: 1,
            ease: 'none'
        },'a1')
        TL.to('.TitleHero', {
            opacity: 1,
            ease: 'none'
        })
    }, [])

    return (
        <div className='w-full h-svh relative'>
            <div
                className=' StickyDIV w-full h-svh sticky top-0 left-0 overflow-hidden '

            >

                <div
                    style={{
                        clipPath: "inset(45% 45% 45% 45% round 100px)"
                    }}
                    className='InnerDiv w-full h-svh flex justify-center items-center absolute top-0 left-0 overflow-hidden'>

                    <img
                        src={`/try/Semple2.jpg`}
                        alt="IMG"
                        className='w-full h-full heroImg object-cover object-center'
                    />
                </div>

                <div className='w-full h-screen absolute top-0 left-0 z-20 flex justify-center items-center'>

                    <div className='w-[10%] h-[10%] bg-[white] animatediv flex justify-center items-center relative rounded-[100px] overflow-hidden'>

                        <div className='w-[95%] h-[90%] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-[100px] z-50'>
                        </div>

                        <div className='w-[0%] BLACKHI h-full absolute top-0 left-0 bg-[#202020] z-40'>

                        </div>

                    </div>

                    <h1 className='text-[10vw] leading-[10vw] w-full TitleHero opacity-0 tracking-tighter Font_Q h-fit flex justify-center items-center absolute bottom-10  left-1/2 -translate-x-1/2 text-white'>SONAL & KUSH</h1>

                </div>

            </div>
        </div>
    )
}

export default HeroSection
