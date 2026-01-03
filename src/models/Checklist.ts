import mongoose, { Document, Schema } from 'mongoose';

export interface IChecklist extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    name: string;
    type: string; // 'Template' or 'Instance'
    category?: string;
    items: {
        id: string | number;
        text: string;
        status: string; // Pending, Approved, Rejected
        remark?: string;
        photos?: string[];
    }[];
    status?: string; // In Progress, Completed
    progress?: number;
    date?: Date;
}

const ChecklistSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Template', 'Instance'], default: 'Instance' },
    category: String,
    items: [{
        id: mongoose.Schema.Types.Mixed,
        text: String,
        status: { type: String, default: 'Pending' },
        remark: String,
        photos: [String]
    }],
    status: { type: String, default: 'In Progress' },
    progress: { type: Number, default: 0 },
    date: Date
}, {
    timestamps: true
});

export default mongoose.model<IChecklist>('Checklist', ChecklistSchema);
