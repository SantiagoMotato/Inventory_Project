import { FaBell } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";

export const IconoUnidades = () =>{
  <RiDashboardHorizontalFill/>
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
