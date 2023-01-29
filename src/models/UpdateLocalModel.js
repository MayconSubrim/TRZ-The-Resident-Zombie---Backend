const Joi = require("joi");

module.exports = Joi.object({
    sobrevivente_id: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
});