"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var attendanceController_1 = require("../controllers/attendanceController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.get('/:siteId', authMiddleware_1.protect, attendanceController_1.getAttendance);
router.post('/', authMiddleware_1.protect, attendanceController_1.createAttendance);
router.put('/:id', authMiddleware_1.protect, attendanceController_1.updateAttendance);
router.delete('/:id', authMiddleware_1.protect, attendanceController_1.deleteAttendance);
exports.default = router;
