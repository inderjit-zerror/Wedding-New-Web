"use client"
import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const page = () => {

     const skyRef = useRef(null)
    const mountainRef = useRef(null)
    const mountain2Ref = useRef(null)
    const castleRef = useRef(null)

     const cloud1Ref = useRef(null)
    const cloud2Ref = useRef(null)

    useEffect(() => {

        gsap.to(skyRef.current, {
            y: 200,
            scale: 1.8,
            scrollTrigger: {
                trigger: skyRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        })

        gsap.to(mountainRef.current, {
            y: -400,
            scrollTrigger: {
                trigger: mountainRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        })
        gsap.to(mountain2Ref.current, {
            y: 400,
            scrollTrigger: {
                trigger: mountain2Ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        })

        gsap.to(castleRef.current, {
            y: -250,
            scrollTrigger: {
                trigger: castleRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        })

         // CLOUD 1
        gsap.to(cloud1Ref.current, {
            y: -150,
            x: 200,
            scrollTrigger: {
                trigger: cloud1Ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        })

        // CLOUD 2
        gsap.to(cloud2Ref.current, {
            y: 100,
            x: -250,
            scrollTrigger: {
                trigger: cloud2Ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        })

    }, [])


    useEffect(()=>{
        const TL = gsap.timeline()
        TL.from('.TextW',{
            opacity:0,
            scale:0.5,
            duration:1,
            ease:'power3.inOut'
        })
        TL.from('.sky',{
            scale:2,
            rotateZ:20,
            duration:1,
            ease:'power3.inOut'
        },'a1')
        TL.from('.mountain',{
           top:'50%',
            duration:2,
            ease:'power3.inOut'
        },'a1')
        TL.from(castleRef.current,{
            delay:1,
           top:'20%',
            duration:2,
            ease:'power3.inOut'
        },'a1')
        TL.from(cloud1Ref.current,{
            opacity:0,
            scale:5,
            duration:2,
            ease:'power3.inOut'
        },'a1')
        TL.from(cloud2Ref.current,{
            opacity:0,
            scale:5,
            duration:2,
            ease:'power3.inOut'
        },'a1')
    })

    return (
        <div className='w-full h-[300vh] bg-gray-700 overflow-hidden'>
            {/* SKY-BG */}
            <div ref={skyRef} className='w-full h-[120vh] absolute top-0 left-0 overflow-hidden z-10'>
                <img src={`/SkyBG.png`} className='w-full sky h-screen object-center object-cover scale-[1.5]' alt="IMG" />
            </div>

            {/* Mountain-1 */}
            <div ref={mountainRef} className='w-full h-screen mountain absolute top-[20%] left-0 z-20'>
                <img src={`/mountain1.png`} alt="IMG" className='w-full h-full object-bottom object-cover' />
            </div>

            {/* Name */}
            <div className="w-full h-screen top-0 left-0 flex justify-center items-start pt-[15vh]">
                <h1 className="text-[10vw] text-white z-100 Font_Q TextW opacity-100">Wedding</h1>
            </div>
            

            {/* Castle */}
            <img ref={castleRef} src={`/Castle.png`} className='w-full h-full absolute top-0 left-0 object-center object-cover z-30' alt="IMG" />

            {/* Cloud-1 */}
            <img ref={cloud1Ref} src={`/try/cloud.png`} className="w-1/2 object-cover object-center absolute top-5 left-1 z-40 opacity-40 " alt="IMG" />

            {/* Cloud-2 */}
            <img ref={cloud2Ref} src={`/try/cloud.png`} className="w-1/2 object-cover object-center opacity-60 scale-[0.6] absolute top-[10%] right-[-12%] z-20" alt="IMG" />
        </div>
    )
}

export default page
