import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const app = express();

app.get("/:id", protectRoute, getMessages);
app.post("/send/:id", protectRoute, sendMessage);

export default app;
