"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var customShapeController_1 = require("../controllers/customShapeController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/')
    .post(authMiddleware_1.protect, customShapeController_1.createCustomShape);
router.route('/:id')
    .put(authMiddleware_1.protect, customShapeController_1.updateCustomShape)
    .delete(authMiddleware_1.protect, customShapeController_1.deleteCustomShape);
router.route('/:siteId')
    .get(authMiddleware_1.protect, customShapeController_1.getCustomShapes);
exports.default = router;
