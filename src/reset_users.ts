import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import Company from './models/Company';

dotenv.config();

const resetUsers = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // 1. Delete all users
        console.log('Deleting all users...');
        await User.deleteMany({});
        console.log('All users deleted.');

        // 2. Create Super Admin User
        console.log('Creating Super Admin User...');
        const adminUser = await User.create({
            name: 'Vini',
            username: 'Vini',
            email: 'vini@vini.app',
            passwordHash: '0411', // Will be hashed by pre-save hook
            role: 'Owner',
            permission: 'full_control',
            permissions: ['full_control'],
            modulePermissions: {
                dpr: 'view_edit',
                attendance: 'view_edit',
                materials: 'view_edit',
                checklists: 'view_edit',
                documents: 'view_edit',
                assets: 'view_edit',
                tasks: 'view_edit',
                reports: 'view_edit',
                drawings: 'view_edit',
                chat: 'view_edit',
                team: 'view_edit',
                settings: 'view_edit',
                client: 'view_edit',
                timeline: 'view_edit',
                boq: 'view_edit',
                measurement: 'view_edit',
                billing: 'view_edit',
                inventory: 'view_edit',
                finance: 'view_edit',
                quality: 'view_edit',
                safety: 'view_edit',
                daily_log: 'view_edit',
                weather: 'view_edit',
                procurement: 'view_edit',
                tendering: 'view_edit',
                contracts: 'view_edit',
                inspections: 'view_edit',
                issues: 'view_edit',
                rfis: 'view_edit',
                submittals: 'view_edit',
                meetings: 'view_edit',
                photos: 'view_edit',
                schedule: 'view_edit',
                budget: 'view_edit',
                change_orders: 'view_edit',
                invoices: 'view_edit',
                payments: 'view_edit',
                timesheets: 'view_edit',
                equipment: 'view_edit',
                labor: 'view_edit',
                subcontractors: 'view_edit',
                suppliers: 'view_edit',
                bids: 'view_edit',
                estimates: 'view_edit',
                proposals: 'view_edit',
                leads: 'view_edit',
                crm: 'view_edit',
                marketing: 'view_edit',
                sales: 'view_edit',
                support: 'view_edit',
                analytics: 'view_edit',
                reports_analytics: 'view_edit',
                admin: 'view_edit',
                system: 'view_edit',
                audit: 'view_edit',
                compliance: 'view_edit',
                legal: 'view_edit',
                hr: 'view_edit',
                it: 'view_edit',
                operations: 'view_edit',
                strategy: 'view_edit',
                executive: 'view_edit',
                board: 'view_edit',
                investors: 'view_edit',
                partners: 'view_edit',
                vendors: 'view_edit',
                consultants: 'view_edit',
                contractors: 'view_edit',
                clients: 'view_edit',
                customers: 'view_edit',
                users: 'view_edit',
                roles: 'view_edit',
                permissions: 'view_edit',
                groups: 'view_edit',
                teams: 'view_edit',
                departments: 'view_edit',
                locations: 'view_edit',
                regions: 'view_edit',
                zones: 'view_edit',
                areas: 'view_edit',
                sites: 'view_edit',
                projects: 'view_edit',
                portfolios: 'view_edit',
                programs: 'view_edit',
                initiatives: 'view_edit',
                goals: 'view_edit',
                objectives: 'view_edit',
                kpis: 'view_edit',
                metrics: 'view_edit',
                targets: 'view_edit',
                benchmarks: 'view_edit',
                standards: 'view_edit',
                policies: 'view_edit',
                procedures: 'view_edit',
                processes: 'view_edit',
                workflows: 'view_edit',
                forms: 'view_edit',
                templates: 'view_edit',
                checklists_templates: 'view_edit',
                documents_templates: 'view_edit',
                reports_templates: 'view_edit',
                emails_templates: 'view_edit',
                notifications_templates: 'view_edit',
                messages_templates: 'view_edit',
                alerts_templates: 'view_edit',
                reminders_templates: 'view_edit',
                tasks_templates: 'view_edit',
                projects_templates: 'view_edit',
                sites_templates: 'view_edit',
                users_templates: 'view_edit',
                roles_templates: 'view_edit',
                permissions_templates: 'view_edit',
                groups_templates: 'view_edit',
                teams_templates: 'view_edit',
                departments_templates: 'view_edit',
                locations_templates: 'view_edit',
                regions_templates: 'view_edit',
                zones_templates: 'view_edit',
                areas_templates: 'view_edit',
                sites_templates_2: 'view_edit',
            }
        });
        console.log(`User created: ${adminUser.username} (${adminUser._id})`);

        // 3. Reassign all companies to this user
        console.log('Reassigning all companies to new user...');
        const updateResult = await Company.updateMany({}, { ownerId: adminUser._id });
        console.log(`Updated ${updateResult.modifiedCount} companies.`);

        // 4. If there is no company, create one?
        // The user didn't ask for this, but it might be good.
        // Let's check if there are companies.
        const companies = await Company.find({});
        if (companies.length === 0) {
            console.log('No companies found. Creating default company...');
            const newCompany = await Company.create({
                name: 'Vini Construction',
                address: 'Main Office',
                mobile: '9999999999',
                ownerId: adminUser._id
            });
            console.log(`Default company created: ${newCompany.name}`);

            // Assign user to this company
            adminUser.companyId = newCompany._id as any;
            await adminUser.save();
        } else {
            // Assign user to the first company found
            console.log(`Assigning user to company: ${companies[0].name}`);
            adminUser.companyId = companies[0]._id as any;
            await adminUser.save();
        }

        console.log('Reset complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error resetting users:', error);
        process.exit(1);
    }
};

resetUsers();
