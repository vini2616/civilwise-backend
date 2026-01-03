import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    name: string;
    originalName: string;
    type: string;
    size: number;
    url: string; // Data URL or S3 link (currently Data URL based on frontend)
    uploadedBy: string;
    uploadedAt: Date;
    category: string;
}

const DocumentSchema: Schema = new Schema({
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        default: 'general' // 'general' or 'drawing'
    }
});

const Doc = mongoose.model<IDocument>('Document', DocumentSchema);
export default Doc;
