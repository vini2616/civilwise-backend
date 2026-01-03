import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    siteId: mongoose.Schema.Types.ObjectId;
    senderId: string;
    senderName: string;
    type: 'text' | 'image' | 'video' | 'audio' | 'location';
    content: string;
    timestamp: Date;
}

const MessageSchema: Schema = new Schema({
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'location'],
        default: 'text'
    },
    content: {
        type: String, // Can be text or URL for media
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries by site and time
MessageSchema.index({ siteId: 1, timestamp: 1 });

const Message = mongoose.model<IMessage>('Message', MessageSchema);
export default Message;
