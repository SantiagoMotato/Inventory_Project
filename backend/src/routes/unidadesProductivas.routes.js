import { Router } from "express";
import { RegistrarUnidadProductiva,ListarUnidadesProductivas, ListarUnidadProductiva, ActualizarUnidadProductiva } from "../controllers/unidadesProductivas.controller.js";
import {UnidadesProductivasValidation, UnidadesProductivasValidationUpdate} from '../validations/unidadesProductivas.validator.js'

const router = Router();

router.get("/listar", ListarUnidadesProductivas);
router.get("/buscar/:id", ListarUnidadProductiva);
router.post("/registrar", UnidadesProductivasValidation(), RegistrarUnidadProductiva);
router.put("/actualizar/:id", UnidadesProductivasValidationUpdate(), ActualizarUnidadProductiva);

export default router;
