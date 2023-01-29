const Joi = require("joi");

module.exports = Joi.object({
    id_denuciante: Joi.number().required(),
    id_denunciado: Joi.number().required()
});