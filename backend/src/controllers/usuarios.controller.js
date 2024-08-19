import { pool } from "../database/conection.js";
import bcrypt from 'bcrypt'

export const listarUsuarios = async (req, res) => { 
  try {
    const query = "SELECT usuarios.*, tipo_usuario.rol, unidades_productivas.nombre_unidad_productiva FROM usuarios JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = usuarios.fk_tipo_usuario JOIN unidades_productivas ON unidades_productivas.id_unidad_productiva = usuarios.fk_unidad_productiva";
    const [result] = await pool.query(query);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No Users Found!" });
    }
  } catch (error) {
    res.status(401).json({ message: "Server Failure!" }, error.message);
  }
};

export const listarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT usuarios.*, tipo_usuario.rol, unidades_productivas.nombre_unidad_productiva FROM usuarios JOIN tipo_usuario ON tipo_usuario.id_tipo_usuario = usuarios.fk_tipo_usuario JOIN unidades_productivas ON unidades_productivas.id_unidad_productiva = usuarios.fk_unidad_productiva WHERE id_usuario = ?`;
    const [result] = await pool.query(query, [id]);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message:"User Not Found!"});
    }
  } catch (error) {
    res.status(500).json({ message:"Server Failure!"}, error.message);
  }
};

export const actualizarUsuario = async (req,res) => {
  try {
    const {id} = req.params;
    const {identificacion,nombres,apellidos,email,telefono,password,estado,fk_tipo_usuario,fk_unidad_productiva} = req.body;
    
    const query = `UPDATE usuarios SET identificacion='${identificacion}',nombres='${nombres}',apellidos='${apellidos}',email='${email}',telefono='${telefono}',password='${password}',estado='${estado}',fk_tipo_usuario='${fk_tipo_usuario}',fk_unidad_productiva='${fk_unidad_productiva}' WHERE id_usuario = ${id}`;

    const [result] = await pool.query(query);

    if(result.affectedRows > 0){
      res.status(200).json({message:"Usuario actualizado!"})
    }else{
      res.status(401).json({message:"Usuario no actualizado!"})
    }
    
  } catch (error) {
      res.status(500).json({message:"Server Failure!"});
      // console.log(error.massage)
  }
};

export const registrarUsuario = async (req,res) => {
  try {
    const {identificacion,nombres,apellidos,email,telefono,password,estado,fk_tipo_usuario,fk_unidad_productiva} = req.body;

    const saltRounds = 10;
    // const encryptedPassword = await bcrypt.hash(password, saltRounds);
    // password = encryptedPassword;

    const query = `INSERT INTO usuarios (identificacion,nombres,apellidos,email,telefono,password,estado,fk_tipo_usuario,fk_unidad_productiva) VALUES (?,?,?,?,?,?,?,?,?)`
    const [result] = await pool.query(query,[identificacion,nombres,apellidos,email,telefono,password,estado,fk_tipo_usuario,fk_unidad_productiva])

    if(result.affectedRows > 0) {
      res.status(200).json({message: "Usuario registrado!"})
    }else{
      res.status(401).json({message: "Usuario No Registrado!"})
    }
  } catch (error) {
    // res.status(500).json({message: "Servr Failure!"},error.message);
    console.log(error.message)
  }
};
