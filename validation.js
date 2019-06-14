const joi = require('@hapi/joi');

const registerVal = data => {
    const joischema = {
        name: joi.string().min(6).required(),
        email : joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data,joischema)    
}

const loginVal = data => {
    const joischema = {
        email : joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data,joischema)    
}



module.exports.registerVal = registerVal;
module.exports.loginVal = loginVal;