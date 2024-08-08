import express from "express";
import bodyParser from "body-parser";
import RutaUsuarios from "./src/routes/usuarios.routes.js";
import RutaTipoUsuario from "./src/routes/tipoUsuario.routes.js";
import RutaUnidadesProductivas from "./src/routes/unidadesProductivas.routes.js";
import RutaTecnicos from "./src/routes/tecnicos.routes.js";
import RutaCategorias from "./src/routes/categorias.routes.js";
import RutaUbicaciones from "./src/routes/ubicaciones.routes.js";
import RutaActividades from "./src/routes/actividades.routes.js";
import RutaEquipos from "./src/routes/equipos.routes.js";
import RutasMantenimientos from "./src/routes/mantenimientos.routes.js";
import RutaLogin from "./src/routes/userValidator.routes.js";
import {poolDB} from './src/database/conection.js';

const app = express();

app.use(bodyParser.json());
app.use("/usuarios", RutaUsuarios);
app.use("/tipoUsuario", RutaTipoUsuario);
app.use("/unidadesProductivas", RutaUnidadesProductivas);
app.use("/tecnicos", RutaTecnicos);
app.use("/categorias", RutaCategorias);
app.use("/ubicaciones", RutaUbicaciones);
app.use("/actividades", RutaActividades);
app.use("/equipos", RutaEquipos);
app.use("/mantenimientos", RutasMantenimientos);
app.use("/login", RutaLogin);

app.listen(4000, () => {
  console.log("Server running!");
  poolDB();
});
