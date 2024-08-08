import { pool } from '../database/conection.js'

export const listarActividades = async(req,res) => {
    try {
        const query = "SELECT actividades. *, actividades.fecha_actividad, actividades.descripcion, mantenimientos.tipo_mantenimiento, tecnicos.nombres AS nombres_tecnico, tecnicos.apellidos AS apellidos_tecnico FROM actividades JOIN mantenimientos ON mantenimientos.id_mantenimiento = actividades.fk_mantenimiento JOIN tecnicos ON tecnicos.id_tecnico = actividades.fk_tecnico";
        const [result] = await pool.query(query);

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({msssage:"No Activities Found!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const listarActividad = async(req,res) => {
    try {
        const {id} = req.params;
        const query = `SELECT actividades. *, actividades.fecha_actividad, actividades.descripcion, mantenimientos.tipo_mantenimiento, tecnicos.nombres AS nombres_tecnico, tecnicos.apellidos AS apellidos_tecnico FROM actividades JOIN mantenimientos ON mantenimientos.id_mantenimiento = actividades.fk_mantenimiento JOIN tecnicos ON tecnicos.id_tecnico = actividades.fk_tecnico WHERE id_actividad = ${id}`;
        const [result] = await pool.query(query);

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"Activity Not Found!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const registrarActividad = async(req,res) => {
    try {
        const {fecha_actividad,descripcion,fk_mantenimiento,fk_tecnico} = req.body;
        const query = 'INSERT INTO actividades (fecha_actividad, descripcion, fk_mantenimiento, fk_tecnico) VALUES (?,?,?,?)';
        const [result] = await pool.query(query, [fecha_actividad, descripcion, fk_mantenimiento, fk_tecnico]);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Actividad registrada!"});
        }else{
            res.status(401).json({message:"Actividad no registrada!"});
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

export const actualizarActividad = async(req,res) => {
    try {
        const {id} = req.params;
        const {fecha_actividad,descripcion,fk_mantenimiento,fk_tecnico} = req.body;
        const query = `UPDATE actividades SET fecha_actividad='${fecha_actividad}',descripcion='${descripcion}',fk_mantenimiento='${fk_mantenimiento}',fk_tecnico='${fk_tecnico}' WHERE id_actividad = ${id}`;
        const [result] = await pool.query(query);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Actividad actualizada!"});
        }else{
            res.status(401).json({message:"Actividad no actualizada!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}