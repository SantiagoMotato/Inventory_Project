import {Router} from 'express';
import { actualizarCategoria, listarCategoria, listarCategorias, registrarCategoria } from '../controllers/categorias.controller.js';

const router = Router();

router.get("/listar", listarCategorias);
router.get("/buscar/:id", listarCategoria);
router.post("/registrar", registrarCategoria);
router.put("/actualizar/:id", actualizarCategoria);

export default router;