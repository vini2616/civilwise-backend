import mongoose, { Schema, Document } from 'mongoose';

export interface IBill extends Document {
    invoiceNo: string;
    date: Date;
    partyName: string;
    partyAddress?: string;
    partyGst?: string;
    partyMobile?: string;
    destination?: string;
    items: Array<{
        description: string;
        hsn?: string;
        unit?: string;
        quantity: number;
        rate: number;
        discount?: number;
        amount: number;
    }>;
    freight?: number;
    gstRate?: number;
    gstAmount?: number;
    baseAmount?: number;
    amount: number;
    note?: string;
    type: string;
    siteId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const BillSchema: Schema = new Schema({
    invoiceNo: { type: String },
    date: { type: Date, required: true, default: Date.now },
    partyName: { type: String, required: true },
    partyAddress: { type: String },
    partyGst: { type: String },
    partyMobile: { type: String },
    destination: { type: String },
    items: [{
        description: { type: String },
        hsn: { type: String },
        unit: { type: String },
        quantity: { type: Number },
        rate: { type: Number },
        discount: { type: Number },
        amount: { type: Number }
    }],
    freight: { type: Number },
    gstRate: { type: Number },
    gstAmount: { type: Number },
    baseAmount: { type: Number },
    amount: { type: Number, required: true },
    note: { type: String },
    type: { type: String, default: 'invoice' },
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IBill>('Bill', BillSchema);
