import Sketcher from '@/components/sections/wedding/Sketcher'
import React from 'react'

const wedding = () => {
  return (
    <>
      <Sketcher />
      <div className=' blankDiv w-full h-screen relative '>
        {/* div */}
        <div className="w-full h-screen absolute top-0 left-0 p-10 z-100 flex justify-center items-end">
          <h1 className="Font_Q text-[10vw] leading-[10vw] text-gray-800">SONAL & KUSH</h1>
        </div>
      </div>

      <div className='bg-gray-800 w-full h-screen'>

      </div>
    </>
  )
}

export default wedding
