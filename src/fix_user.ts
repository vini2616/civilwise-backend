
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from './models/User'; // Correct import relative to server/src

// Adjust path to .env: it's in server/ (one level up from src)
// __dirname in ts-node/src context will be server/src
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vini-app');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const fixUser = async () => {
    await connectDB();

    const username = 'coffin';

    // Fetch all companies to identify "Test"
    // Use 'companies' collection directly if model isn't handy, or just query generically if we don't import Company model
    const companies = await mongoose.connection.db.collection('companies').find({}).toArray();
    console.log("Available Companies:", companies.map(c => ({ id: c._id, name: c.name })));

    const user = await User.findOne({ username });
    if (!user) {
        console.log("User not found");
        process.exit(1);
    }

    console.log("Current User:", { id: user._id, name: user.name, companies: user.companies });

    // Find the company named "Test"
    const testCompany = companies.find(c => c.name === 'Test');
    if (testCompany) {
        console.log(`Found Test Company: ${testCompany._id}. Adding to user...`);

        // Use atomic update
        await User.updateOne(
            { _id: user._id },
            { $addToSet: { companies: testCompany._id } }
        );
        console.log("Update command sent.");

        const updatedUser = await User.findOne({ username });
        console.log("Updated User Companies:", updatedUser?.companies);
    } else {
        console.log("Test Company not found in DB.");
    }

    // Force close
    process.exit(0);
};

fixUser();
