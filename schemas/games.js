import yup from 'yup'

export const gameCreateSchema = yup.object({
    name:yup.string('El valor ingresado tiene que ser una palabra de al menos un caracter.')
                .min(1, 'El nombre del juego debe tener al menos un caracter.')
                .required('El juego debe tener tener un nombre.'),
    genre:yup.string('El valor ingresado tiene que ser una palabra de al menos un caracter.')
                .min(1, 'El género del juego debe tener al menos un caracter.')
                .required('Este campo es obligatorio.'),
    members:yup.array('El valor ingresado tiene que ser una lista de al menos un ítem.')
                .of(yup.string('El valor ingresado tiene que ser una palabra de al menos un caracter'))
                .min(1, 'El juego debe tener al menos un miembro.')
                .required('Este campo es obligatorio.'),
    edition: yup.number('El valor ingresado tiene que ser del tipo número')
                .min(1970, 'El número debe ser al menos 1970.')
                .max(2023, 'El número no puede ser mayor que 2023.')
                .required('Este campo es obligatorio.')
}).strict(true).noUnknown(true, 'No se permiten campos desconocidos');


export const gameUpdateSchema = yup.object({
        name:yup.string('El valor ingresado tiene que ser una palabra de al menos un caracter.')
                .min(1, 'El nombre del juego debe tener al menos un caracter.'),
        genre:yup.string('El valor ingresado tiene que ser una palabra de al menos un caracter.')
                .min(1, 'El género del juego debe tener al menos un caracter.'),
        members:yup.array('El valor ingresado tiene que ser una lista de al menos un ítem.')
                .of(yup.string('El valor ingresado tiene que ser una palabra de al menos un caracter'))
                .min(1, 'El juego debe tener al menos un miembro.'),
        edition: yup.number('El valor ingresado tiene que ser del tipo número')
                .min(1970, 'El número debe ser al menos 1970.')
                .max(2023, 'El número no puede ser mayor que 2023.')
}).strict(true).noUnknown(true, 'No se permiten campos desconocidos');

// export {
//         gameCreateSchema,
//         gameUpdateSchema
// }