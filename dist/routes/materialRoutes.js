"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var materialController_1 = require("../controllers/materialController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.delete('/dpr', authMiddleware_1.protect, materialController_1.deleteMaterialsByDPR); // Use query param ?dprId=...
router.get('/:siteId', authMiddleware_1.protect, materialController_1.getMaterials);
router.post('/', authMiddleware_1.protect, materialController_1.createMaterial);
router.put('/:id', authMiddleware_1.protect, materialController_1.updateMaterial);
router.delete('/:id', authMiddleware_1.protect, materialController_1.deleteMaterial);
exports.default = router;
