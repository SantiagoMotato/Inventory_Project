import { FaBell } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { GrVirtualMachine } from "react-icons/gr";
import { RiFolderSettingsLine } from "react-icons/ri";

export const IconoUnidades = () =>{
  return(
    <>
    <div className="border-r-2 border-slate-200 pr-3">
      <RiDashboardHorizontalFill size={40} className="text-[#0011ff]"/>
    </div>
    </>
  )
}

export const IconoUsuarios = () =>{
  return(
    <>
    <div className="border-r-2 border-slate-200 pr-3">
      <FaUsers size={40} className="text-[#1b7918] relative right-4"/>
    </div>
    </>
  )
}

export const IconoEquipos = () =>{
  return(
    <>
    <div className="border-r-2 border-slate-200 pr-3">
      <GrVirtualMachine size={40} className="text-[#37009eac] relative right-6"/>
    </div>
    </>
  )
}

export const IconoMantenimientos = () =>{
  return(
    <>
    <div className="border-r-2 border-slate-200 pr-3">
      <RiFolderSettingsLine size={40} className="text-[#b45400a4] relative right-2"/>
    </div>
    </>
  )
}

function Bell() {
  return (
    <>
      <div
        className="flex justify-center items-center w-12 h-12 rounded-full cursor-pointer hover:scale-90 hover:drop-shadow-2xl duration-300"
        style={{ backgroundColor: "#59CE8F" }}>
        <FaBell className="w-7 h-7" style={{ color: "E8F9FD" }} />
      </div>



    </>
  );
}

export default Bell;
