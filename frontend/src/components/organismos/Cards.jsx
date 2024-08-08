import React from 'react'
import { RiDashboardHorizontalFill } from "react-icons/ri";

{/* <RiDashboardHorizontalFill size={45} className='border-r-2'/> */}

function Cards({bgColor,text,children}) {
  return (
    <>
      <div className={`flex justify-center items-center gap-5 w-[260px] h-[80px] rounded-lg mx-auto cursor-pointer border-2 drop-shadow-sm border-slate-100 hover:scale-90 duration-500 ${bgColor}`}>
      <div className="flex items-center gap-5 w-full h-full">
        {/* Contenedor con el borde izquierdo */}
        <div className="border-l-4 border-slate-500 h-full flex items-center pl-10">
          {children}
        </div>
        <h1>{text}</h1>
      </div>
      </div>
    </>
  )
}

export default Cards
