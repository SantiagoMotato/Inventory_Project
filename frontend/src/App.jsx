import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../src/components/organismos/NavBar";
import SideBar from "../src/components/organismos/SideBar";
import MainBackground from "../src/components/organismos/MainBackground";
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
                <Cards bgColor="bg-[#80bdff]" text={"Unidades Productivas"}>
                  <IconoUnidades/>
                </Cards>
                <Cards bgColor="bg-[#79ff98]" text={"Encargados"}>
                  <IconoUsuarios/>
                </Cards>
                <Cards bgColor="bg-[#b58dff]" text={"Equipos"}>
                  <IconoEquipos/>
                </Cards>
                <Cards bgColor="bg-[#ffc897]" text={"Mantenimientos"}>
                  <IconoMantenimientos/>
                </Cards>
              </div>
            </section>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
