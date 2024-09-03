import { check, validationResult } from 'express-validator';
import { pool } from '../database/conection.js';

export const UnidadesProductivasValidation = () =>{
    return [
        check('nombre_unidad_productiva')
        .isString().withMessage('La Unidad Productiva deber ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingrese una unidad productiva!')
        .isLength({min:3}).withMessage("La unidad productiva deber tener 3 a 10 carácteres!")
        .custom(async (value) => {
            const query = "SELECT * FROM unidades_productivas WHERE nombre_unidad_productiva = ?";
            const [result] = await pool.query(query,[value]);
            if(result.length > 0){
                throw new Error("La Unidad Productiva ya se encuentra registrada!")
            }
        }),

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

export const UnidadesProductivasValidationUpdate = () =>{
    return [
        check('nombre_unidad_productiva')
        .isString().withMessage('La Unidad Productiva deber ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingrese una unidad productiva!')
        .isLength({min:3}).withMessage("La unidad productiva deber tener 3 a 10 carácteres!"),

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