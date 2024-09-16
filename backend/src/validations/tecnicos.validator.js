import { check, validationResult } from 'express-validator';
import { pool } from '../database/conection.js';

export const postTecnicoValidator = () => {
    return [
        check('identificacion')
        .isNumeric().withMessage('La identificación debe númerica!')
        .notEmpty().withMessage('Por favor, ingrese una identificación!')
        .isLength({min:10, max:11}).withMessage("La identificación deber constar de 10 a 11 carácteres!")
        .custom(async (value) => {
            const query = "SELECT * FROM tecnicos WHERE identificacion = ?";
            const [result] = await pool.query(query,[value]);
            if(result.length > 0){
                throw new Error("La identificación ya está en uso!")
            }
        }),

        check('nombres')
        .isString().withMessage('El nombre debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un nombre!')
        .isLength({min:4}).withMessage("El nombre deber constar de al menos 4 carácteres!"),

        check('apellidos')
        .isString().withMessage('El apellido debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un apellido!')
        .isLength({min:4}).withMessage("El apellido deber constar de al menos 4 carácteres!"),

        check('telefono')
        .isString().withMessage('El teléfono ingresado no es válido!')
        .notEmpty().withMessage('Por favor, ingrese un teléfono!')
        .isLength({min:10, max:10}).withMessage("El teléfono deber constar de 10 carácteres!"),

        check('correo')
        .isEmail().withMessage('El correo ingresado no es válido!')
        .notEmpty().withMessage('Por favor, ingresar un correo!')
        .custom(async (value) => {
            const query = "SELECT * FROM tecnicos WHERE correo = ?";
            const [result] = await pool.query(query, [value]);
            if (result.length > 0) {
                throw new Error("El correo ya está en uso!")
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

export const putTecnicoValidator = () => {
    return [
        check('identificacion')
        .isNumeric().withMessage('La identificación debe númerica!')
        .notEmpty().withMessage('Por favor, ingrese una identificación!')
        .isLength({min:10, max:11}).withMessage("La identificación deber constar de 10 a 11 carácteres!"),

        check('nombres')
        .isString().withMessage('El nombre debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un nombre!')
        .isLength({min:4}).withMessage("El nombre deber constar de al menos 4 carácteres!"),

        check('apellidos')
        .isString().withMessage('El apellido debe ser un texto!')
        .notEmpty().withMessage('Por favor, ingrese un apellido!')
        .isLength({min:4}).withMessage("El apellido deber constar de al menos 4 carácteres!"),

        check('telefono')
        .isString().withMessage('El teléfono ingresado no es válido!')
        .notEmpty().withMessage('Por favor, ingrese un teléfono!')
        .isLength({min:10, max:10}).withMessage("El teléfono deber constar de 10 carácteres!"),

        check('correo')
        .isEmail().withMessage('El correo ingresado no es válido!')
        .notEmpty().withMessage('Por favor, ingresar un correo!'),

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