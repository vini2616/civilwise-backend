import mongoose, { Schema, Document } from 'mongoose';

export interface ISite extends Document {
    name: string;
    address: string;
    companyId: mongoose.Types.ObjectId;
    status: 'active' | 'completed' | 'inactive';
    deletedAt?: Date;
    permanentDeleteAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SiteSchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    status: { type: String, enum: ['active', 'completed', 'inactive'], default: 'active' },
    deletedAt: { type: Date, default: null },
    permanentDeleteAt: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model<ISite>('Site', SiteSchema);
