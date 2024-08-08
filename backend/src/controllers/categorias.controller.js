import { pool } from '../database/conection.js'

export const listarCategorias = async (req,res) => {
    try {
        const query = "SELECT * FROM categorias";
        const [result] = await pool.query(query);

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"No Categories Found!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const listarCategoria = async (req,res) => {
    try {
        const {id} = req.params;
        const query = `SELECT * FROM categorias WHERE id_categoria = ${id}`;
        const [result] = await pool.query(query);

        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:"Category Not Found!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const registrarCategoria = async (req,res) => {
    try {
        const {nombre_categoria} = req.body;
        const query = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
        const [result] = await pool.query(query,[nombre_categoria]);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Categoria registrada!"});
        }else{
            res.status(401).json({message:"No Categories Found!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

export const actualizarCategoria = async (req,res) => {
    try {
        const {id} = req.params;
        const {nombre_categoria} = req.body;
        const query = `UPDATE categorias SET nombre_categoria='${nombre_categoria}' WHERE id_categoria = ${id}`;
        const [result] = await pool.query(query);

        if(result.affectedRows > 0){
            res.status(200).json({message:"Categoria actualizada!"});
        }else{
            res.status(401).json({message:"Category Not Updated!"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}