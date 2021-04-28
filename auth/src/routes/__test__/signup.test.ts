import request from "supertest";
import { app } from "../../app";

it("Returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
});

it("Returns a 400 on invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test.com", password: "password" })
    .expect(400);
});

it("Returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "1" })
    .expect(400);
});

it("Returns a 400 on empty email and password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "", password: "" })
    .expect(400);
});

it("Block duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  // Duplicate email
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("Confirm the cookie creation", async () => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined(); // app.ts secure to edit
});
