import React from 'react'
import { RiDashboardHorizontalFill } from "react-icons/ri";

{/* <RiDashboardHorizontalFill size={45} className='border-r-2'/> */}

function Cards({bgColor, text, IconoUnidades}) {
  return (
    <>
      <div className={`flex justify-center items-center gap-5 w-[250px] h-[80px] rounded-lg mx-auto cursor-pointer ${bgColor}`}>
        <h1>{text}</h1>
        <div>{IconoUnidades}</div>
      </div>
    </>
  )
}

export default Cards
