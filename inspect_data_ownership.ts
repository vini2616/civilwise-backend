
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './src/config/db';
import User from './src/models/User';
import Company from './src/models/Company';
import Site from './src/models/Site';

dotenv.config();

const inspectOwnership = async () => {
    await connectDB();

    try {
        console.log('--- Inspecting User ---');
        const user = await User.findOne({ username: 'vini' });
        if (!user) {
            console.log('User "vini" NOT FOUND.');
        } else {
            console.log(`User "vini" found:`);
            console.log(` - ID: ${user._id}`);
            console.log(` - Role: ${user.role}`);
            console.log(` - Companies Array: ${user.companies}`);
            console.log(` - Company ID: ${user.companyId}`);
        }

        console.log('\n--- Inspecting Companies (First 5) ---');
        const companies = await Company.find().limit(5);
        if (companies.length === 0) {
            console.log('No companies found.');
        } else {
            companies.forEach(comp => {
                console.log(`Company: ${comp.name} (_id: ${comp._id})`);
                console.log(` - Owner ID: ${comp.ownerId}`);
                if (user && comp.ownerId && comp.ownerId.toString() !== user._id.toString()) {
                    console.log('   [MISMATCH] Owned by different ID');
                } else if (user && comp.ownerId) {
                    console.log('   [MATCH] Owned by current user');
                }
            });
        }

        console.log('\n--- Inspecting Sites (First 5) ---');
        const sites = await Site.find().limit(5);
        if (sites.length === 0) {
            console.log('No sites found.');
        } else {
            sites.forEach(site => {
                console.log(`Site: ${site.name} (_id: ${site._id})`);
                console.log(` - Company ID: ${site.companyId}`);
            });
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

inspectOwnership();
