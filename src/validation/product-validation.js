import Joi from "joi";

const createProductValidation = Joi.object({
  name: Joi.string().max(100).required(),
  price: Joi.number().required(),
  stock: Joi.number().integer().required(),
  description: Joi.string().max(100).optional(),
  category: Joi.string().max(100).required(),
  imageUrl: Joi.string().max(1000).required(),
});

const getProductValidation = Joi.number().positive().required();

const updateProductValidation = Joi.object({
  id: Joi.number().positive().required(),
  name: Joi.string().max(100).required(),
  price: Joi.number().required(),
  stock: Joi.number().integer().required(),
  description: Joi.string().max(100).optional(),
  category: Joi.string().max(100).required(),
  imageUrl: Joi.string().max(1000).required(),
});

const searchProductValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().max(100).optional(),
  price: Joi.number().optional(),
  stock: Joi.number().integer().optional(),
  description: Joi.string().max(100).optional(),
  category: Joi.string().max(100).optional(),
  imageUrl: Joi.string().max(1000).optional(),
});

const removeProductValidation = Joi.object({
  id: Joi.number().positive().required(),
});

export {
  createProductValidation,
  getProductValidation,
  updateProductValidation,
  searchProductValidation,
  removeProductValidation,
};
