"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var contactController_1 = require("../controllers/contactController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.get('/:siteId', authMiddleware_1.protect, contactController_1.getContacts);
router.post('/', authMiddleware_1.protect, contactController_1.createContact);
router.delete('/:id', authMiddleware_1.protect, contactController_1.deleteContact);
exports.default = router;
