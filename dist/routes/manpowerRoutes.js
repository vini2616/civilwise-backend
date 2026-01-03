"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authMiddleware_1 = require("../middleware/authMiddleware");
var manpowerController_1 = require("../controllers/manpowerController");
var router = express_1.default.Router();
// Resources (Manpower)
router.get('/resources', authMiddleware_1.protect, manpowerController_1.getResources);
router.post('/resources', authMiddleware_1.protect, manpowerController_1.createResource);
router.put('/resources/:id', authMiddleware_1.protect, manpowerController_1.updateResource);
router.delete('/resources/:id', authMiddleware_1.protect, manpowerController_1.deleteResource);
// Attendance
router.get('/attendance', authMiddleware_1.protect, manpowerController_1.getAttendance);
router.post('/attendance', authMiddleware_1.protect, manpowerController_1.saveAttendance); // Used for both create and update (Upsert)
// Payments
router.get('/payments', authMiddleware_1.protect, manpowerController_1.getPayments);
router.post('/payments', authMiddleware_1.protect, manpowerController_1.createPayment);
router.delete('/payments/:id', authMiddleware_1.protect, manpowerController_1.deletePayment);
exports.default = router;
