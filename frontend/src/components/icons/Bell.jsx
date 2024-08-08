import { FaBell } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { GrVirtualMachine } from "react-icons/gr";
import { RiFolderSettingsLine } from "react-icons/ri";

export const IconoUnidades = () =>{
  return(
    <>
    <div className="">
      <RiDashboardHorizontalFill size={40}/>
    </div>
    </>
  )
}

export const IconoUsuarios = () =>{
  return(
    <>
    <div className="">
      <FaUsers size={40}/>
    </div>
    </>
  )
}

export const IconoEquipos = () =>{
  return(
    <>
    <div className="">
      <GrVirtualMachine size={40}/>
    </div>
    </>
  )
}

export const IconoMantenimientos = () =>{
  return(
    <>
    <div className="border-r-2 border-slate-300 pr-3">
      <RiFolderSettingsLine size={40} className="text-white"/>
    </div>
    </>
  )
}

function Bell() {
  return (
    <>
      <div
        className="flex justify-center items-center w-12 h-12 rounded-full"
        style={{ backgroundColor: "#59CE8F" }}
      >
        <FaBell className="w-7 h-7" style={{ color: "E8F9FD" }} />
      </div>



    </>
  );
}

export default Bell;
