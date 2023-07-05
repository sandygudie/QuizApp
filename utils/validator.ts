const Joi = require("joi");

export function loginValidation(data: {}) {
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
  });
  return schema.validate(data);
}

export function categoryValidation(data: {}) {
  
  const schema = Joi.object({
    name: Joi.string().required().trim().label("name"),
    score: Joi.number().required().label("score"),
    recentScore: Joi.number().required().label("recent score"),
  });
  return schema.validate(data);
}
