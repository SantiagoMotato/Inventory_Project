import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../src/components/organismos/NavBar";
import SideBar from "../src/components/organismos/SideBar";
import MainBackground from "../src/components/organismos/MainBackground";
import Cards from "../src/components/organismos/Cards";
import {IconoUnidades} from '../src/components/icons/Bell'

function App() {
  return (
    <>
      <Router>
        <div className="flex max-h-screen bg-green-100">
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
                <Cards icono={IconoUnidades} bgColor="bg-[#80bdff]" text={"Unidades Productivas"}/>
                <Cards bgColor="bg-[#79ff98]"  text={"Encargados"}/>
                <Cards bgColor="bg-[#b58dff]"  text={"Equipos"}/>
                <Cards bgColor="bg-[#ffc897]"  text={"Mantenimientos"}/>
              </div>
            </section>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
