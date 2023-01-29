const Joi = require("joi");

module.exports = Joi.object({
    nome: Joi.string().required(),
    idade: Joi.number().required(),
    genero: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    Status: Joi.string().required(),
    item : Joi.array().items(Joi.string()).required()
});