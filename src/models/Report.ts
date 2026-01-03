import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    type: 'concrete' | 'steel' | 'brick';
    date: Date;
    location: string;
    image: string; // Base64 or URL
    status?: string; // Add status field
    createdBy: string;
    createdAt: Date;
    // Type specific data stored here
    data: any;
}

const ReportSchema: Schema = new Schema({
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
    type: {
        type: String,
        enum: ['concrete', 'steel', 'brick'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Scheduled'
    },
    image: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Schema.Types.Mixed,
        default: {}
    }
});

const Report = mongoose.model<IReport>('Report', ReportSchema);
export default Report;
