import { Router } from "express";
import { RegistrarUnidadProductiva,ListarUnidadesProductivas, ListarUnidadProductiva, ActualizarUnidadProductiva } from "../controllers/unidadesProductivas.controller.js";

const router = Router();

router.get("/listar", ListarUnidadesProductivas);
router.get("/buscar/:id", ListarUnidadProductiva);
router.post("/registrar", RegistrarUnidadProductiva);
router.put("/actualizar/:id", ActualizarUnidadProductiva);

export default router;
