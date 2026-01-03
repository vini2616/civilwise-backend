import mongoose, { Document, Schema } from 'mongoose';

export interface IManpower extends Document {
    siteId: mongoose.Types.ObjectId;
    name: string;
    type: 'Skilled' | 'Unskilled' | 'Semi-Skilled';
    trade: string;
    rate: number;
    contractor?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ManpowerSchema: Schema = new Schema({
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Skilled', 'Unskilled', 'Semi-Skilled'], required: true },
    trade: { type: String, required: true },
    rate: { type: Number, required: true },
    contractor: { type: String },
}, { timestamps: true });

export default mongoose.model<IManpower>('Manpower', ManpowerSchema);
