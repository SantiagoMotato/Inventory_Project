import { check, validationResult } from 'express-validator';
import { pool } from '../database/conection.js';

export const postUbicacionesValidator = () => {
    return [
        check('ambiente')
        .isString().withMessage('El nombre del ambiente debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un ambiente!')
        .isLength({min:3}).withMessage("El ambiente deber tener al menos 3 carácteres!")
        .custom(async (value) => {
            const query = "SELECT * FROM ubicaciones WHERE ambiente = ?";
            const [result] = await pool.query(query,[value]);
            if(result.length > 0){
                throw new Error("El ambiente ya se encuentra registrado!")
            }
        }),
        check('sitio')
        .isString().withMessage('El nombre del sitio debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un sitio!')
        .isLength({min:3}).withMessage("El sitio deber tener al menos 3 carácteres!"),
        
        (request, response, next) => {
            const errores = validationResult(request);

            if (!errores.isEmpty()) {
                const chekError = errores.array().map(errores => [
                    errores.path,
                    errores.msg
                ])
                response.status(400).json({
                    msg: chekError
                })
                return;
            }
            next();
        }
    ]
}

export const putUbicacionesValidator = () => {
    return [
        check('ambiente')
        .isString().withMessage('El nombre del ambiente debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un ambiente!')
        .isLength({min:3}).withMessage("El ambiente deber tener 3!"),

        check('sitio')
        .isString().withMessage('El nombre del sitio debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un sitio!')
        .isLength({min:3}).withMessage("El sitio deber tener al menos 3 carácteres!"),
       
        (request, response, next) => {
            const errores = validationResult(request);

            if (!errores.isEmpty()) {
                const chekError = errores.array().map(errores => [
                    errores.path,
                    errores.msg
                ])
                response.status(400).json({
                    msg: chekError
                })
                return;
            }
            next();
        }
    ]
}