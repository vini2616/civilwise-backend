"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checklistController_1 = require("../controllers/checklistController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.get('/:siteId', authMiddleware_1.protect, checklistController_1.getChecklists);
router.post('/', authMiddleware_1.protect, checklistController_1.createChecklist);
router.put('/:id', authMiddleware_1.protect, checklistController_1.updateChecklist);
router.delete('/:id', authMiddleware_1.protect, checklistController_1.deleteChecklist);
exports.default = router;
