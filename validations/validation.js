const Joi = require('joi');

const registrationValidations = (data)=>{
    const Schema = Joi.object({
        name: Joi.string().required().min(3),
        email : Joi.string().required().email(),
        phone: Joi.string().required().length(10).pattern(/^[0-9]+$/),
        role : Joi.string().required().valid('student','mentor','admin'),
        password: Joi.string().required().min(3),
        status: Joi.string().required().valid('active','pending','blocked')
    })
    return Schema.validate(data);
};

const loginValidations = (data)=>{
    const Schema = Joi.object({
        email : Joi.string().required().email(),
        password: Joi.string().required().min(3),
    });
    return Schema.validate(data);
}

module.exports.registrationValidations = registrationValidations;
module.exports.loginValidations = loginValidations;