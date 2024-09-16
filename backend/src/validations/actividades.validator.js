import { check, validationResult } from 'express-validator';
// import { pool } from '../database/conection.js';

export const postActividadValidator = () =>{
    return [
        check('descripcion')
        .isString().withMessage('La descripción debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese una descripción!')
        .isLength({min:20}).withMessage("Por favor, ingrese una descripción más detallada!"),

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

export const putActividadValidator = () =>{
    return [
        check('descripcion')
        .isString().withMessage('La descripción debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese una descripción!')
        .isLength({min:20}).withMessage("Por favor, ingrese una descripción más detallada!"),

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