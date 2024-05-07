const brandController = require("../../controllers/brandController"); // Link to your server file
const supertest = require("supertest");
const mongoose = require("mongoose");
const request = supertest(brandController);

test("GET all brands", async () => {
  const response = await request.get("/brands");
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeDefined();
  expect(Array.isArray(response.body)).toBe(true);
});

test("GET server health check - Route not found", async () => {
  const response = await request.get("/nonexistent");
  expect(response.statusCode).toBe(404);
});
