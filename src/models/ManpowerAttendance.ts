import mongoose, { Document, Schema } from 'mongoose';

export interface IManpowerAttendance extends Document {
    siteId: mongoose.Types.ObjectId;
    date: string; // YYYY-MM-DD
    records: {
        manpowerId: mongoose.Types.ObjectId;
        status: 'P' | 'A' | 'HD';
        overtime?: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const ManpowerAttendanceSchema: Schema = new Schema({
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    date: { type: String, required: true },
    records: [{
        manpowerId: { type: Schema.Types.ObjectId, ref: 'Manpower' },
        status: { type: String, enum: ['P', 'A', 'HD'] },
        overtime: { type: Number, default: 0 }
    }]
}, { timestamps: true });

// Compound index to ensure one attendance record per site per date
ManpowerAttendanceSchema.index({ siteId: 1, date: 1 }, { unique: true });

export default mongoose.model<IManpowerAttendance>('ManpowerAttendance', ManpowerAttendanceSchema);
