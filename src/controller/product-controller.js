import productService from "../service/product-service.js";
import { logger } from "../application/logging.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await productService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;
    const result = await productService.get(user, productId);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;
    const request = { ...req.body, id: productId };

    const result = await productService.update(user, request);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.params.productId;

    await productService.remove(user, productId);
    res.status(200).json({ data: "OK" });
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      name: req.query.name,
      price: req.query.price,
      stock: req.query.stock,
      description: req.query.description,
      category: req.query.category,
      imageUrl: req.query.imageUrl,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await productService.search(user, request);
    res.status(200).json({ data: result.data, paging: result.paging });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
