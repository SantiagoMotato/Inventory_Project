import {Router} from 'express'
import multer from 'multer'
import { actualizarEquipo, listarEquipo, listarEquipos, registrarEquipo/* , uploadImage  */} from '../controllers/equipos.controller.js';

const router = Router();

//Lo que permite esta variable "Storage" es permitir registrar una imagen con su nombre original, ya que por defecto multer genera un nombre único para cada archivo utilizando un hash o un identificador único para evitar colisiones de nombres. Por eso el nombre de archivo es algo así como f13a6796fe0b9e9e5dc2bbe065604991. 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        // El nombre de la imagen en tu ejemplo (public/images/1722552210181-koenigsegg.jpg) incluye un prefijo numérico (1722552210181-) porque en la configuración de multer, has añadido una marca de tiempo (el valor de Date.now()) al nombre original del archivo. Esto se hace para garantizar que cada archivo tenga un nombre único y evitar colisiones de nombres si se suben varios archivos con el mismo nombre original. La marca de tiempo se añade para prevenir conflictos de nombres de archivo. Si dos usuarios suben un archivo con el mismo nombre (koenigsegg.jpg), la marca de tiempo garantiza que cada archivo tendrá un nombre único en el servidor.
        cb(null, `${Date.now()}-${file.originalname}`);
        // cb(null, file.originalname);
    }
});

const storageImageUpdate = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/updatedImages');
    },
    filename: function (req, file, cb) {
        // El nombre de la imagen en tu ejemplo (public/images/1722552210181-koenigsegg.jpg) incluye un prefijo numérico (1722552210181-) porque en la configuración de multer, has añadido una marca de tiempo (el valor de Date.now()) al nombre original del archivo. Esto se hace para garantizar que cada archivo tenga un nombre único y evitar colisiones de nombres si se suben varios archivos con el mismo nombre original. La marca de tiempo se añade para prevenir conflictos de nombres de archivo. Si dos usuarios suben un archivo con el mismo nombre (koenigsegg.jpg), la marca de tiempo garantiza que cada archivo tendrá un nombre único en el servidor.
        cb(null, `${Date.now()}-${file.originalname}`);
        // cb(null, file.originalname);
    }
});

// const uploadImage = multer({dest:'public/images'});
const uploadImage = multer({ storage: storage });
const uploadImageUpdate = multer({ storage: storageImageUpdate });

router.get("/listar", listarEquipos);
router.get("/listar/:id", listarEquipo);
router.post("/registrar" , uploadImage.single('imagen'), registrarEquipo);
router.put("/actualizar/:id", uploadImageUpdate.single('imagen'), actualizarEquipo);

export default router;