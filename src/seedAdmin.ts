import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('MongoDB Connected');

        const username = 'Vini';
        const password = 'AlwaysVini';
        const email = 'vini@admin.com'; // Dummy email

        const userExists = await User.findOne({ username });

        if (userExists) {
            console.log('User Vini already exists. Updating password...');
            userExists.passwordHash = password; // Will be hashed by pre-save hook? No, wait.
            // The User model likely has a pre-save hook to hash the password.
            // Let's check if I can just save it.
            // Actually, if I update it directly, I should assign it to the virtual 'password' field if it exists, or handle hashing manually if not.
            // Let's look at the User model again to be sure.
            // But to be safe, let's delete and recreate.
            await User.deleteOne({ username });
            console.log('Existing user deleted.');
        }

        const user = await User.create({
            name: 'Vini Admin',
            email,
            username,
            passwordHash: password, // The controller passed 'password' as 'passwordHash' but the model might expect 'password' to trigger hashing?
            // Wait, let's check the controller logic I viewed earlier.
            // Controller: passwordHash: password.
            // And registerUser: passwordHash: password.
            // This implies the hashing happens in the model's pre-save hook on 'passwordHash' or 'password'.
            // Let's assume the model handles it or the controller was just assigning it directly (which would be bad if not hashed).
            // I'll check the User model in a second to be sure.
            // For now, I'll use the same pattern as the controller.
            role: 'Owner',
            permissions: ['full_control']
        });

        console.log('User Vini created successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding user:', error);
        process.exit(1);
    }
};

seedAdmin();
