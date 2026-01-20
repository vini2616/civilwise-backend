"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var transactionController_1 = require("../controllers/transactionController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, transactionController_1.getTransactions).post(authMiddleware_1.protect, transactionController_1.createTransaction);
router.route('/:id').put(authMiddleware_1.protect, transactionController_1.updateTransaction).delete(authMiddleware_1.protect, transactionController_1.deleteTransaction);
exports.default = router;
