import {
  createManyTestProducts,
  createTestProduct,
  createTestUser,
  getTestProduct,
  removeAllTestProducts,
  removeTestUser,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging.js";

describe("Product API Tests", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestProducts();
    await removeTestUser();
  });

  describe("POST /api/products", function () {
    it("should create a new product", async () => {
      const result = await supertest(web)
        .post("/api/products")
        .set("Authorization", "test")
        .send({
          name: "Updated Laptop",
          price: 109.0,
          stock: 5,
          description: "Updated Deskripsi produk",
          category: "Elektronik",
          imageUrl: "url foto produk",
        });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.name).toBe("Updated Laptop");
      expect(result.body.data.price).toBe(109.0);
      expect(result.body.data.stock).toBe(5);
      expect(result.body.data.description).toBe("Updated Deskripsi produk");
      expect(result.body.data.category).toBe("Elektronik");
      expect(result.body.data.imageUrl).toBe("url foto produk");
    });

    it("should reject if request is not valid", async () => {
      const result = await supertest(web)
        .post("/api/products")
        .set("Authorization", "test")
        .send({
          name: "Updated Laptop",
          price: 1090000000000000000000000000000000,
          stock: 5,
          description: "Updated Deskripsi produk",
          category: "Elektronik",
          imageUrl: "url foto produk",
        });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
    });
  });

  describe("GET /api/products/:productId", function () {
    beforeEach(async () => {
      await createTestProduct();
    });

    it("should get product by ID", async () => {
      const testProduct = await getTestProduct();

      const result = await supertest(web)
        .get("/api/products/" + testProduct.id)
        .set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testProduct.id);
      expect(result.body.data.name).toBe(testProduct.name);
      expect(result.body.data.price).toBe(testProduct.price);
      expect(result.body.data.stock).toBe(testProduct.stock);
      expect(result.body.data.description).toBe(testProduct.description);
      expect(result.body.data.category).toBe(testProduct.category);
      expect(result.body.data.imageUrl).toBe(testProduct.imageUrl);
    });

    it("should return 404 if product ID is not found", async () => {
      const testProduct = await getTestProduct();

      const result = await supertest(web)
        .get("/api/products/" + (testProduct.id + 1))
        .set("Authorization", "test");

      expect(result.status).toBe(404);
    });
  });

  describe("PUT /api/products/:productId", function () {
    beforeEach(async () => {
      await createTestProduct();
    });

    it("should update existing product", async () => {
      const testProduct = await getTestProduct();

      const result = await supertest(web)
        .put("/api/products/" + testProduct.id)
        .set("Authorization", "test")
        .send({
          name: "Updated Laptop",
          price: 109.0,
          stock: 5,
          description: "Updated Deskripsi produk",
          category: "Elektronik",
          imageUrl: "url foto produk",
        });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testProduct.id);
      expect(result.body.data.name).toBe("Updated Laptop");
      expect(result.body.data.price).toBe(109.0);
      expect(result.body.data.stock).toBe(5);
      expect(result.body.data.description).toBe("Updated Deskripsi produk");
      expect(result.body.data.category).toBe("Elektronik");
      expect(result.body.data.imageUrl).toBe("url foto produk");
    });

    it("should reject if request is invalid", async () => {
      const testProduct = await getTestProduct();

      const result = await supertest(web)
        .put("/api/products/" + testProduct.id)
        .set("Authorization", "test")
        .send({
          name: "",
          price: "",
          stock: "",
          description: "",
          category: "Elektro",
          imageUrl: "",
        });

      expect(result.status).toBe(400);
    });

    it("should reject if product is not found", async () => {
      const testProduct = await getTestProduct();

      const result = await supertest(web)
        .put("/api/products/" + (testProduct.id + 1))
        .set("Authorization", "test")
        .send({
          name: "Updated Laptop",
          price: 109.0,
          stock: 5,
          description: "Updated Deskripsi produk",
          category: "Elektronik",
          imageUrl: "url foto produk",
        });

      expect(result.status).toBe(404);
    });
  });

  describe("DELETE /api/products/:productId", function () {
    beforeEach(async () => {
      await createTestProduct();
    });

    it("should delete product by ID", async () => {
      let testProduct = await getTestProduct();
      const result = await supertest(web)
        .delete("/api/products/" + testProduct.id)
        .set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data).toBe("OK");

      testProduct = await getTestProduct();
      expect(testProduct).toBeNull();
    });

    it("should reject if product ID is not found", async () => {
      let testProduct = await getTestProduct();
      const result = await supertest(web)
        .delete("/api/products/" + (testProduct.id + 1))
        .set("Authorization", "test");

      expect(result.status).toBe(404);
    });
  });

  describe("GET /api/products", function () {
    beforeEach(async () => {
      await createManyTestProducts();
    });

    it("should search without parameters", async () => {
      const result = await supertest(web)
        .get("/api/products")
        .set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
    });

    it("should search to page 2", async () => {
      const result = await supertest(web)
        .get("/api/products")
        .query({
          page: 2,
        })
        .set("Authorization", "test");

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(5);
      expect(result.body.paging.page).toBe(2);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
    });

    it("should search using name", async () => {
      const result = await supertest(web)
        .get("/api/products")
        .query({
          name: "test 1",
        })
        .set("Authorization", "test");

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
    });

    it("should search using stock", async () => {
      const result = await supertest(web)
        .get("/api/products")
        .query({
          stock: 5,
        })
        .set("Authorization", "test");

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
    });
  });
});
