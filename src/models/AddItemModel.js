const joi = require('joi');

module.exports = joi.object({
    item : joi.array().items(joi.string()).required(),
    sobrevivente_id : joi.number().required()
})