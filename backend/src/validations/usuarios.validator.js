import { check, validationResult } from 'express-validator';
import { pool } from '../database/conection.js';

export const UserDataValidation = () =>{
    return [
        check('identificacion')
        .isNumeric().withMessage("La identificación debe ser numérica!")
        .notEmpty().withMessage("Por favor, ingresar un número de identificación!")
        .isLength({min:6, max:10}).withMessage("La identificación deber tener 6 a 10 carácteres!")
        .custom(async (value) => {
            const query = "SELECT * FROM usuarios WHERE identificacion = ?";
            const [result] = await pool.query(query,[value]);
            if(result.length > 0){
                throw new Error("La identificación ya está en uso!")
            }
        }),

        check('nombres')
        .isString().withMessage('Los nombres deben ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingresar un nombre!')
        .isLength({min: 4}).withMessage('Los nombres deben tener al menos cuatro caracteres!'),

        check('apellidos')
        .isString().withMessage('Los apellidos deben ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingresar un apellido!')
        .isLength({min: 4}).withMessage('Los apellidos deben tener al menos cuatro caracteres!'),

        check('email')
        .isEmail().withMessage('El correo ingresado no es válido!')
        .notEmpty().withMessage('Por favor, ingresar un correo!')
        .custom(async (value) => {
            const query = "SELECT * FROM usuarios WHERE email = ?";
            const [result] = await pool.query(query, [value]);
            if (result.length > 0) {
                throw new Error("El email ya está en uso!")
            }
        }),

        check('telefono')
        .isString().withMessage('El teléfono debe ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingresar un teléfono!')
        .isLength({min: 10, max: 10}).withMessage('El teléfono debe ser de 10 números!'),

        check('estado')
        .notEmpty().withMessage('Por favor, seleccione un estado!'),

        check('fk_tipo_usuario')
        .isNumeric().withMessage('la fk_tipo_usuario debe ser numérica')
        .notEmpty().withMessage('la fk_tipo_usuario no puede estar vacía'),

        check('fk_unidad_productiva')
        .isNumeric().withMessage('la fk_unidad_productiva debe ser numérica')
        .notEmpty().withMessage('la fk_unidad_productiva no puede estar vacía'),

        check('password')
        .isString().withMessage('La contraseña debe ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingresar un contraña!')
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos ocho caracteres!'),

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

export const UserDataValidationUpdate = () =>{
    return [
        check('identificacion')
        .isNumeric().withMessage("La identificación debe ser numérica!")
        .notEmpty().withMessage("Por favor, ingresar un número de identificación!")
        .isLength({min:6, max:10}).withMessage("La identificación deber tener 6 a 10 carácteres!"),

        check('nombres')
        .isString().withMessage('Los nombres deben ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingresar un nombre!')
        .isLength({min: 4}).withMessage('Los nombres deben tener al menos cuatro caracteres!'),

        check('apellidos')
        .isString().withMessage('Los apellidos deben ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingresar un apellido!')
        .isLength({min: 4}).withMessage('Los apellidos deben tener al menos cuatro caracteres!'),

        check('email')
        .isEmail().withMessage('El correo ingresado no es válido!')
        .notEmpty().withMessage('Por favor, ingresar un correo!'),

        check('telefono')
        .isString().withMessage('El teléfono debe ser de tipo texto!')
        .notEmpty().withMessage('Por favor, ingresar un teléfono!')
        .isLength({min: 10, max: 10}).withMessage('El teléfono debe ser de 10 números!'),

        check('estado')
        .notEmpty().withMessage('Por favor, seleccione un estado!'),

        check('fk_tipo_usuario')
        .isNumeric().withMessage('la fk_tipo_usuario debe ser numérica')
        .notEmpty().withMessage('la fk_tipo_usuario no puede estar vacía'),

        check('fk_unidad_productiva')
        .isNumeric().withMessage('la fk_unidad_productiva debe ser numérica')
        .notEmpty().withMessage('la fk_unidad_productiva no puede estar vacía'),

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