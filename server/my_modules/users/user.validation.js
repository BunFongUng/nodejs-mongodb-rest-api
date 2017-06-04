import Joi from 'joi';
export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export default {
    signUp: {
       body: {
            email: Joi.string().email().required(),
            password: Joi.string().regex(passwordReg).required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            user_name: Joi.string().required()
       }
    }
}

