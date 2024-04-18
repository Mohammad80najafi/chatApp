import express from "express";

import { getUsersForSidebar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const app = express();

app.get("/", protectRoute, getUsersForSidebar);

export default app;
