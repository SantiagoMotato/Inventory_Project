import {pool} from '../database/conection.js';

export const listarMantenimientos = async(req, res) => {
    try {
        const query = "SELECT mantenimientos.*, usuarios.nombres AS nombres_user_responsable, usuarios.apellidos AS apellidos_user_responsable, equipos.nombre_equipo FROM mantenimientos JOIN usuarios ON usuarios.id_usuario = mantenimientos.fk_user_responsable JOIN equipos ON equipos.id_equipo = mantenimientos.fk_equipo";
        const [result] = await pool.query(query);

        // Formatear la fecha en el servidor (JavaScript)
        const mantenimientosConFechaFormateada = result.map(mantenimiento => ({
            ...mantenimiento,
            fecha_mantenimiento: new Date(mantenimiento.fecha_mantenimiento).toISOString().split('T')[0]
        }));

        if (result.length > 0) {
            res.status(200).json(mantenimientosConFechaFormateada);
        } else {
            res.status(404).json({ message: "No Maintenances Found!" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const listarMantenimiento = async(req,res) => {
    try {
        const {id} = req.params;
        const query = `SELECT * FROM mantenimientos WHERE id_mantenimiento = ${id}`;
        const [result] = await pool.query(query);

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"Maintenance Not Found!"})
        }
        
    } catch (error) {
        console.log(error.message)
    }
};

export const registrarMantenimiento = async(req,res) => {
    try {
        const {tipo_mantenimiento,fecha_mantenimiento,descripcion,fk_user_responsable,fk_equipo} = req.body;
        const query = "INSERT INTO mantenimientos (tipo_mantenimiento,fecha_mantenimiento,descripcion,fk_user_responsable,fk_equipo) VALUES (?,?,?,?,?)";
        const [result] = await pool.query(query,[tipo_mantenimiento,fecha_mantenimiento,descripcion,fk_user_responsable,fk_equipo]);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Mantenimiento registrado"});
        }else{
            res.status(401).json({message:"Mantenimiento no registrado"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
};

export const actualizarMantenimiento = async(req,res) => {
    try {
        const {id} = req.params;
        const {tipo_mantenimiento,fecha_mantenimiento,descripcion,fk_user_responsable,fk_equipo} = req.body;
        const query = `UPDATE mantenimientos SET tipo_mantenimiento='${tipo_mantenimiento}',fecha_mantenimiento='${fecha_mantenimiento}',descripcion='${descripcion}',fk_user_responsable='${fk_user_responsable}',fk_equipo='${fk_equipo}' WHERE id_mantenimiento = ${id}`;
        const [result] = await pool.query(query);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Mantenimiento actualizado"});
        }else{
            res.status(401).json({message:"Mantenimiento no actualizado"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
};