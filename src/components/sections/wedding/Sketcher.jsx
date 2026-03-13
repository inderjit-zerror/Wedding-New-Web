'use client'



const Sketcher = () => {

  return (
    <div  className='w-full h-screen fixed top-0 left-0 overflow-hidden z-[-1] '>
      <img src={`/2.png`} alt="IMG" className='BG-Container w-full SketcherBG h-full object-center object-cover z-[-1]' />

      <div className='Top-Sketch-Container w-full h-screen absolute top-0 left-0 z-50 overflow-hidden max-sm:hidden '>
        <img src={`/1.jpg`} alt="IMG" className=' SketcherCont sm:opacity-0 w-full h-full object-center object-cover ' />
      </div>

      
    </div>
  )
}

export default Sketcher