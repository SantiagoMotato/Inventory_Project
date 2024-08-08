import { pool } from "../database/conection.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const validationUserData = async(req,res) => {
    try {
        const {email,password} = req.body;
        const query = `SELECT usuarios. *, fk_tipo_usuario AS rol, nombres, unidades_productivas.nombre_unidad_productiva AS unidad_productiva, unidades_productivas.id_unidad_productiva, password FROM usuarios JOIN unidades_productivas ON unidades_productivas.id_unidad_productiva = usuarios.fk_unidad_productiva WHERE email = ?`;

        const [result] = await pool.query(query,[email]);
        console.log(result[0]);

        if(result.length > 0){
            const user = result[0];

            const passwordValidation = await bcrypt.compare(password, user.password);
            // console.log("Password validation result: ", passwordValidation);

            if(passwordValidation) {
                const token = jwt.sign({user: user.rol}, process.env.SECRET, {expiresIn: process.env.TIME});
                return res.status(200).json({
                    "message":"User Authorized!",
                    "token": token,
                    "usuario": user.id_usuario,
                    "user": user.rol,
                    "unidad_productiva": user.unidad_productiva,
                    "nombres": user.nombres,
                    "id_unidad_productiva": user.id_unidad_productiva,
                    "estado": user.estado
                });

            }else{
                res.status(400).json({message:"User Not Authorized!"});
            }

        }else{
            res.status(404).json({message:"User Not Found!"});
        }

    } catch (error) {
        res.status(500).json({message:"Server Failure!"});
        console.log(error.message);
    }
};

export const validationToken = async(req,res,next) => {
    try {
        const token_user = req.headers["token"];
        if(!token_user) {
            return res.status(402).json({message:"Token Required!"});
        }else{
            jwt.verify(token_user, process.env.SECRET, (error, decoded) => {
                if(error) {
                    return res.status(402).json({message:"Token Invalid!"});
                } else {
                    next();
                }
            })
        }

    } catch (error) {
        console.log(error.message);
    }
};
