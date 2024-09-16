import {Router} from 'express';
import { actualizarUbicacion, ListarUbicacion, ListarUbicaciones, registrarUbicacion } from '../controllers/ubicaciones.controller.js';
import {postUbicacionesValidator, putUbicacionesValidator} from '../validations/ubicaciones.validator.js'

const router = Router();

router.get("/listar", ListarUbicaciones);
router.get("/listar/:id", ListarUbicacion);
router.post("/registrar", postUbicacionesValidator(),registrarUbicacion);
router.put("/actualizar/:id", putUbicacionesValidator(), actualizarUbicacion);

export default router;