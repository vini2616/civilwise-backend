import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note;
