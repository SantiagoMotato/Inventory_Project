import {Router} from 'express'
import {listarTipoUsuario, registrarTipoUsuario} from '../controllers/tipoUsuario.controller.js'

const router = Router();

router.get("/listar", listarTipoUsuario);
router.post("/registrar", registrarTipoUsuario);

export default router;