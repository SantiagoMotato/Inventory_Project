import { Router } from 'express';
import { actualizarTecnico, listarTecnico, listarTecnicos, registrarTecnico } from '../controllers/tecnicos.controller.js';

const router = Router();

router.get("/listar", listarTecnicos);
router.get("/buscar/:id", listarTecnico);
router.post("/registrar", registrarTecnico)
router.put("/actualizar/:id", actualizarTecnico)

export default router;