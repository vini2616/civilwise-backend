import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectTask extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    status: string; // Pending, In Progress, Completed
    assignedTo?: string;
    priority?: string;
    color?: string;
    progress?: number;
}

const ProjectTaskSchema: Schema = new Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Site', required: true },
    title: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    status: { type: String, default: 'Pending' },
    assignedTo: String,
    priority: { type: String, default: 'Medium' },
    color: { type: String, default: '#3b82f6' },
    progress: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.model<IProjectTask>('ProjectTask', ProjectTaskSchema);
