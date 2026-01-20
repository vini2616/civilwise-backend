"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
router.post('/create-user', authMiddleware_1.protect, authController_1.createUser);
router.get('/users', authMiddleware_1.protect, authController_1.getUsers);
router.post('/assign-site', authMiddleware_1.protect, authController_1.assignUserToSite);
router.post('/remove-site', authMiddleware_1.protect, authController_1.removeUserFromSite);
router.delete('/users/:id', authMiddleware_1.protect, authController_1.deleteUser);
router.put('/users/:id', authMiddleware_1.protect, authController_1.updateUser);
router.get('/verify', authMiddleware_1.protect, authController_1.verifyUser);
exports.default = router;
