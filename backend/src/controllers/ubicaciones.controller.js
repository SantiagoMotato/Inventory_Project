import { pool } from '../database/conection.js';

export const ListarUbicaciones = async(req,res) => {
    try {
        const query = "SELECT ubicaciones.*, ubicaciones.ambiente, ubicaciones.sitio FROM ubicaciones JOIN unidades_productivas ON unidades_productivas.id_unidad_productiva = ubicaciones.fk_unidad_productiva";
        const [result] = await pool.query(query);

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"No Ubications Found!"});
        }

    } catch (error) {
        console.log(error.message)
    }
}

export const ListarUbicacion = async(req,res) => {
    try {
        const {id} = req.params;
        const query = `SELECT ubicaciones.*, ubicaciones.ambiente, ubicaciones.sitio FROM ubicaciones JOIN unidades_productivas ON unidades_productivas.id_unidad_productiva = ubicaciones.fk_unidad_productiva WHERE id_ubicacion = ${id}`;
        const [result] = await pool.query(query);

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"Ubication Not Found!"});
        }

    } catch (error) {
        console.log(error.message)
    }
}

export const registrarUbicacion = async(req,res) => {
    try {
        const {ambiente,sitio,fk_unidad_productiva} = req.body;
        const query = "INSERT INTO ubicaciones (ambiente,sitio,fk_unidad_productiva) VALUES (?,?,?)";
        const [result] = await pool.query(query,[ambiente,sitio,fk_unidad_productiva]);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Ubicacion registrada!"});
        }else{
            res.status(401).json({message:"Ubicacion no registrada!"});
        }

    } catch (error) {
       console.log(error.message);
    }
}

export const actualizarUbicacion = async(req,res) => {
    try {
        const {id} = req.params;
        const {ambiente,sitio,fk_unidad_productiva} = req.body;
        const query = `UPDATE ubicaciones SET ambiente='${ambiente}',sitio='${sitio}',fk_unidad_productiva='${fk_unidad_productiva}' WHERE id_ubicacion = ${id}`;
        const [result] = await pool.query(query);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Ubicacion actualizada!"});
        }else{
            res.status(401).json({message:"Ubicacion no actualizada!"});
        }

    } catch (error) {
       console.log(error.message);
    }
}