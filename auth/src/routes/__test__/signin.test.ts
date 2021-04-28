import request from "supertest";
import { app } from "../../app";

it("Returns a 400 on invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(400);
});

it("Returns a 400 on invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "BadPassword" })
    .expect(400);
});

it("Returns a 201 on valid email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined(); // app.ts secure to edit
});
