import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    passwordHash: string;
    role: string;
    mobile?: string;
    salary?: number;
    permissions: string[];
    permission: string;
    modulePermissions: Map<string, string>;
    sites: string[];
    companyId?: string;
    companies: string[];
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: false,
    },
    salary: {
        type: Number,
        required: false,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Owner', 'Admin', 'Partner', 'User', 'Manager', 'Engineer', 'Staff'],
        default: 'User',
    },
    permission: {
        type: String,
        default: 'view_edit',
    },
    modulePermissions: {
        type: Map,
        of: String,
        default: {},
    },
    permissions: {
        type: [String],
        default: [],
    },
    sites: [{
        type: Schema.Types.ObjectId,
        ref: 'Site'
    }],
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    companies: [{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (this: any) {
    if (!this.isModified('passwordHash')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
