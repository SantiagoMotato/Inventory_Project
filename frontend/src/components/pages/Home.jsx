import Cards from "../organismos/Cards";
import {
  IconoUnidades,
  IconoUsuarios,
  IconoEquipos,
  IconoMantenimientos,
} from "../icons/Bell";

function Home() {
  return (
    <>
      <div className="flex mt-5 drop-shadow-xl">
        <Cards bgColor="bg-[#007bff3d]" text={"Unidades Productivas"}>
          <div className="border-l-8 rounded-md border-[#0011ff] h-[76px] flex items-center pl-12">
            <IconoUnidades />
          </div>
        </Cards>
        <Cards bgColor="bg-[#28a7464e]" text={"Encargados"}>
          <div className="border-l-8 rounded-md border-[#1b7918] h-[76px] flex items-center pl-12">
            <IconoUsuarios />
          </div>
        </Cards>
        <Cards bgColor="bg-[#6e42c157]" text={"Equipos"}>
          <div className="border-l-8 rounded-md border-[#37009eac] h-[76px] flex items-center pl-12">
            <IconoEquipos />
          </div>
        </Cards>
        <Cards bgColor="bg-[#ff851b55]" text={"Mantenimientos"}>
          <div className="border-l-8 rounded-md border-[#b45400a4] h-[76px] flex items-center pl-12">
            <IconoMantenimientos />
          </div>
        </Cards>
      </div>
    </>
  );
}

export default Home;
