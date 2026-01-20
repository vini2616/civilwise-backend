"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var projectTaskController_1 = require("../controllers/projectTaskController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.get('/:siteId', authMiddleware_1.protect, projectTaskController_1.getProjectTasks);
router.post('/', authMiddleware_1.protect, projectTaskController_1.createProjectTask);
router.put('/:id', authMiddleware_1.protect, projectTaskController_1.updateProjectTask);
router.delete('/:id', authMiddleware_1.protect, projectTaskController_1.deleteProjectTask);
exports.default = router;
