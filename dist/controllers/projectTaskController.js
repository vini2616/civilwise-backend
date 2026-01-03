"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectTask = exports.updateProjectTask = exports.createProjectTask = exports.getProjectTasks = void 0;
var ProjectTask_1 = __importDefault(require("../models/ProjectTask"));
var accessControl_1 = require("../utils/accessControl");
// @desc    Get all tasks for a site
// @route   GET /api/project-tasks/:siteId
// @access  Private
var getProjectTasks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var siteId, user, hasAccess, tasks, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                siteId = req.params.siteId;
                user = req.user;
                return [4 /*yield*/, (0, accessControl_1.verifySiteAccess)(user, siteId)];
            case 1:
                hasAccess = _a.sent();
                if (!hasAccess) {
                    res.status(403).json({ message: 'Not authorized to view tasks for this site' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, ProjectTask_1.default.find({ siteId: siteId }).sort({ startDate: 1 })];
            case 2:
                tasks = _a.sent();
                res.json(tasks);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Server Error', error: error_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProjectTasks = getProjectTasks;
// @desc    Create a new task
// @route   POST /api/project-tasks
// @access  Private
var createProjectTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, siteId, title, description, startDate, endDate, status_1, assignedTo, priority, color, progress, user, hasAccess, task, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, siteId = _a.siteId, title = _a.title, description = _a.description, startDate = _a.startDate, endDate = _a.endDate, status_1 = _a.status, assignedTo = _a.assignedTo, priority = _a.priority, color = _a.color, progress = _a.progress;
                user = req.user;
                if (!siteId) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, accessControl_1.verifySiteAccess)(user, siteId)];
            case 1:
                hasAccess = _b.sent();
                if (!hasAccess) {
                    res.status(403).json({ message: 'Not authorized to create tasks for this site' });
                    return [2 /*return*/];
                }
                return [3 /*break*/, 3];
            case 2:
                res.status(400).json({ message: 'Site ID is required' });
                return [2 /*return*/];
            case 3: return [4 /*yield*/, ProjectTask_1.default.create({
                    siteId: siteId,
                    title: title,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                    status: status_1,
                    assignedTo: assignedTo,
                    priority: priority,
                    color: color,
                    progress: progress
                })];
            case 4:
                task = _b.sent();
                res.status(201).json(task);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                res.status(500).json({ message: 'Server Error', error: error_2.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createProjectTask = createProjectTask;
// @desc    Update a task
// @route   PUT /api/project-tasks/:id
// @access  Private
var updateProjectTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, task, hasAccess, updatedTask, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                user = req.user;
                return [4 /*yield*/, ProjectTask_1.default.findById(id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    res.status(404).json({ message: 'Task not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, accessControl_1.verifySiteAccess)(user, task.siteId.toString())];
            case 2:
                hasAccess = _a.sent();
                if (!hasAccess) {
                    res.status(403).json({ message: 'Not authorized to update this task' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, ProjectTask_1.default.findByIdAndUpdate(id, req.body, { new: true })];
            case 3:
                updatedTask = _a.sent();
                res.json(updatedTask);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                res.status(500).json({ message: 'Server Error', error: error_3.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateProjectTask = updateProjectTask;
// @desc    Delete a task
// @route   DELETE /api/project-tasks/:id
// @access  Private
var deleteProjectTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, task, hasAccess, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                user = req.user;
                return [4 /*yield*/, ProjectTask_1.default.findById(id)];
            case 1:
                task = _a.sent();
                if (!task) {
                    res.status(404).json({ message: 'Task not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, accessControl_1.verifySiteAccess)(user, task.siteId.toString())];
            case 2:
                hasAccess = _a.sent();
                if (!hasAccess) {
                    res.status(403).json({ message: 'Not authorized to delete this task' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, task.deleteOne()];
            case 3:
                _a.sent();
                res.json({ message: 'Task removed' });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Server Error', error: error_4.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteProjectTask = deleteProjectTask;
