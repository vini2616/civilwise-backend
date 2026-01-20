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
exports.deleteDocument = exports.createDocument = exports.getDocumentById = exports.getDocuments = void 0;
var Document_1 = __importDefault(require("../models/Document"));
// @desc    Get all documents for a site
// @route   GET /api/documents
// @access  Private
var getDocuments = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var siteId, category, query, documents, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                siteId = req.user.activeSite || req.query.siteId;
                if (!siteId) {
                    return [2 /*return*/, res.status(400).json({ message: 'Site ID is required' })];
                }
                category = req.query.category;
                query = { siteId: siteId };
                if (category)
                    query.category = category;
                return [4 /*yield*/, Document_1.default.find(query).select('-url').sort({ uploadedAt: -1 })];
            case 1:
                documents = _a.sent();
                res.json(documents);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Server Error', error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDocuments = getDocuments;
// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Private
var getDocumentById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Document_1.default.findById(req.params.id)];
            case 1:
                doc = _a.sent();
                if (doc) {
                    res.json(doc);
                }
                else {
                    res.status(404).json({ message: 'Document not found' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: 'Server Error', error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDocumentById = getDocumentById;
// @desc    Upload a document
// @route   POST /api/documents
// @access  Private
var createDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, originalName, type, size, url, category, siteId, newDoc, savedDoc, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, originalName = _a.originalName, type = _a.type, size = _a.size, url = _a.url, category = _a.category;
                siteId = req.user.activeSite || req.body.siteId;
                if (!siteId) {
                    return [2 /*return*/, res.status(400).json({ message: 'Site ID is required' })];
                }
                newDoc = new Document_1.default({
                    siteId: siteId,
                    name: name_1,
                    originalName: originalName,
                    type: type,
                    size: size,
                    url: url,
                    uploadedBy: req.user._id,
                    uploadedAt: new Date(),
                    category: category || 'general'
                });
                return [4 /*yield*/, newDoc.save()];
            case 1:
                savedDoc = _b.sent();
                res.status(201).json(savedDoc);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error("Create Document Error:", error_3);
                res.status(500).json({ message: error_3.message || 'Server Error', error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createDocument = createDocument;
// @desc    Delete a document
// @route   DELETE /api/documents/:id
// @access  Private
var deleteDocument = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var doc, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Document_1.default.findById(req.params.id)];
            case 1:
                doc = _a.sent();
                if (!doc) {
                    return [2 /*return*/, res.status(404).json({ message: 'Document not found' })];
                }
                return [4 /*yield*/, doc.deleteOne()];
            case 2:
                _a.sent();
                res.json({ message: 'Document removed' });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Server Error', error: error_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteDocument = deleteDocument;
