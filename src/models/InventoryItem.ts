import mongoose, { Document, Schema } from 'mongoose';

export interface IInventoryItem extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    block: string;
    floor: string;
    flatNumber: string;
    type: string; // 'Residential', 'Commercial'
    area: number;
    status: string; // 'Available', 'Booked', 'Sold'
    ownerName?: string;
    ownerContact?: string;
    cost?: number;
    bookingAmount?: number;
    notes?: string;
}

const InventoryItemSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    block: { type: String, required: true },
    floor: { type: String, required: true },
    flatNumber: { type: String, required: true },
    type: { type: String, default: 'Residential' },
    area: { type: Number, default: 0 },
    status: { type: String, default: 'Available' },
    ownerName: { type: String },
    ownerContact: { type: String },
    cost: { type: Number },
    bookingAmount: { type: Number },
    notes: { type: String }
}, {
    timestamps: true
});

export default mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);
