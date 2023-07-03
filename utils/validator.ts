const Joi = require("joi");

function loginValidation(data: {}) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(20)
      .required()
      .trim()
      .label("username"),
    userId: Joi.alternatives().conditional(Joi.string(), {
      then: Joi.string().trim(),
      otherwise: Joi.any(),
    }),
    // .rule({ message: 'Number must be between 1 and 10' })
    // .messages({ 'any.only': '{{#label}} does not match' }),
  });
  return schema.validate(data);
}

export default loginValidation;
