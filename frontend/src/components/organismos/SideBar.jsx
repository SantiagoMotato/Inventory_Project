import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import logoTool from '../../assets/logogreentool.png'

import { IoHomeSharp } from "react-icons/io5";
import { MdDevicesFold } from "react-icons/md";
import { GrVmMaintenance } from "react-icons/gr";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa"
// import { HiMenuAlt3 } from 'react-icons/hi';
// import { TiThMenu } from "react-icons/ti";
import { AiOutlineMenu } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";



function SideBar() {

    const [openSideBar, setOpenSideBar] = useState(false);

    const modulos = [
        {name:"Home", link:"/", icon: IoHomeSharp},
        {name:"Equipos", link:"/equipos", icon: MdDevicesFold},
        {name:"Mantenimientos", link:"/mantenimientos", icon: GrVmMaintenance},
        {name:"Ubicaciones", link:"/ubicaciones", icon: FaMapLocationDot},
        {name:"Usuarios", link:"/usuarios", icon: FaUsers},
    ];

    const IconLogOut = [
      {name:"Cerrar Sesión", link:"/", icon: TbLogout2},
    ]

    const handleClick = () => {
        setOpenSideBar(!openSideBar);
    };

    // hover:bg-[#3cb91c]

  return (
    <>
      <section className=''>
        <div className={`${openSideBar ? 'w-72':'w-20'} min-h-screen bg-white duration-700 shadow-2xl`}>
            <div className='flex justify-end relative left-16 top-3'>
                <AiOutlineMenu size={42} className='cursor-pointer hover:scale-90 duration-300 bg-slate-100 hover:bg-slate-200 text-gray-500 drop-shadow-md border-2 pt-2 pb-2 pl-1 pr-1 rounded-lg' onClick={handleClick}/>
            </div>
            <div className='flex relative bottom-8 items-center mr-2 ml-2 h-14 rounded-xl cursor-pointer'>
                <img className='w-16 h-16' src={logoTool} alt="" />
                <p className={`uppercase font-bold text-[#123A00] text-2xl mx-6 duration-500 ${!openSideBar && 'opacity-0 translate-x-28 overflow-hidden'}`}>inventory</p>
            </div>
            <div className='fle flex-col relative gap-4 mt-12 mr-4 ml-4'>
                {modulos.map((modulo, i) => (
                    <Link to={modulo.link} key={i} className={`${openSideBar && 'hover:text-white hover:bg-[#3cb91c]'} group flex itmes-center text-sm gap-3.5 font-medium p-2 mt-6 hover:bg-[#AEFF8A] text-[#4BB71C] duration-150 rounded-md`}>
{/* relative left-8 */}
{/* {`flex ${openSideBar && 'relative left-8 '}`} */}
                    <div className={`flex ${openSideBar && 'relative translate-x-8'} duration-500`} >
                        <div>{React.createElement(modulo.icon, {size:'35'})}</div>

                        <h2 /* style={{
                        transitionDelay: `${i+3}00ms`
                        }} */ className={`whitespace-pre duration-500 text-xl ml-4 mt-1  ${!openSideBar && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                          {modulo?.name}
                        </h2>
                      </div> 

                      <h2 className={`${openSideBar && 'hidden'} absolute left-48 text-base bg-[#96E175] font-semibold whitespace-pre text-[#123A00] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit z-10`}>
                        {modulo.name}
                      </h2>
                    
                    </Link>
                ))}
            </div>

            <div className=' mx-4 relative top-16'>
                {IconLogOut.map((IconLogOut, i) => (
                  <div className='group'  key={i} >
                    <button className='flex justify-center items-center text-[#4BB71C] hover:text-lime-700  p-2 drop-shadow-md bg-[#DDE4E3] hover:bg-[#bebebe] duration-200 w-full rounded-md '>
                      <h2 className={`whitespace-pre duration-500 font-medium text-xl ${!openSideBar && 'opacity-0 translate-x-28 overflow-hidden'}`}>{IconLogOut.name}</h2>
                      <div>{React.createElement(IconLogOut.icon, {size:35})}</div>
                      <h2 className={`${openSideBar && 'hidden'} absolute left-48  text-base bg-[#96E175] font-semibold whitespace-pre text-[#123A00] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-16 group-hover:duration-300 group-hover:w-fit`}>{IconLogOut.name}</h2>
                    </button>
                  </div>
                ))}
            </div>
        </div>
      </section>
    </>
  )
}

export default SideBar
