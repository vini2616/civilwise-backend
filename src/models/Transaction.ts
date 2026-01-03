import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    date: Date;
    amount: number;
    baseAmount?: number;
    gstRate?: number;
    gstAmount?: number;
    type: 'credit' | 'debit';
    category: string;
    description?: string;
    note?: string;
    partyName?: string;
    billNo?: string;
    mode?: 'cash' | 'online' | 'cheque';
    siteId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId; // Who created it
    billImage?: string;
    paymentProof?: string;
    isCashbook?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema: Schema = new Schema({
    date: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    baseAmount: { type: Number },
    gstRate: { type: Number },
    gstAmount: { type: Number },
    type: { type: String, enum: ['credit', 'debit', 'income', 'expense'], required: true },
    category: { type: String, required: true },
    description: { type: String },
    note: { type: String },
    partyName: { type: String },
    billNo: { type: String },
    mode: { type: String, enum: ['cash', 'online', 'cheque'], default: 'cash' },
    billImage: { type: String },
    paymentProof: { type: String },
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isCashbook: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
