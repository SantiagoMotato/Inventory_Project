import { pool } from "../database/conection.js";

export const ListarUnidadesProductivas = async (req, res) => {
  try {
    const query = "SELECT * FROM unidades_productivas";
    const [result] = await pool.query(query);

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron unidades productivas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Failure!" });
  }
};

export const ListarUnidadProductiva = async (req,res) => {
  try {
    const {id} = req.params;
    const query = `SELECT * FROM unidades_productivas WHERE id_unidad_productiva = ${id}`;
    const [result] = await pool.query(query);

    if(result.length > 0){
      res.status(200).json(result);
    }else{
      res.status(404).json({message:"Unidad Productiva Not Found"});
    }
    
  } catch (error) {
    console.log(error.message)
  }
}

export const RegistrarUnidadProductiva = async (req, res) => {
  try {
    const { nombre_unidad_productiva } = req.body;
    const query = "INSERT INTO unidades_productivas (nombre_unidad_productiva) VALUES (?)";
    const [result] = await pool.query(query, [nombre_unidad_productiva]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Unidad productiva registrada!" });
    } else {
      res.status(401).json({ message: "Unidad productiva no registrada!" });
    }
  } catch (error) {
    // res.status(500).json({ message: "Server Failure!" }, error.message);
    console.log(error.message)
  }
};

export const ActualizarUnidadProductiva = async (req,res) => {
  try {
    const {id} = req.params;
    const {nombre_unidad_productiva} = req.body;
    const query = `UPDATE unidades_productivas set nombre_unidad_productiva='${nombre_unidad_productiva}' WHERE id_unidad_productiva = ${id}`;
    const [result] = await pool.query(query);

    if(result.affectedRows > 0){
      res.status(200).json({message:"Unidad productiva actualizada!"});
    }else{
      res.status(401).json({message:"Unidad productiva no actualizada!"});
    }
    
  } catch (error) {
    console.log(error.message)
  }
}