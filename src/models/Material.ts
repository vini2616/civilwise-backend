import mongoose, { Document, Schema } from 'mongoose';

export interface IMaterial extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    name: string;
    type: string; // Cement, Aggregate, etc.
    unit: string;
    quantity: number; // Current stock
    minLevel?: number; // Reorder level
    notes?: string;
}

const MaterialSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    name: { type: String, required: true },
    type: { type: String }, // 'inward', 'outward' etc.
    unit: { type: String },
    quantity: { type: Number, default: 0 },
    minLevel: { type: Number },
    notes: String,
    date: { type: String },
    supplier: { type: String },
    challanImage: { type: String },
    usedFor: { type: String }, // Usage location/purpose
    source: { type: String }, // 'DPR', 'Manual'
    dprId: { type: String }   // ID of the DPR if source is DPR
}, {
    timestamps: true
});

export default mongoose.model<IMaterial>('Material', MaterialSchema);
