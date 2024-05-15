import express from "express";
import { login } from "./jwt.mjs";

const router = express.Router();

// Login route
router.post("/login", login);

export default router;
