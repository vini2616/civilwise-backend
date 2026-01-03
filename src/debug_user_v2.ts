import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Adjust path to point to server/.env from server/src/
// __dirname is server/src
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vini-app';
        console.log(`Connecting to: ${mongoUri.split('@')[1] || 'localhost'}`);
        const conn = await mongoose.connect(mongoUri);
        const user = await User.findOne({ username: 'coffin' });

        const result = {
            user: user ? user.toJSON() : null,
            env: process.env.MONGO_URI ? 'Set' : 'Unset'
        };

        fs.writeFileSync('debug_result.json', JSON.stringify(result, null, 2));
        console.log("Written to debug_result.json");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
