import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    date: Date;
    workers: {
        name: string;
        role: string; // Mason, Helper, etc.
        status: string; // P, A, HD (Half Day)
        wages?: number;
        overtime?: number;
    }[];
    notes?: string;
}

const AttendanceSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    date: { type: Date, required: true },
    workers: [{
        name: String,
        role: String,
        status: String,
        wages: Number,
        overtime: Number
    }],
    notes: String
}, {
    timestamps: true
});

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
