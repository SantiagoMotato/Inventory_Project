import { Router } from "express";
import { listarUsuarios, listarUsuario, registrarUsuario, actualizarUsuario } from "../controllers/usuarios.controller.js";
import { validationToken } from '../controllers/userValidator.controller.js'
import {UserDataValidation} from '../validations/usuarios.validator.js'

const router = Router();

router.get("/listar", listarUsuarios);
router.get("/listar/:id", listarUsuario);
router.post("/registrar", UserDataValidation(),/* validationToken, */ registrarUsuario);
router.put("/actualizar/:id", /* validationToken, */ actualizarUsuario);

export default router;
