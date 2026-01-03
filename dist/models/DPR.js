"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var DPRSchema = new mongoose_1.Schema({
    siteId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectInfo: {
        projectName: { type: String, required: true },
        location: { type: String, default: '' },
        dprNo: { type: String, required: true },
        date: { type: String, required: true },
        weather: { type: String },
        temp: { type: String }
    },
    manpower: [{
            id: Number,
            trade: String,
            contractor: String,
            skilled: Number,
            unskilled: Number,
            total: Number,
            note: String
        }],
    workStarted: [{
            id: Number,
            description: String,
            location: String,
            note: String
        }],
    equipment: [{
            id: Number,
            name: String,
            qty: Number,
            hrs: Number,
            status: String,
            note: String
        }],
    materials: [{
            id: Number,
            name: String,
            unit: String,
            qty: Number,
            supplier: String,
            challanImage: String,
            synced: Boolean
        }],
    work: [{
            id: Number,
            desc: String,
            grid: String,
            qty: Number,
            unit: String,
            status: String
        }],
    reconciliation: [mongoose_1.Schema.Types.Mixed],
    planTomorrow: { type: String, default: '' },
    remarks: {
        hindrances: { type: String, default: '' },
        safety: { type: String, default: '' }
    },
    signatures: {
        prepared: { type: String, default: '' },
        reviewed: { type: String, default: '' },
        approved: { type: String, default: '' }
    },
    photos: [String]
}, {
    timestamps: true
});
// Compound index to prevent duplicate DPRs for same site/date/dprNo if needed, 
// but for now we'll just index siteId and date for faster queries
DPRSchema.index({ siteId: 1, 'projectInfo.date': -1 });
exports.default = mongoose_1.default.model('DPR', DPRSchema);
