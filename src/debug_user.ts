import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkUser = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vini';
        console.log("Connecting to:", uri);
        await mongoose.connect(uri);
        const user = await User.findOne({ username: 'coffin' });
        console.log("User Found:", user?.name);
        console.log("User _id:", user?._id);
        console.log("User companyId:", user?.companyId);
        console.log("User companies (Raw):", user?.companies);
        console.log("User Doc:", JSON.stringify(user, null, 2));
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
