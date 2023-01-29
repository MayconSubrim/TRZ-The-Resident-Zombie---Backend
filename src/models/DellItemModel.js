const joi = require('joi');

module.exports = joi.object({
    iventario_id : joi.number().required(),
    sobrevivente_id : joi.number().required()
})