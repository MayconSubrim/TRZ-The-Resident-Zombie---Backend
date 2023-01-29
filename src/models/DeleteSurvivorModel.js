const joi = require('joi');

module.exports = joi.object({
    sobrevivente_id : joi.number().required()
})