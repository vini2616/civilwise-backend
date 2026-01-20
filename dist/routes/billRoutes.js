"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var billController_1 = require("../controllers/billController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, billController_1.getBills)
    .post(authMiddleware_1.protect, billController_1.createBill);
router.route('/:id')
    .put(authMiddleware_1.protect, billController_1.updateBill)
    .delete(authMiddleware_1.protect, billController_1.deleteBill);
exports.default = router;
