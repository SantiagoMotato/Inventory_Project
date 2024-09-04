import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Usuarios from '../pages/Usuarios'
import Ubicaciones from '../pages/Ubicaciones';
import Mantenimientos from '../pages/Mantenimientos'
import Home from '../pages/Home'
// Importa otros componentes aquí

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/equipos"  />
        <Route path="/mantenimientos" element={<Mantenimientos/>}/>
        <Route path="/ubicaciones" element={<Ubicaciones />}/>
        <Route path="/usuarios" element={<Usuarios />}/>
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirección a la ruta principal*/}
      </Routes>
    
  );
}

export default App;
