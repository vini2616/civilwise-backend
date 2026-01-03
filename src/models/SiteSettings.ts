import mongoose, { Document, Schema } from 'mongoose';

// One document per site to hold all configuration arrays
export interface ISiteSettings extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    parties: string[];
    suppliers: string[];
    trades: string[];
    materialNames: string[];
    materialTypes: string[];
    customCategories: string[];
    units: string[];
    billItems: string[];
}

const SiteSettingsSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true, unique: true },
    parties: [String],
    suppliers: [String],
    trades: [String],
    materialNames: [String],
    materialTypes: [String],
    customCategories: [String],
    units: [String],
    billItems: [String]
}, {
    timestamps: true
});

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
