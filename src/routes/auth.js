const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const { register, login, githubCallback } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

// GitHub OAuth routes
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/api/v1/auth/login",
  }),
  githubCallback
);

module.exports = router;
