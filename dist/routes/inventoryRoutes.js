"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var inventoryController_1 = require("../controllers/inventoryController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.get('/:siteId', authMiddleware_1.protect, inventoryController_1.getInventory);
router.post('/', authMiddleware_1.protect, inventoryController_1.createInventoryItem);
router.put('/:id', authMiddleware_1.protect, inventoryController_1.updateInventoryItem);
router.delete('/:id', authMiddleware_1.protect, inventoryController_1.deleteInventoryItem);
exports.default = router;
