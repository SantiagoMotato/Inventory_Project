import { pool } from "../database/conection.js";

export const listarTipoUsuario = async (req, res) => {
  try {
    const query = "SELECT * FROM tipo_usuario";
    const [result] = await pool.query(query);

    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No User Type" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Failure!" }, error.message);
  }
};

export const registrarTipoUsuario = async (req, res) => {
  try {
    const { rol } = req.body;
    const query = "INSERT INTO tipo_usuario (rol) VALUES (?)";
    const [result] = await pool.query(query, [rol]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Tipo usuario registrado!" });
    } else {
      res.status(401).json({ message: "Tipo usuario no registrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Failure!" });
  }
};
