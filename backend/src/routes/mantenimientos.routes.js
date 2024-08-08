import {Router} from 'express';
import { actualizarMantenimiento, listarMantenimiento, listarMantenimientos, registrarMantenimiento } from '../controllers/mantenimientos.controller.js';

const router = Router();

router.get("/listar", listarMantenimientos);
router.get("/listar/:id", listarMantenimiento);
router.post("/registrar", registrarMantenimiento);
router.put("/actualizar/:id", actualizarMantenimiento);

export default router;