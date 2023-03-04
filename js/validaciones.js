export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
    } else {
        input.parentElement.classList.add('input-container--invalid');
    }
}

const mensajesDeError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vació'
    },
    email: {
        valueMissing: 'Este campo no puede estar vació',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'Este campo no puede estar vació',
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vació',
        CustomError: 'Debes que tener 18 años de edad'
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debes que tener 18 años de edad'
    }


    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());

    return (fechaActual >= diferenciaFechas);
}