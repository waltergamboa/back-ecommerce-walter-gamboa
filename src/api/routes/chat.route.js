const express = require("express");
const { Router } = express;
const { ChatController } = require("../controllers/chat.controller");
const { checkAuth } = require("../../middlewares/passport/passport.middleware");

class ChatRouter {
  constructor() {
    this.chatController = new ChatController();
    this.router = Router();
  }

  init() {
    this.router.get("/", checkAuth, this.chatController.getAll);
    this.router.get("/:email", checkAuth, this.chatController.getByEmail);

    return this.router;
  }
}

module.exports = { ChatRouter };
