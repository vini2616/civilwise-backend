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
exports.restoreData = exports.exportCompanyData = exports.exportSiteData = void 0;
var archiver_1 = __importDefault(require("archiver"));
var adm_zip_1 = __importDefault(require("adm-zip"));
var Site_1 = __importDefault(require("../models/Site"));
var Company_1 = __importDefault(require("../models/Company"));
var Transaction_1 = __importDefault(require("../models/Transaction"));
var SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
var Report_1 = __importDefault(require("../models/Report"));
var ProjectTask_1 = __importDefault(require("../models/ProjectTask"));
var Message_1 = __importDefault(require("../models/Message"));
var Material_1 = __importDefault(require("../models/Material"));
var ManpowerPayment_1 = __importDefault(require("../models/ManpowerPayment"));
var ManpowerAttendance_1 = __importDefault(require("../models/ManpowerAttendance"));
var Manpower_1 = __importDefault(require("../models/Manpower"));
var InventoryItem_1 = __importDefault(require("../models/InventoryItem"));
var Estimation_1 = __importDefault(require("../models/Estimation"));
var DPR_1 = __importDefault(require("../models/DPR"));
var Document_1 = __importDefault(require("../models/Document"));
var CustomShape_1 = __importDefault(require("../models/CustomShape"));
var Contact_1 = __importDefault(require("../models/Contact"));
var Checklist_1 = __importDefault(require("../models/Checklist"));
var Bill_1 = __importDefault(require("../models/Bill"));
var Attendance_1 = __importDefault(require("../models/Attendance"));
var User_1 = __importDefault(require("../models/User"));
// Helper to get all models with siteId
var siteModels = {
    Transaction: Transaction_1.default,
    SiteSettings: SiteSettings_1.default,
    Report: Report_1.default,
    ProjectTask: ProjectTask_1.default,
    Message: Message_1.default,
    Material: Material_1.default,
    ManpowerPayment: ManpowerPayment_1.default,
    ManpowerAttendance: ManpowerAttendance_1.default,
    Manpower: Manpower_1.default,
    InventoryItem: InventoryItem_1.default,
    Estimation: Estimation_1.default,
    DPR: DPR_1.default,
    Document: Document_1.default,
    CustomShape: CustomShape_1.default,
    Contact: Contact_1.default,
    Checklist: Checklist_1.default,
    Bill: Bill_1.default,
    Attendance: Attendance_1.default
};
var exportSiteData = function (siteId) { return __awaiter(void 0, void 0, void 0, function () {
    var archive, site, _i, _a, _b, name_1, model, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
                return [4 /*yield*/, Site_1.default.findById(siteId).lean()];
            case 1:
                site = _c.sent();
                if (!site)
                    throw new Error('Site not found');
                archive.append(JSON.stringify(site, null, 2), { name: 'site.json' });
                _i = 0, _a = Object.entries(siteModels);
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                _b = _a[_i], name_1 = _b[0], model = _b[1];
                return [4 /*yield*/, model.find({ siteId: siteId }).lean()];
            case 3:
                data = _c.sent();
                archive.append(JSON.stringify(data, null, 2), { name: "".concat(name_1, ".json") });
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, archive];
        }
    });
}); };
exports.exportSiteData = exportSiteData;
var exportCompanyData = function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
    var archive, company, sites, users, _i, sites_1, site, siteId, _a, _b, _c, name_2, model, data;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                archive = (0, archiver_1.default)('zip', { zlib: { level: 9 } });
                return [4 /*yield*/, Company_1.default.findById(companyId).lean()];
            case 1:
                company = _d.sent();
                if (!company)
                    throw new Error('Company not found');
                archive.append(JSON.stringify(company, null, 2), { name: 'company.json' });
                return [4 /*yield*/, Site_1.default.find({ companyId: companyId }).lean()];
            case 2:
                sites = _d.sent();
                archive.append(JSON.stringify(sites, null, 2), { name: 'sites.json' });
                return [4 /*yield*/, User_1.default.find({ companyId: companyId }).lean()];
            case 3:
                users = _d.sent();
                archive.append(JSON.stringify(users, null, 2), { name: 'users.json' });
                _i = 0, sites_1 = sites;
                _d.label = 4;
            case 4:
                if (!(_i < sites_1.length)) return [3 /*break*/, 9];
                site = sites_1[_i];
                siteId = site._id.toString();
                _a = 0, _b = Object.entries(siteModels);
                _d.label = 5;
            case 5:
                if (!(_a < _b.length)) return [3 /*break*/, 8];
                _c = _b[_a], name_2 = _c[0], model = _c[1];
                return [4 /*yield*/, model.find({ siteId: siteId }).lean()];
            case 6:
                data = _d.sent();
                archive.append(JSON.stringify(data, null, 2), { name: "sites/".concat(site.name, "_").concat(siteId, "/").concat(name_2, ".json") });
                _d.label = 7;
            case 7:
                _a++;
                return [3 /*break*/, 5];
            case 8:
                _i++;
                return [3 /*break*/, 4];
            case 9: return [2 /*return*/, archive];
        }
    });
}); };
exports.exportCompanyData = exportCompanyData;
var restoreData = function (buffer) { return __awaiter(void 0, void 0, void 0, function () {
    var zip, zipEntries, isCompanyExport, results, companyEntry, companyData, existing, usersEntry, usersData, _i, usersData_1, user, existing, sitesEntry, sitesData, _a, sitesData_1, site, existing, siteEntry, siteData, existing, _b, _c, _d, name_3, model, _e, zipEntries_1, entry, data, _f, data_1, item, existing;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                zip = new adm_zip_1.default(buffer);
                zipEntries = zip.getEntries();
                isCompanyExport = zipEntries.some(function (entry) { return entry.entryName === 'company.json'; });
                results = {
                    restoredSites: 0,
                    restoredCollections: 0
                };
                if (!isCompanyExport) return [3 /*break*/, 18];
                companyEntry = zip.getEntry('company.json');
                if (!companyEntry) return [3 /*break*/, 5];
                companyData = JSON.parse(companyEntry.getData().toString('utf8'));
                return [4 /*yield*/, Company_1.default.findById(companyData._id)];
            case 1:
                existing = _g.sent();
                if (!!existing) return [3 /*break*/, 3];
                return [4 /*yield*/, Company_1.default.create(companyData)];
            case 2:
                _g.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!existing.deletedAt) return [3 /*break*/, 5];
                existing.deletedAt = undefined;
                existing.permanentDeleteAt = undefined;
                return [4 /*yield*/, existing.save()];
            case 4:
                _g.sent();
                _g.label = 5;
            case 5:
                usersEntry = zip.getEntry('users.json');
                if (!usersEntry) return [3 /*break*/, 10];
                usersData = JSON.parse(usersEntry.getData().toString('utf8'));
                _i = 0, usersData_1 = usersData;
                _g.label = 6;
            case 6:
                if (!(_i < usersData_1.length)) return [3 /*break*/, 10];
                user = usersData_1[_i];
                return [4 /*yield*/, User_1.default.findById(user._id)];
            case 7:
                existing = _g.sent();
                if (!!existing) return [3 /*break*/, 9];
                return [4 /*yield*/, User_1.default.create(user)];
            case 8:
                _g.sent();
                _g.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 6];
            case 10:
                sitesEntry = zip.getEntry('sites.json');
                if (!sitesEntry) return [3 /*break*/, 17];
                sitesData = JSON.parse(sitesEntry.getData().toString('utf8'));
                _a = 0, sitesData_1 = sitesData;
                _g.label = 11;
            case 11:
                if (!(_a < sitesData_1.length)) return [3 /*break*/, 17];
                site = sitesData_1[_a];
                return [4 /*yield*/, Site_1.default.findById(site._id)];
            case 12:
                existing = _g.sent();
                if (!!existing) return [3 /*break*/, 14];
                return [4 /*yield*/, Site_1.default.create(site)];
            case 13:
                _g.sent();
                results.restoredSites++;
                return [3 /*break*/, 16];
            case 14:
                if (!existing.deletedAt) return [3 /*break*/, 16];
                existing.deletedAt = undefined;
                existing.permanentDeleteAt = undefined;
                return [4 /*yield*/, existing.save()];
            case 15:
                _g.sent();
                results.restoredSites++;
                _g.label = 16;
            case 16:
                _a++;
                return [3 /*break*/, 11];
            case 17: return [3 /*break*/, 23];
            case 18:
                siteEntry = zip.getEntry('site.json');
                if (!siteEntry) return [3 /*break*/, 23];
                siteData = JSON.parse(siteEntry.getData().toString('utf8'));
                return [4 /*yield*/, Site_1.default.findById(siteData._id)];
            case 19:
                existing = _g.sent();
                if (!!existing) return [3 /*break*/, 21];
                return [4 /*yield*/, Site_1.default.create(siteData)];
            case 20:
                _g.sent();
                results.restoredSites++;
                return [3 /*break*/, 23];
            case 21:
                if (!existing.deletedAt) return [3 /*break*/, 23];
                existing.deletedAt = undefined;
                existing.permanentDeleteAt = undefined;
                return [4 /*yield*/, existing.save()];
            case 22:
                _g.sent();
                results.restoredSites++;
                _g.label = 23;
            case 23:
                _b = 0, _c = Object.entries(siteModels);
                _g.label = 24;
            case 24:
                if (!(_b < _c.length)) return [3 /*break*/, 32];
                _d = _c[_b], name_3 = _d[0], model = _d[1];
                _e = 0, zipEntries_1 = zipEntries;
                _g.label = 25;
            case 25:
                if (!(_e < zipEntries_1.length)) return [3 /*break*/, 31];
                entry = zipEntries_1[_e];
                if (!entry.entryName.endsWith("".concat(name_3, ".json"))) return [3 /*break*/, 30];
                data = JSON.parse(entry.getData().toString('utf8'));
                if (!Array.isArray(data)) return [3 /*break*/, 30];
                _f = 0, data_1 = data;
                _g.label = 26;
            case 26:
                if (!(_f < data_1.length)) return [3 /*break*/, 30];
                item = data_1[_f];
                return [4 /*yield*/, model.findById(item._id)];
            case 27:
                existing = _g.sent();
                if (!!existing) return [3 /*break*/, 29];
                return [4 /*yield*/, model.create(item)];
            case 28:
                _g.sent();
                results.restoredCollections++;
                _g.label = 29;
            case 29:
                _f++;
                return [3 /*break*/, 26];
            case 30:
                _e++;
                return [3 /*break*/, 25];
            case 31:
                _b++;
                return [3 /*break*/, 24];
            case 32: return [2 /*return*/, results];
        }
    });
}); };
exports.restoreData = restoreData;
