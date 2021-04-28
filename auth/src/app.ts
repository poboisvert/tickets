// Dependencies
// npmjs library module
import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@bonnethood/common";

// Session Validation
import cookieSession from "cookie-session";


const app = express();

// With cookieSession - secure
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: true, // Need a https - testing this is an issue with supertest
    //secure: process.env.NODE_ENV !== "test",
    secure: false,
  })
);
// Routers
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Async will return a promise without it return values
// Await, Async with package express-async-errors un /auth
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

// Middleware to return error messages - uniform
app.use(errorHandler);

// From BROWSER to API
/* app.get("/api/users/currentuser", (req, res) => {
  res.send("This is a working test - PAL");  
}); */

/* 
### Understand MongoDB - Start
MongoDB
User Collection
 - User #1
 - User #2 
 ### Understand MongoDB Start - End
 */

export { app };
