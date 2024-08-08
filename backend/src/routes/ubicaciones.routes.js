import {Router} from 'express';
import { actualizarUbicacion, ListarUbicacion, ListarUbicaciones, registrarUbicacion } from '../controllers/ubicaciones.controller.js';

const router = Router();

router.get("/listar", ListarUbicaciones);
router.get("/listar/:id", ListarUbicacion);
router.post("/registrar", registrarUbicacion);
router.put("/actualizar/:id", actualizarUbicacion);

export default router;