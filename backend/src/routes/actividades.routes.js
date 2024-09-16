import { Router } from 'express';
import { actualizarActividad, listarActividad, listarActividades, registrarActividad } from '../controllers/actividades.controller.js';
import {postActividadValidator, putActividadValidator} from '../validations/actividades.validator.js'

const router = Router();

router.get("/listar", listarActividades);
router.get("/listar/:id", listarActividad);
router.post("/registrar", postActividadValidator(),registrarActividad);
router.put("/actualizar/:id", putActividadValidator(),actualizarActividad);

export default router;