import { pool } from "../database/conection.js";
// import multer from 'multer'

// export const uploadImage = multer({dest:'public/images'});

export const listarEquipos = async (req, res) => {
  try {
    const query =
      "SELECT equipos. *, ubicaciones.ambiente, ubicaciones.sitio, ubicaciones.fk_unidad_productiva,  unidades_productivas.nombre_unidad_productiva, categorias.nombre_categoria FROM equipos JOIN categorias ON categorias.id_categoria = equipos.fk_categoria JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion JOIN unidades_productivas ON unidades_productivas.id_unidad_productiva = ubicaciones.fk_unidad_productiva";
    const [result] = await pool.query(query);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Devices Found!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const listarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT equipos. *, ubicaciones.ambiente, ubicaciones.sitio, ubicaciones.fk_unidad_productiva,  unidades_productivas.nombre_unidad_productiva, categorias.nombre_categoria FROM equipos JOIN categorias ON categorias.id_categoria = equipos.fk_categoria JOIN ubicaciones ON ubicaciones.id_ubicacion = equipos.fk_ubicacion JOIN unidades_productivas ON unidades_productivas.id_unidad_productiva = ubicaciones.fk_unidad_productiva WHERE id_equipo = ${id}`;
    const [result] = await pool.query(query);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Device Not Found!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const registrarEquipo = async (req, res) => {
  try {
    const {
      serial,
      nombre_equipo,
      marca_equipo,
      modelo_equipo,
      fecha_ingreso,
      descripcion,
      tipo_equipo,
      estado,
      placa_sena,
      observaciones,
      fk_categoria,
      fk_ubicacion,
    } = req.body;
    const imagen = req.file;
    // Guardar el nombre del archivo con su ruta
    const imagenPath = `public/images/${imagen.filename}`;
    // const imagenPath = imagen.path;

    const query =
      "INSERT INTO equipos (serial,nombre_equipo,marca_equipo,modelo_equipo,fecha_ingreso,descripcion,tipo_equipo,estado,placa_sena,observaciones,imagen,fk_categoria,fk_ubicacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const [result] = await pool.query(query, [
      serial,
      nombre_equipo,
      marca_equipo,
      modelo_equipo,
      fecha_ingreso,
      descripcion,
      tipo_equipo,
      estado,
      placa_sena,
      observaciones,
      imagenPath,
      fk_categoria,
      fk_ubicacion,
    ]);

    if (result.affectedRows > 0) {
      res.status(200).json({ meesage: "Equipo registrado!" });
    } else {
      res.status(401).json({ meesage: "Equipo no registrado!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const actualizarEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      serial,
      nombre_equipo,
      marca_equipo,
      modelo_equipo,
      fecha_ingreso,
      descripcion,
      tipo_equipo,
      estado,
      placa_sena,
      observaciones,
      fk_categoria,
      fk_ubicacion,
    } = req.body;
    const imagen = req.file;
    // Guardar el nombre del archivo con su ruta
    const imagenPath = `public/updatedImages/${imagen.filename}`;
    // const imagenPath = imagen.path;

    const query = `UPDATE equipos SET serial='${serial}',nombre_equipo='${nombre_equipo}',marca_equipo='${marca_equipo}',modelo_equipo='${modelo_equipo}',fecha_ingreso='${fecha_ingreso}',descripcion='${descripcion}',tipo_equipo='${tipo_equipo}',estado='${estado}',placa_sena='${placa_sena}',observaciones='${observaciones}',imagen='${imagenPath}',fk_categoria='${fk_categoria}',fk_ubicacion='${fk_ubicacion}' WHERE id_equipo = ${id}`;
    const [result] = await pool.query(query);

    if (result.affectedRows > 0) {
      res.status(200).json({ meesage: "Equipo actualizado!" });
    } else {
      res.status(401).json({ meesage: "Equipo no actualizado!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
