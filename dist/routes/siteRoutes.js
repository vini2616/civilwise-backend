"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var siteController_1 = require("../controllers/siteController"); // Updated import
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
console.log('LOADING SITE ROUTES');
router.get('/deleted', authMiddleware_1.protect, siteController_1.getDeletedSites); // New route - Moved to top
router.post('/restore-trash/:id', authMiddleware_1.protect, siteController_1.restoreSiteFromTrash); // New route - Moved to top
router.route('/').get(authMiddleware_1.protect, siteController_1.getSites).post(authMiddleware_1.protect, siteController_1.createSite);
router.route('/:id').delete(authMiddleware_1.protect, siteController_1.deleteSite);
router.route('/restore').post(authMiddleware_1.protect, siteController_1.restoreSite);
exports.default = router;
