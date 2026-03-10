import React from 'react'

const Lamp = ({top, left,translateX, translateY, rotation, name}) => {
  return (
    <div  
    style={{ top: top, left: left,  transform: `translate(${translateX}, ${translateY}) rotateZ(${rotation})`  }} 
    className={`w-30 h-32.5 ${name} flex bg-[#577d57] absolute`}
    >
      
    </div>
  )
}

export default Lamp
