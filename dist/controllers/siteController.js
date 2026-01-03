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
exports.restoreSiteFromTrash = exports.getDeletedSites = exports.restoreSite = exports.deleteSite = exports.createSite = exports.getSites = void 0;
var Site_1 = __importDefault(require("../models/Site"));
var accessControl_1 = require("../utils/accessControl");
var archiveService_1 = require("../services/archiveService");
var multer_1 = __importDefault(require("multer"));
var upload = (0, multer_1.default)();
var getSites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, companyId, query, accessibleSiteIds, sites, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                user = req.user;
                companyId = req.query.companyId;
                query = { deletedAt: null };
                return [4 /*yield*/, (0, accessControl_1.getAccessibleSiteIds)(user)];
            case 1:
                accessibleSiteIds = _a.sent();
                if (accessibleSiteIds.length === 0) {
                    res.json([]);
                    return [2 /*return*/];
                }
                query._id = { $in: accessibleSiteIds };
                // If companyId was specifically requested, filter by it as well
                if (companyId) {
                    query.companyId = companyId;
                }
                return [4 /*yield*/, Site_1.default.find(query)];
            case 2:
                sites = _a.sent();
                res.json(sites);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSites = getSites;
var createSite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, address, companyId, status_1, site, createdSite, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, address = _a.address, companyId = _a.companyId, status_1 = _a.status;
                site = new Site_1.default({
                    name: name_1,
                    address: address,
                    companyId: companyId,
                    status: status_1
                });
                return [4 /*yield*/, site.save()];
            case 1:
                createdSite = _b.sent();
                res.status(201).json(createdSite);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createSite = createSite;
var deleteSite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var site, user, archive, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, Site_1.default.findById(req.params.id)];
            case 1:
                site = _a.sent();
                if (!site) return [3 /*break*/, 6];
                user = req.user;
                if (!(user.role === 'Owner' || user.role === 'Admin' || user.role === 'Partner' || user.permission === 'full_control')) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, archiveService_1.exportSiteData)(site._id.toString())];
            case 2:
                archive = _a.sent();
                // Soft Delete
                site.deletedAt = new Date();
                site.permanentDeleteAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days
                return [4 /*yield*/, site.save()];
            case 3:
                _a.sent();
                console.log("[Soft Delete] Site ".concat(site.name, " (").concat(site._id, ") deletedAt set to ").concat(site.deletedAt));
                // Send Zip
                res.attachment("".concat(site.name, "_backup.zip"));
                archive.pipe(res);
                archive.finalize();
                return [3 /*break*/, 5];
            case 4:
                res.status(401).json({ message: 'Not authorized' });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(404).json({ message: 'Site not found' });
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                console.error("Error in deleteSite:", error_3);
                if (!res.headersSent)
                    res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.deleteSite = deleteSite;
exports.restoreSite = [
    upload.single('backup'),
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var results, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!req.file) {
                        // @ts-ignore
                        return [2 /*return*/, res.status(400).json({ message: 'No file uploaded' })];
                    }
                    return [4 /*yield*/, (0, archiveService_1.restoreData)(req.file.buffer)];
                case 1:
                    results = _a.sent();
                    res.json({ message: 'Restore successful', results: results });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Restore Error:", error_4);
                    res.status(500).json({ message: 'Restore failed', error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
];
var getDeletedSites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, companyId, query, sites, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                companyId = req.query.companyId;
                // Check permissions
                if (user.role !== 'Owner' && user.role !== 'Admin' && user.permission !== 'full_control') {
                    return [2 /*return*/, res.status(401).json({ message: 'Not authorized' })];
                }
                query = { deletedAt: { $ne: null } };
                if (companyId) {
                    query.companyId = companyId;
                }
                console.log("[getDeletedSites] User: ".concat(user._id, ", Role: ").concat(user.role, ", Query:"), JSON.stringify(query));
                return [4 /*yield*/, Site_1.default.find(query)];
            case 1:
                sites = _a.sent();
                console.log("[getDeletedSites] Found ".concat(sites.length, " sites"));
                res.json(sites);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDeletedSites = getDeletedSites;
var restoreSiteFromTrash = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, site, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                user = req.user;
                // Permission check
                if (user.role !== 'Owner' && user.role !== 'Admin' && user.permission !== 'full_control') {
                    return [2 /*return*/, res.status(401).json({ message: 'Not authorized' })];
                }
                return [4 /*yield*/, Site_1.default.findById(id)];
            case 1:
                site = _a.sent();
                if (!site) {
                    return [2 /*return*/, res.status(404).json({ message: 'Site not found' })];
                }
                site.deletedAt = undefined;
                site.permanentDeleteAt = undefined;
                return [4 /*yield*/, site.save()];
            case 2:
                _a.sent();
                res.json({ message: 'Site restored successfully', site: site });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error("Error in restoreSiteFromTrash:", error_6);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.restoreSiteFromTrash = restoreSiteFromTrash;
