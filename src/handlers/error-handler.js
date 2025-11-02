const STATUS = require("../handlers/status-handler");
const logger = require("../utils/logger");

function handleError(res, err) {
  const ERROR_MAP = {
    // Auth errors
    "MISSING CREDENTIALS": { msg: "Credenciales faltantes", status: STATUS.BAD_REQUEST },
    "INVALID EMAIL": { msg: "Correo electrónico inválido", status: STATUS.BAD_REQUEST },
    "INVALID PASSWORD": { msg: "Contraseña inválida", status: STATUS.BAD_REQUEST },
    "WRONG PASSWORD": { msg: "Contraseña incorrecta", status: STATUS.UNAUTHORIZED },
    "UNAUTHORIZED": { msg: "No autorizado", status: STATUS.FORBIDDEN },
    "INVALID TOKEN": { msg: "Token inválido o expirado", status: STATUS.UNAUTHORIZED },
    "TOKEN REQUIRED": { msg: "Se requiere un token", status: STATUS.UNAUTHORIZED },

    // Conflict / registration
    "ID EXISTS": { msg: "ID ya en uso", status: STATUS.CONFLICT },
    "EMAIL EXISTS": { msg: "Correo electrónico ya en uso", status: STATUS.CONFLICT },
    "RESOURCE EXISTS": { msg: "Recurso ya existe", status: STATUS.CONFLICT },

    // Permissions
    "ACCESS DENIED": { msg: "Acceso denegado", status: STATUS.FORBIDDEN },
    "USER NOT FOUND OR NOT PSYCHOLOGIST": { msg: "Usuario no encontrado o no es psicólogo", status: STATUS.FORBIDDEN },
    "INVALID ROLE": { msg: "El usuario no tiene el rol requerido", status: STATUS.FORBIDDEN },

    // Validation errors
    "INVALID PARAMS": { msg: "Parámetros inválidos", status: STATUS.BAD_REQUEST },
    "INVALID ID": { msg: "ID inválido", status: STATUS.BAD_REQUEST },
    "INVALID DOC TYPE": { msg: "Tipo de documento inválido", status: STATUS.BAD_REQUEST },
    "INVALID NAME": { msg: "Nombre inválido", status: STATUS.BAD_REQUEST },
    "INVALID LASTNAME1": { msg: "Primer apellido inválido", status: STATUS.BAD_REQUEST },
    "INVALID LASTNAME2": { msg: "Segundo apellido inválido", status: STATUS.BAD_REQUEST },
    "INVALID AGE": { msg: "Edad inválida", status: STATUS.BAD_REQUEST },
    "INVALID PHONE": { msg: "Teléfono inválido", status: STATUS.BAD_REQUEST },
    "FIELDS NOT UPDATABLE": { msg: "Algunos campos no se pueden actualizar", status: STATUS.BAD_REQUEST },
    "PASSWORD_MISMATCH": { msg: "Las contraseñas no coinciden", status: STATUS.BAD_REQUEST },

    // Not found
    "USER NOT FOUND": { msg: "Usuario no encontrado", status: STATUS.NOT_FOUND },
  };

  const key = err.message?.toUpperCase?.() || "DEFAULT";
  const { msg, status } = ERROR_MAP[key] || {
    msg: "Error interno del servidor",
    status: STATUS.INTERNAL_SERVER_ERROR,
  };

  logger.error(`Error handled: ${err.message}`, { stack: err.stack });

  return res.status(status).json({ success: false, message: msg });
}

module.exports = { handleError };
