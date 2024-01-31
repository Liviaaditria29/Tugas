import { validate } from "../validation/validation.js";
import {
  createProductValidation,
  getProductValidation,
  updateProductValidation,
  removeProductValidation,
  searchProductValidation,
} from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const product = validate(createProductValidation, request);
  product.username = user.username;

  return prismaClient.product.create({
    data: product,
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      category: true,
      imageUrl: true,
    },
  });
};

const get = async (user, productId) => {
  productId = validate(getProductValidation, productId);

  const product = await prismaClient.product.findFirst({
    where: {
      username: user.username,
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      category: true,
      imageUrl: true,
    },
  });

  if (!product) {
    throw new ResponseError(404, "Product is not found");
  }

  return product;
};

const update = async (user, request) => {
  const product = validate(updateProductValidation, request);

  const totalProductInDatabase = await prismaClient.product.count({
    where: {
      username: user.username,
      id: product.id,
    },
  });

  if (totalProductInDatabase !== 1) {
    throw new ResponseError(404, "Product is not found");
  }

  return prismaClient.product.update({
    where: {
      id: product.id,
    },
    data: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      description: true,
      category: true,
      imageUrl: true,
    },
  });
};

const remove = async (user, productId) => {
  productId = validate(getProductValidation, productId);

  const totalInDatabase = await prismaClient.product.count({
    where: {
      username: user.username,
      id: productId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Product is not found");
  }

  return prismaClient.product.delete({
    where: {
      id: productId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchProductValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [
    {
      username: user.username,
    },
  ];

  if (request.name) {
    filters.push({
      name: {
        contains: request.name,
      },
    });
  }
  // Add additional filters for other fields if needed

  const products = await prismaClient.product.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.product.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: products,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
