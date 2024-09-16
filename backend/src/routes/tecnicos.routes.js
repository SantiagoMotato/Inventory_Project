import { Router } from 'express';
import { actualizarTecnico, listarTecnico, listarTecnicos, registrarTecnico } from '../controllers/tecnicos.controller.js';
import {postTecnicoValidator, putTecnicoValidator} from '../validations/tecnicos.validator.js'
const router = Router();

router.get("/listar", listarTecnicos);
router.get("/buscar/:id", listarTecnico);
router.post("/registrar", postTecnicoValidator(), registrarTecnico);
router.put("/actualizar/:id", putTecnicoValidator(), actualizarTecnico);

export default router;