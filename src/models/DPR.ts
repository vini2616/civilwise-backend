import mongoose, { Document, Schema } from 'mongoose';

export interface IDPR extends Document {
    siteId: string;
    userId: string;
    projectInfo: {
        projectName: string;
        location: string;
        dprNo: string;
        date: string;
        weather?: string;
        temp?: string;
    };
    manpower: Array<{
        id: number;
        trade: string;
        contractor: string;
        skilled: number;
        unskilled: number;
        total: number;
        note: string;
    }>;
    workStarted: Array<{
        id: number;
        description: string;
        location: string;
        note: string;
    }>;
    equipment: Array<{
        id: number;
        name: string;
        qty: number;
        hrs: number;
        status: string;
        note?: string;
    }>;
    materials: Array<{
        id: number;
        name: string;
        unit: string;
        qty: number;
        supplier: string;
        challanImage?: string;
        synced?: boolean;
    }>;
    work: Array<{
        id: number;
        desc: string;
        grid: string;
        qty: number;
        unit: string;
        status: string;
    }>;
    reconciliation: Array<any>;
    planTomorrow: string;
    remarks: {
        hindrances: string;
        safety: string;
    };
    signatures: {
        prepared: string;
        reviewed: string;
        approved: string;
    };
    photos: string[];
    createdAt: Date;
    updatedAt: Date;
}

const DPRSchema: Schema = new Schema({
    siteId: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
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
    reconciliation: [Schema.Types.Mixed],
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

export default mongoose.model<IDPR>('DPR', DPRSchema);
