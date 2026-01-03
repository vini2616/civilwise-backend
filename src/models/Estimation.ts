import mongoose, { Document, Schema } from 'mongoose';

export interface IEstimation extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    type: string; // 'steel', 'concrete', 'masonry', 'plaster'
    date: Date;
    items: any[]; // Array of items, structure depends on type
    // Defaults/Settings
    defaultConcreteGrade?: string;
    defaultConcreteRatio?: string;
    defaultMaterial?: string;
    defaultCustomDims?: any;
    defaultMortarRatio?: string;
    defaultPlasterRatio?: string;
    defaultPlasterThickness?: string;
    // Flooring Defaults
    defaultFlooringSize?: string; // e.g., '600x600'
    defaultBeddingThickness?: number;
    defaultFlooringRatio?: string;
    scrapStock?: any[];
}

const EstimationSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
    items: { type: [Schema.Types.Mixed], default: [] }, // Mixed type to handle different item structures

    // Settings
    defaultConcreteGrade: String,
    defaultConcreteRatio: String,
    defaultMaterial: String,
    defaultCustomDims: Schema.Types.Mixed,
    defaultMortarRatio: String,
    defaultMortarThickness: Number, // Saving as Number
    defaultPlasterRatio: String,
    defaultPlasterThickness: String,
    // Flooring
    defaultFlooringSize: String,
    defaultBeddingThickness: Number,
    defaultFlooringRatio: String,
    defaultFlooringWastage: Number,
    scrapStock: { type: [Schema.Types.Mixed], default: [] }
}, {
    timestamps: true
});

export default mongoose.model<IEstimation>('Estimation', EstimationSchema);
