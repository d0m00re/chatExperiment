import express from 'express';
import * as controller from './../controller';

const router = express.Router();


router.get("/me", controller.getMe);

router.post("/login", controller.login);

router.post("/register", controller.register);

router.post("/forgotPassword", controller.forgotPassword);

export default router;