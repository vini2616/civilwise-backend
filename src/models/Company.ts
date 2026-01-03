import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
    name: string;
    address: string;
    gst?: string;
    mobile: string;
    email?: string;
    website?: string;
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    branch?: string;
    ownerId: mongoose.Types.ObjectId;
    deletedAt?: Date;
    permanentDeleteAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    gst: { type: String },
    mobile: { type: String, required: true },
    email: { type: String },
    website: { type: String },
    accountHolderName: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branch: { type: String },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deletedAt: { type: Date, default: null },
    permanentDeleteAt: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.model<ICompany>('Company', CompanySchema);
