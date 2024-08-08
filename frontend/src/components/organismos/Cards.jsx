import React from 'react'
import { RiDashboardHorizontalFill } from "react-icons/ri";

{/* <RiDashboardHorizontalFill size={45} className='border-r-2'/> */}

function Cards({bgColor,text,children}) {
  return (
    <>
      <div className={`flex justify-center items-center gap-5 w-[250px] h-[80px] rounded-lg mx-auto cursor-pointer ${bgColor}`}>
        {children}
        <h1>{text}</h1>
      </div>
    </>
  )
}

export default Cards
