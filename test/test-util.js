// test/test-util.js

import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });

  return prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestProducts = async () => {
  await prismaClient.product.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestProduct = async () => {
  const price = parseFloat("123.45"); // Convert the price to a float
  return prismaClient.product.create({
    data: {
      username: "test",
      name: "test",
      price, // Use the converted float value
      stock: 5,
      description: "Updated Deskripsi produk",
      category: "Elektronik",
      imageUrl: "url foto produk",
    },
  });
};

export const createManyTestProducts = async () => {
  const products = [];
  for (let i = 0; i < 15; i++) {
    products.push({
      username: "test",
      name: `test ${i}`,
      price: parseFloat(`${i}.99`), // Convert the price to a float
      stock: parseInt(`${i}`), // Convert the stock to an integer
      description: `test ${i}`,
      category: `test ${i}`,
      imageUrl: `test ${i}`,
    });
  }
  return prismaClient.product.createMany({
    data: products,
  });
};

export const getTestProduct = async () => {
  const products = await prismaClient.product.findMany({
    where: {
      username: "test",
    },
  });
  return products.length > 0 ? products[0] : null;
};
