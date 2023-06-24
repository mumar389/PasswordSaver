const express = require("express");
const router = express.Router();
const userControl = require("../controller/user_controller");
const passport = require("passport");
const passSaverController = require("../controller/pass_save_controller");

router.get(
  "/verify-user",
  passport.authenticate("jwt", { session: false }),
  userControl.userHome
);
router.post("/create-user", userControl.create);
router.post("/create-session", userControl.loginUser);
router.post(
  "/save-password",
  passport.authenticate("jwt", { session: false }),
  passSaverController.savePassword
);
router.get(
  "/get-password",
  passport.authenticate("jwt", { session: false }),
  passSaverController.getPasswords
);
router.delete(
  "/delete-password/:id",
  passport.authenticate("jwt", { session: false }),
  passSaverController.deletePassKeys
);
router.get('/auth/google',
passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/auth/google/google-home',passport.authenticate('google',{
  failureRedirect:'http://localhost:3000/login'}),userControl.googleHome);
router.get('/sign-out',userControl.logout)

module.exports = router;
