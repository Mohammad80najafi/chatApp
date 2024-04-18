import express from "express";
const app = express();

import { logout, signup, login } from "../controllers/auth.controllers.js";

app.post("/signup", signup);

app.post("/login", login);

app.post("/logout", logout);

export default app;
