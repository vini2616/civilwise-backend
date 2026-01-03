"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var documentController_1 = require("../controllers/documentController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, documentController_1.getDocuments)
    .post(authMiddleware_1.protect, documentController_1.createDocument);
router.route('/:id')
    .get(authMiddleware_1.protect, documentController_1.getDocumentById)
    .delete(authMiddleware_1.protect, documentController_1.deleteDocument);
exports.default = router;
