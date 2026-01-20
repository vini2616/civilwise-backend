"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chatController_1 = require("../controllers/chatController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, chatController_1.getMessages)
    .post(authMiddleware_1.protect, chatController_1.sendMessage);
router.route('/:id')
    .put(authMiddleware_1.protect, chatController_1.updateMessage)
    .delete(authMiddleware_1.protect, chatController_1.deleteMessage);
exports.default = router;
