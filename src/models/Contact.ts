import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    companyName: string;
    mobileNumber: string;
    type: string;
    gstNumber?: string;
    address?: string;
    email?: string;
    contactPerson?: string;
}

const ContactSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    name: { type: String }, // Generic name
    companyName: { type: String }, // Legacy/Company specific
    number: { type: String }, // Generic number
    mobileNumber: { type: String }, // Legacy
    role: { type: String }, // Generic role
    type: { type: String }, // Legacy type (Vendor/Contractor)
    gstNumber: { type: String },
    address: { type: String },
    email: { type: String },
    contactPerson: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IContact>('Contact', ContactSchema);
