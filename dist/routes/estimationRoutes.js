"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var estimationController_1 = require("../controllers/estimationController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.get('/:siteId', authMiddleware_1.protect, estimationController_1.getEstimations);
router.post('/', authMiddleware_1.protect, estimationController_1.createEstimation);
router.put('/:id', authMiddleware_1.protect, estimationController_1.updateEstimation);
router.delete('/:id', authMiddleware_1.protect, estimationController_1.deleteEstimation);
exports.default = router;
