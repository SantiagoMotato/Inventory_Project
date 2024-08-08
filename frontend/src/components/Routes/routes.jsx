import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Usuarios from '../pages/Usuarios'
// import Usuarios from '../src/components/pages/Usuarios';
// Importa otros componentes aquí

function App() {
  return (
    
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/equipos" element={<Equipos />} /> */}
        {/* <Route path="/mantenimientos" element={<Mantenimientos />} /> */}
        {/* <Route path="/ubicaciones" element={<Ubicaciones />} /> */}
        <Route path="/usuarios" element={<Usuarios />} /> {/* Define la ruta aquí */}
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    
  );
}

export default App;
