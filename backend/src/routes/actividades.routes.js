import { Router } from 'express';
import { actualizarActividad, listarActividad, listarActividades, registrarActividad } from '../controllers/actividades.controller.js';

const router = Router();

router.get("/listar", listarActividades);
router.get("/listar/:id", listarActividad);
router.post("/registrar", registrarActividad);
router.put("/actualizar/:id", actualizarActividad);

export default router;