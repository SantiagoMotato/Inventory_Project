import {Router} from 'express';
import { actualizarMantenimiento, listarMantenimiento, listarMantenimientos, registrarMantenimiento } from '../controllers/mantenimientos.controller.js';
import {postMantenimientoValidator, putMantenimientoValidator} from '../validations/mantenimientos.validator.js'

const router = Router();

router.get("/listar", listarMantenimientos);
router.get("/listar/:id", listarMantenimiento);
router.post("/registrar", postMantenimientoValidator(), registrarMantenimiento);
router.put("/actualizar/:id", putMantenimientoValidator(), actualizarMantenimiento);

export default router;