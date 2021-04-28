import express from "express";

// Setup router
const router = express.Router();

// Action from router
router.post("/api/users/signout", (req, res) => {
  req.session = null;

  res.send({});
});

// Export the route and rename. Can't use router for all
export { router as signoutRouter };
