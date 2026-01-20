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
exports.restoreCompanyFromTrash = exports.getDeletedCompanies = exports.restoreCompany = exports.updateCompany = exports.deleteCompany = exports.createCompany = exports.getCompanies = void 0;
var Company_1 = __importDefault(require("../models/Company"));
var archiveService_1 = require("../services/archiveService");
var multer_1 = __importDefault(require("multer"));
var upload = (0, multer_1.default)();
var getCompanies = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, query, companyIds, companies, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                console.log("getCompanies User:", user.name, user._id);
                console.log("User Companies:", user.companies);
                console.log("User CompanyID:", user.companyId);
                query = { ownerId: user._id, deletedAt: null };
                // If user belongs to a company (employee), include that company too
                if (user.companyId || (user.companies && user.companies.length > 0)) {
                    companyIds = user.companies || [];
                    if (user.companyId && !companyIds.includes(user.companyId)) {
                        companyIds.push(user.companyId);
                    }
                    query = {
                        $and: [
                            { deletedAt: null },
                            {
                                $or: [
                                    { ownerId: user._id },
                                    { _id: { $in: companyIds } }
                                ]
                            }
                        ]
                    };
                }
                return [4 /*yield*/, Company_1.default.find(query)];
            case 1:
                companies = _a.sent();
                res.json(companies);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCompanies = getCompanies;
var createCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, address, gst, mobile, email, website, accountHolderName, bankName, accountNumber, ifscCode, branch, company, createdCompany, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                console.log("Create Company Request Body:", req.body);
                // @ts-ignore
                console.log("Create Company User:", (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
                // @ts-ignore
                if (!req.user || !req.user._id) {
                    return [2 /*return*/, res.status(401).json({ message: 'User not authenticated or found' })];
                }
                _a = req.body, name_1 = _a.name, address = _a.address, gst = _a.gst, mobile = _a.mobile, email = _a.email, website = _a.website, accountHolderName = _a.accountHolderName, bankName = _a.bankName, accountNumber = _a.accountNumber, ifscCode = _a.ifscCode, branch = _a.branch;
                company = new Company_1.default({
                    name: name_1,
                    address: address || 'Head Office', // Default if empty to satisfy any lingering requirement or logical need
                    gst: gst,
                    mobile: mobile,
                    email: email,
                    website: website,
                    accountHolderName: accountHolderName,
                    bankName: bankName,
                    accountNumber: accountNumber,
                    ifscCode: ifscCode,
                    branch: branch,
                    // @ts-ignore
                    ownerId: req.user._id,
                });
                return [4 /*yield*/, company.save()];
            case 1:
                createdCompany = _c.sent();
                console.log("Company Created Successfully:", createdCompany);
                res.status(201).json(createdCompany);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                console.error("Create Company Error:", error_2);
                res.status(500).json({ message: 'Server Error', error: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCompany = createCompany;
var deleteCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var company, archive, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, Company_1.default.findById(req.params.id)];
            case 1:
                company = _a.sent();
                if (!company) return [3 /*break*/, 6];
                if (!(company.ownerId.toString() === req.user._id.toString())) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, archiveService_1.exportCompanyData)(company._id.toString())];
            case 2:
                archive = _a.sent();
                // Soft Delete
                company.deletedAt = new Date();
                company.permanentDeleteAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
                return [4 /*yield*/, company.save()];
            case 3:
                _a.sent();
                // Pipe Zip
                res.attachment("".concat(company.name, "_backup.zip"));
                archive.pipe(res);
                archive.finalize();
                return [3 /*break*/, 5];
            case 4:
                res.status(401).json({ message: 'Not authorized' });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(404).json({ message: 'Company not found' });
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                console.error(error_3);
                if (!res.headersSent)
                    res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.deleteCompany = deleteCompany;
var updateCompany = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, address, gst, mobile, email, website, accountHolderName, bankName, accountNumber, ifscCode, branch, company, updatedCompany, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, name_2 = _a.name, address = _a.address, gst = _a.gst, mobile = _a.mobile, email = _a.email, website = _a.website, accountHolderName = _a.accountHolderName, bankName = _a.bankName, accountNumber = _a.accountNumber, ifscCode = _a.ifscCode, branch = _a.branch;
                return [4 /*yield*/, Company_1.default.findById(req.params.id)];
            case 1:
                company = _b.sent();
                if (!company) return [3 /*break*/, 5];
                if (!(company.ownerId.toString() === req.user._id.toString())) return [3 /*break*/, 3];
                company.name = name_2 || company.name;
                company.address = address || company.address;
                company.gst = gst || company.gst;
                company.mobile = mobile || company.mobile;
                company.email = email || company.email;
                company.website = website || company.website;
                company.accountHolderName = accountHolderName || company.accountHolderName;
                company.bankName = bankName || company.bankName;
                company.accountNumber = accountNumber || company.accountNumber;
                company.ifscCode = ifscCode || company.ifscCode;
                company.branch = branch || company.branch;
                return [4 /*yield*/, company.save()];
            case 2:
                updatedCompany = _b.sent();
                res.json(updatedCompany);
                return [3 /*break*/, 4];
            case 3:
                res.status(401).json({ message: 'Not authorized' });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(404).json({ message: 'Company not found' });
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _b.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateCompany = updateCompany;
exports.restoreCompany = [
    upload.single('backup'),
    function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var results, error_5;
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
                    error_5 = _a.sent();
                    console.error("Restore Error:", error_5);
                    res.status(500).json({ message: 'Restore failed', error: error_5.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
];
var getDeletedCompanies = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, companies, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                return [4 /*yield*/, Company_1.default.find({
                        ownerId: user._id,
                        deletedAt: { $ne: null }
                    })];
            case 1:
                companies = _a.sent();
                res.json(companies);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDeletedCompanies = getDeletedCompanies;
var restoreCompanyFromTrash = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var company, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, Company_1.default.findOne({ _id: req.params.id })];
            case 1:
                company = _a.sent();
                if (!company) return [3 /*break*/, 5];
                if (!(company.ownerId.toString() === req.user._id.toString())) return [3 /*break*/, 3];
                company.deletedAt = undefined;
                company.permanentDeleteAt = undefined;
                return [4 /*yield*/, company.save()];
            case 2:
                _a.sent();
                res.json(company);
                return [3 /*break*/, 4];
            case 3:
                res.status(401).json({ message: 'Not authorized' });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(404).json({ message: 'Company not found' });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_7 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.restoreCompanyFromTrash = restoreCompanyFromTrash;
