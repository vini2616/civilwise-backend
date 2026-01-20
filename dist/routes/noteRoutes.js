"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var noteController_1 = require("../controllers/noteController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, noteController_1.getNotes).post(authMiddleware_1.protect, noteController_1.createNote);
router.route('/:id').put(authMiddleware_1.protect, noteController_1.updateNote).delete(authMiddleware_1.protect, noteController_1.deleteNote);
exports.default = router;
