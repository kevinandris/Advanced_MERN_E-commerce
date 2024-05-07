const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const mongoose = require("mongoose");
const request = supertest(app);

test("GET server health check", async () => {
  const response = await request.get("/");
  expect(response.statusCode).toBe(200);
  expect(response.body).toStrictEqual({ STATUS: "OK" });
});

test("GET server health check - Endpoint not found", async () => {
  const response = await request.get("/nonexistent");
  expect(response.statusCode).toBe(404);
});

test("GET server health check - Internal server error", async () => {
  // Simulate an internal server error by disconnecting from the database
  await mongoose.disconnect();

  const response = await request.get("/");
  expect(response.statusCode).toBe(500);

  // Reconnect to the database
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
