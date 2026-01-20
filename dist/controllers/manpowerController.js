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
exports.deletePayment = exports.createPayment = exports.getPayments = exports.saveAttendance = exports.getAttendance = exports.deleteResource = exports.updateResource = exports.createResource = exports.getResources = void 0;
var Manpower_1 = __importDefault(require("../models/Manpower"));
var ManpowerPayment_1 = __importDefault(require("../models/ManpowerPayment"));
var ManpowerAttendance_1 = __importDefault(require("../models/ManpowerAttendance"));
// --- RESOURCES ---
var getResources = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var siteId, list, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                siteId = req.query.siteId;
                if (!siteId)
                    return [2 /*return*/, res.status(400).json({ message: 'Site ID required' })];
                return [4 /*yield*/, Manpower_1.default.find({ siteId: siteId })];
            case 1:
                list = _a.sent();
                res.json(list);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getResources = getResources;
var createResource = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resource, saved, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                resource = new Manpower_1.default(req.body);
                return [4 /*yield*/, resource.save()];
            case 1:
                saved = _a.sent();
                res.status(201).json(saved);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Create Resource Error:", error_2);
                res.status(500).json({ message: error_2.message || 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createResource = createResource;
var updateResource = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updated, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Manpower_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })];
            case 1:
                updated = _a.sent();
                res.json(updated);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateResource = updateResource;
var deleteResource = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Manpower_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                res.json({ message: 'Deleted' });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteResource = deleteResource;
// --- ATTENDANCE ---
var getAttendance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, siteId, start, end, query, list, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, siteId = _a.siteId, start = _a.start, end = _a.end;
                query = { siteId: siteId };
                if (start && end) {
                    query.date = { $gte: start, $lte: end };
                }
                return [4 /*yield*/, ManpowerAttendance_1.default.find(query)];
            case 1:
                list = _b.sent();
                res.json(list);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAttendance = getAttendance;
var saveAttendance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, siteId, date, records, updated, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, siteId = _a.siteId, date = _a.date, records = _a.records;
                return [4 /*yield*/, ManpowerAttendance_1.default.findOneAndUpdate({ siteId: siteId, date: date }, { siteId: siteId, date: date, records: records }, { new: true, upsert: true })];
            case 1:
                updated = _b.sent();
                res.json(updated);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.saveAttendance = saveAttendance;
// --- PAYMENTS ---
var getPayments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var siteId, list, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                siteId = req.query.siteId;
                if (!siteId)
                    return [2 /*return*/, res.status(400).json({ message: 'Site ID required' })];
                return [4 /*yield*/, ManpowerPayment_1.default.find({ siteId: siteId })];
            case 1:
                list = _a.sent();
                res.json(list);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPayments = getPayments;
var createPayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payment, saved, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                payment = new ManpowerPayment_1.default(req.body);
                return [4 /*yield*/, payment.save()];
            case 1:
                saved = _a.sent();
                res.status(201).json(saved);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPayment = createPayment;
var deletePayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ManpowerPayment_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                res.json({ message: 'Deleted' });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePayment = deletePayment;
