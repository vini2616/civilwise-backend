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
exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactions = void 0;
var Transaction_1 = __importDefault(require("../models/Transaction"));
var accessControl_1 = require("../utils/accessControl");
var getTransactions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var siteId, user, query, hasAccess, accessibleSiteIds, transactions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                siteId = req.query.siteId;
                user = req.user;
                query = {};
                if (!siteId) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, accessControl_1.verifySiteAccess)(user, siteId)];
            case 1:
                hasAccess = _a.sent();
                if (!hasAccess) {
                    res.status(403).json({ message: 'Not authorized to view transactions for this site' });
                    return [2 /*return*/];
                }
                query.siteId = siteId;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, accessControl_1.getAccessibleSiteIds)(user)];
            case 3:
                accessibleSiteIds = _a.sent();
                if (accessibleSiteIds.length === 0) {
                    res.json([]);
                    return [2 /*return*/];
                }
                query.siteId = { $in: accessibleSiteIds };
                _a.label = 4;
            case 4: return [4 /*yield*/, Transaction_1.default.find(query).sort({ date: -1 })];
            case 5:
                transactions = _a.sent();
                res.json(transactions);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getTransactions = getTransactions;
var createTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, date, amount, baseAmount, gstRate, gstAmount, type, category, description, note, partyName, billNo, mode, siteId, billImage, paymentProof, userId, isCashbook, finalType, transaction, createdTransaction, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, date = _a.date, amount = _a.amount, baseAmount = _a.baseAmount, gstRate = _a.gstRate, gstAmount = _a.gstAmount, type = _a.type, category = _a.category, description = _a.description, note = _a.note, partyName = _a.partyName, billNo = _a.billNo, mode = _a.mode, siteId = _a.siteId, billImage = _a.billImage, paymentProof = _a.paymentProof, userId = _a.userId, isCashbook = _a.isCashbook;
                finalType = type;
                if (type === 'income')
                    finalType = 'credit';
                if (type === 'expense')
                    finalType = 'debit';
                transaction = new Transaction_1.default({
                    date: date,
                    amount: amount,
                    baseAmount: baseAmount,
                    gstRate: gstRate,
                    gstAmount: gstAmount,
                    type: finalType,
                    category: category,
                    description: description,
                    note: note,
                    partyName: partyName,
                    billNo: billNo,
                    mode: mode,
                    siteId: siteId,
                    billImage: billImage,
                    paymentProof: paymentProof,
                    // Use provided userId if available (for Admin adding for others), else use logged-in user
                    // @ts-ignore
                    userId: userId || req.user._id,
                    isCashbook: isCashbook || false,
                });
                return [4 /*yield*/, transaction.save()];
            case 1:
                createdTransaction = _b.sent();
                res.status(201).json(createdTransaction);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error("Create Transaction Error:", error_2);
                res.status(500).json({ message: error_2.message || 'Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createTransaction = createTransaction;
var updateTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, date, amount, baseAmount, gstRate, gstAmount, type, category, description, note, partyName, billNo, mode, billImage, paymentProof, isCashbook, transaction, finalType, updatedTransaction, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, date = _a.date, amount = _a.amount, baseAmount = _a.baseAmount, gstRate = _a.gstRate, gstAmount = _a.gstAmount, type = _a.type, category = _a.category, description = _a.description, note = _a.note, partyName = _a.partyName, billNo = _a.billNo, mode = _a.mode, billImage = _a.billImage, paymentProof = _a.paymentProof, isCashbook = _a.isCashbook;
                return [4 /*yield*/, Transaction_1.default.findById(id)];
            case 1:
                transaction = _b.sent();
                if (!transaction) {
                    res.status(404).json({ message: 'Transaction not found' });
                    return [2 /*return*/];
                }
                finalType = type;
                if (type === 'income')
                    finalType = 'credit';
                if (type === 'expense')
                    finalType = 'debit';
                transaction.date = date || transaction.date;
                transaction.amount = amount || transaction.amount;
                transaction.baseAmount = baseAmount || transaction.baseAmount;
                transaction.gstRate = gstRate || transaction.gstRate;
                transaction.gstAmount = gstAmount || transaction.gstAmount;
                transaction.type = finalType || transaction.type;
                transaction.category = category || transaction.category;
                transaction.description = description || transaction.description;
                transaction.note = note || transaction.note;
                transaction.partyName = partyName || transaction.partyName;
                transaction.billNo = billNo || transaction.billNo;
                transaction.mode = mode || transaction.mode;
                transaction.billImage = billImage || transaction.billImage;
                transaction.paymentProof = paymentProof || transaction.paymentProof;
                if (isCashbook !== undefined)
                    transaction.isCashbook = isCashbook;
                return [4 /*yield*/, transaction.save()];
            case 2:
                updatedTransaction = _b.sent();
                res.json(updatedTransaction);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateTransaction = updateTransaction;
var deleteTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, transaction, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Transaction_1.default.findById(id)];
            case 1:
                transaction = _a.sent();
                if (!transaction) {
                    res.status(404).json({ message: 'Transaction not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, transaction.deleteOne()];
            case 2:
                _a.sent();
                res.json({ message: 'Transaction removed' });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteTransaction = deleteTransaction;
