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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySiteAccess = exports.getAccessibleSiteIds = void 0;
var Site_1 = __importDefault(require("../models/Site"));
var Company_1 = __importDefault(require("../models/Company"));
var mongoose_1 = __importDefault(require("mongoose"));
var getAccessibleSiteIds = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userSiteIds, assignedCompanySites, sites, ownedCompanySites, ownedCompanies, companyIds, sites, allSiteIds, uniqueIds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userSiteIds = (user.sites || []).map(function (s) { return new mongoose_1.default.Types.ObjectId(s.toString()); });
                if (!(user.permission === 'full_control' || ['Owner', 'Admin', 'Partner'].includes(user.role))) return [3 /*break*/, 6];
                assignedCompanySites = [];
                if (!user.companyId) return [3 /*break*/, 2];
                return [4 /*yield*/, Site_1.default.find({ companyId: user.companyId }).select('_id')];
            case 1:
                sites = _a.sent();
                assignedCompanySites = sites.map(function (s) { return s._id; });
                _a.label = 2;
            case 2:
                ownedCompanySites = [];
                return [4 /*yield*/, Company_1.default.find({ ownerId: user._id }).select('_id')];
            case 3:
                ownedCompanies = _a.sent();
                if (!(ownedCompanies.length > 0)) return [3 /*break*/, 5];
                companyIds = ownedCompanies.map(function (c) { return c._id; });
                return [4 /*yield*/, Site_1.default.find({ companyId: { $in: companyIds } }).select('_id')];
            case 4:
                sites = _a.sent();
                ownedCompanySites = sites.map(function (s) { return s._id; });
                _a.label = 5;
            case 5:
                allSiteIds = __spreadArray(__spreadArray(__spreadArray([], userSiteIds, true), assignedCompanySites, true), ownedCompanySites, true);
                uniqueIds = Array.from(new Set(allSiteIds.map(function (id) { return id.toString(); }))).map(function (id) { return new mongoose_1.default.Types.ObjectId(id); });
                return [2 /*return*/, uniqueIds];
            case 6: 
            // Regular users only access assigned sites
            return [2 /*return*/, userSiteIds];
        }
    });
}); };
exports.getAccessibleSiteIds = getAccessibleSiteIds;
var verifySiteAccess = function (user, siteId) { return __awaiter(void 0, void 0, void 0, function () {
    var accessibleSites;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getAccessibleSiteIds)(user)];
            case 1:
                accessibleSites = _a.sent();
                return [2 /*return*/, accessibleSites.some(function (id) { return id.toString() === siteId.toString(); })];
        }
    });
}); };
exports.verifySiteAccess = verifySiteAccess;
