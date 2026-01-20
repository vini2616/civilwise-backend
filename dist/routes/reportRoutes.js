"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var reportController_1 = require("../controllers/reportController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.protect, reportController_1.getReports)
    .post(authMiddleware_1.protect, reportController_1.createReport);
router.route('/:id')
    .put(authMiddleware_1.protect, reportController_1.updateReport)
    .delete(authMiddleware_1.protect, reportController_1.deleteReport);
exports.default = router;
