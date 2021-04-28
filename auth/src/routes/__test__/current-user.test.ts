import request from "supertest";
import { app } from "../../app";

it("Details on user", async () => {
  const cookie = await global.signin();
  /*   const initCookie = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201); */

  //const cookie = initCookie.get("Set-Cookie");

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual("test@test.com");

  // console.log(res.body); // { currentUser: null } =>  .set("Cookie", cookie) added
});

it("If null if not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});
