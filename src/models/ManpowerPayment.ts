import mongoose, { Document, Schema } from 'mongoose';

export interface IManpowerPayment extends Document {
    siteId: mongoose.Types.ObjectId;
    manpowerId: mongoose.Types.ObjectId;
    amount: number;
    date: string; // YYYY-MM-DD
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ManpowerPaymentSchema: Schema = new Schema({
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    manpowerId: { type: Schema.Types.ObjectId, ref: 'Manpower', required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    note: { type: String },
}, { timestamps: true });

export default mongoose.model<IManpowerPayment>('ManpowerPayment', ManpowerPaymentSchema);
