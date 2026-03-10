import Lamp from '@/components/elements/Lamp'
import React from 'react'


const HeroSection = () => {
  return (
    <div className='w-full min-h-screen relative bg-[#d1e7d1]'>
      <Lamp top="50%" left="50%" translateX="-50%" translateY="-50%" rotation="20deg" name={'DemoName'}/>
    </div>
  )
}

export default HeroSection
