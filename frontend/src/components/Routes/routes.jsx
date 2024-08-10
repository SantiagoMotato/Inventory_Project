import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Usuarios from '../pages/Usuarios'
import Ubicaciones from '../pages/Ubicaciones';
import Home from '../pages/Home'
// Importa otros componentes aquí

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* <Route path="/equipos"  /> */}
        {/* <Route path="/mantenimientos"  /> */}
        <Route path="/ubicaciones" element={<Ubicaciones />}/>
        <Route path="/usuarios" element={<Usuarios />}/>
      </Routes>
    
  );
}

export default App;
