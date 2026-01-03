import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomShape extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    type: string; // 'SEGMENT_BASED' or 'CUSTOM_DEFINED'
    segments: any[]; // Array of segments
    deductions: any; // Object or array for deductions
}

const CustomShapeSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, default: 'SEGMENT_BASED' },
    segments: { type: [Schema.Types.Mixed], default: [] },
    deductions: { type: Schema.Types.Mixed, default: {} }
}, {
    timestamps: true
});

export default mongoose.model<ICustomShape>('CustomShape', CustomShapeSchema);
