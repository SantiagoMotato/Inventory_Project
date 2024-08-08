import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../src/components/organismos/NavBar";
import SideBar from "../src/components/organismos/SideBar";
import MainBackground from "../src/components/organismos/MainBackground";
import MyRoutes from './components/Routes/routes'
import Cards from "../src/components/organismos/Cards";
import {IconoUnidades,IconoUsuarios,IconoEquipos,IconoMantenimientos} from '../src/components/icons/Bell'

function App() {
  return (
    <>
      <Router>
        <div className="flex max-h-screen bg-green-50">
          <div>
            <SideBar />
          </div>
          <main className="w-full">
            <div>
              <NavBar />
            </div>
            <section>
              {/* <MainBackground /> */}
              <div className="flex mt-5 drop-shadow-xl">
                <Cards bgColor="bg-[#007bff3d]" text={"Unidades Productivas"}>
                  <IconoUnidades/>
                </Cards>
                <Cards bgColor="bg-[#28a7464e]" text={"Encargados"}>
                  <IconoUsuarios/>
                </Cards>
                <Cards bgColor="bg-[#6e42c157]" text={"Equipos"}>
                  <IconoEquipos/>
                </Cards>
                <Cards bgColor="bg-[#ff851b55]" text={"Mantenimientos"}>
                  <IconoMantenimientos/>
                </Cards>
              </div>
            </section>
            <MyRoutes /> 
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
