"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dprController_1 = require("../controllers/dprController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/')
    .post(authMiddleware_1.protect, dprController_1.createDPR);
router.route('/:siteId')
    .get(authMiddleware_1.protect, dprController_1.getDPRs);
router.route('/:id')
    .put(authMiddleware_1.protect, dprController_1.updateDPR)
    .delete(authMiddleware_1.protect, dprController_1.deleteDPR);
exports.default = router;
