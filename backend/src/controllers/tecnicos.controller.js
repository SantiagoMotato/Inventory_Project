import {pool} from '../database/conection.js'

export const listarTecnicos = async (req,res) => {
    try {
        const query = "SELECT * FROM tecnicos";
        const [result] = await pool.query(query)

        if(result.length > 0) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"No Technicians Found!"});
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

export const listarTecnico = async (req,res) => {
    try {
        const {id} = req.params;
        const query = `SELECT * FROM tecnicos WHERE id_tecnico = ${id}`;
        const [result] = await pool.query(query)

        if(result.length > 0) {
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"Technician Not Found!"});
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

export const registrarTecnico = async (req,res) => {
    try {
        const {identificacion,nombres,apellidos,correo,telefono} = req.body;
        const query = "INSERT INTO tecnicos (identificacion,nombres,apellidos,correo,telefono) VALUES (?,?,?,?,?)";
        const [result] = await pool.query(query,[identificacion,nombres,apellidos,correo,telefono]);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Tecnico registrado!"});
        }else{
            res.status(401).json({message:"Tecnico no registrado!"});
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

export const actualizarTecnico = async (req,res) => {
    try {
        const {id} = req.params;
        const {identificacion,nombres,apellidos,correo,telefono} = req.body;
        const query = `UPDATE tecnicos SET identificacion='${identificacion}',nombres='${nombres}',apellidos='${apellidos}',correo='${correo}',telefono='${telefono}' WHERE id_tecnico = ${id}`;
        const [result] = await pool.query(query,[identificacion,nombres,apellidos,correo,telefono]);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Tecnico actualizado!"});
        }else{
            res.status(401).json({message:"Tecnico no actualizado!"});
        }
        
    } catch (error) {
        console.log(error.message)
    }
}
