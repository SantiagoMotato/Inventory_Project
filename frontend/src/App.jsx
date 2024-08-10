// import { BrowserRouter as Router } from "react-router-dom";
// import NavBar from "../src/components/organismos/NavBar";
// import SideBar from "../src/components/organismos/SideBar";
// import MyRoutes from './components/Routes/routes'
// import Cards from "../src/components/organismos/Cards";
// import {IconoUnidades,IconoUsuarios,IconoEquipos,IconoMantenimientos} from '../src/components/icons/Bell'

// function App() {
//   return (
//     <>
//       <Router>
//         <div className="flex max-h-screen bg-green-50">
//           <div>
//             <SideBar />
//           </div>
//           <main className="w-full">
//             <div>
//               <NavBar />
//             </div>
//             <section>
//               <div className="flex mt-5 drop-shadow-xl">
//                 <Cards bgColor="bg-[#007bff3d]" text={"Unidades Productivas"}>
//                   <IconoUnidades/>
//                 </Cards>
//                 <Cards bgColor="bg-[#28a7464e]" text={"Encargados"}>
//                   <IconoUsuarios/>
//                 </Cards>
//                 <Cards bgColor="bg-[#6e42c157]" text={"Equipos"}>
//                   <IconoEquipos/>
//                 </Cards>
//                 <Cards bgColor="bg-[#ff851b55]" text={"Mantenimientos"}>
//                   <IconoMantenimientos/>
//                 </Cards>
//               </div>
//             </section>
//             <MyRoutes /> 
//           </main>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
// import NavBar from "../src/components/organismos/NavBar";
// import SideBar from "../src/components/organismos/SideBar";
// import MyRoutes from './components/Routes/routes';
// import Cards from "../src/components/organismos/Cards";
// import { IconoUnidades, IconoUsuarios, IconoEquipos, IconoMantenimientos } from '../src/components/icons/Bell';

// function App() {
//   return (
//     <>
//       <Router>
//         <div className="flex max-h-screen bg-green-50">
//           <SideBar />
//           <main className="w-full">
//             <NavBar />
//             <MainContent /> {/* Mueve la lógica de rutas al componente MainContent */}
//           </main>
//         </div>
//       </Router>
//     </>
//   );
// }

// function MainContent() {
//   const location = useLocation();

//   // Verifica si la ruta actual es diferente a "/usuarios"
//   const showCards = location.pathname !== '/usuarios';

//   return (
//     <>
//       {showCards && (
//         <section>
//           <div className="flex mt-5 drop-shadow-xl">
//             <Cards bgColor="bg-[#007bff3d]" text={"Unidades Productivas"}>
//               <IconoUnidades />
//             </Cards>
//             <Cards bgColor="bg-[#28a7464e]" text={"Encargados"}>
//               <IconoUsuarios />
//             </Cards>
//             <Cards bgColor="bg-[#6e42c157]" text={"Equipos"}>
//               <IconoEquipos />
//             </Cards>
//             <Cards bgColor="bg-[#ff851b55]" text={"Mantenimientos"}>
//               <IconoMantenimientos />
//             </Cards>
//           </div>
//         </section>
//       )}
//       <MyRoutes />
//     </>
//   );
// }

// export default App;


import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"; //useLocation obtiene  la ruta actual. Permite acceder a la información sobre la ubicación actual, es decir, la URL que está activa en ese momento. 
import NavBar from "../src/components/organismos/NavBar";
import SideBar from "../src/components/organismos/SideBar";
import MyRoutes from './components/Routes/routes';
// import Cards from "../src/components/organismos/Cards";
// import { IconoUnidades, IconoUsuarios, IconoEquipos, IconoMantenimientos } from '../src/components/icons/Bell';

function App() {
  return (
    <>
      <Router>
        <div className="flex max-h-screen bg-green-50">
          <SideBar />
          <main className="w-full">
            <NavBar />
            <MainContent />
          </main>
        </div>
      </Router>
    </>
  );
}

function MainContent() {
  const location = useLocation();

  // Verifica si la ruta actual es la ruta principal "/", la ruta principal gracias a UseLocation. Por ejemplo const location = useLocation(); obtiene la ruta actual, por ejemplo, "/", o en casos anteriores "/usuarios"
  const showCards = location.pathname === '/';

  return (
    <>
      {showCards && (
        <section>
          {/* <div className="flex mt-5 drop-shadow-xl">
            <Cards bgColor="bg-[#007bff3d]" text={"Unidades Productivas"}>
              <IconoUnidades />
            </Cards>
            <Cards bgColor="bg-[#28a7464e]" text={"Encargados"}>
              <IconoUsuarios />
            </Cards>
            <Cards bgColor="bg-[#6e42c157]" text={"Equipos"}>
              <IconoEquipos />
            </Cards>
            <Cards bgColor="bg-[#ff851b55]" text={"Mantenimientos"}>
              <IconoMantenimientos />
            </Cards>
          </div> */}
          {/* <Home/> */}
        </section>
      )}
      <MyRoutes /> {/* MyRoutes contiene a los componentes Usuarios, ubicaciones, etc */}
    </>
  );
}

export default App;
