import archiver from 'archiver';
import AdmZip from 'adm-zip';
import mongoose from 'mongoose';
import Site from '../models/Site';
import Company from '../models/Company';
import Transaction from '../models/Transaction';
import SiteSettings from '../models/SiteSettings';
import Report from '../models/Report';
import ProjectTask from '../models/ProjectTask';
import Message from '../models/Message';
import Material from '../models/Material';
import ManpowerPayment from '../models/ManpowerPayment';
import ManpowerAttendance from '../models/ManpowerAttendance';
import Manpower from '../models/Manpower';
import InventoryItem from '../models/InventoryItem';
import Estimation from '../models/Estimation';
import DPR from '../models/DPR';
import Document from '../models/Document';
import CustomShape from '../models/CustomShape';
import Contact from '../models/Contact';
import Checklist from '../models/Checklist';
import Bill from '../models/Bill';
import Attendance from '../models/Attendance';
import User from '../models/User';

// Helper to get all models with siteId
const siteModels = {
    Transaction,
    SiteSettings,
    Report,
    ProjectTask,
    Message,
    Material,
    ManpowerPayment,
    ManpowerAttendance,
    Manpower,
    InventoryItem,
    Estimation,
    DPR,
    Document,
    CustomShape,
    Contact,
    Checklist,
    Bill,
    Attendance
};

export const exportSiteData = async (siteId: string) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const site = await Site.findById(siteId).lean();

    if (!site) throw new Error('Site not found');

    archive.append(JSON.stringify(site, null, 2), { name: 'site.json' });

    for (const [name, model] of Object.entries(siteModels)) {
        const data = await (model as any).find({ siteId }).lean();
        archive.append(JSON.stringify(data, null, 2), { name: `${name}.json` });
    }

    return archive;
};

export const exportCompanyData = async (companyId: string) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const company = await Company.findById(companyId).lean();

    if (!company) throw new Error('Company not found');

    archive.append(JSON.stringify(company, null, 2), { name: 'company.json' });

    // Export Sites
    const sites = await Site.find({ companyId }).lean();
    archive.append(JSON.stringify(sites, null, 2), { name: 'sites.json' });

    // Export Users (Employees)
    const users = await User.find({ companyId }).lean();
    archive.append(JSON.stringify(users, null, 2), { name: 'users.json' });

    // For each site, export its data into a subfolder
    for (const site of sites) {
        // @ts-ignore
        const siteId = site._id.toString();

        for (const [name, model] of Object.entries(siteModels)) {
            const data = await (model as any).find({ siteId }).lean();
            archive.append(JSON.stringify(data, null, 2), { name: `sites/${site.name}_${siteId}/${name}.json` });
        }
    }

    return archive;
};

export const restoreData = async (buffer: Buffer) => {
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();

    // Check if it's a Company export or Site export
    const isCompanyExport = zipEntries.some(entry => entry.entryName === 'company.json');

    const results = {
        restoredSites: 0,
        restoredCollections: 0
    };

    if (isCompanyExport) {
        // Restore Company
        const companyEntry = zip.getEntry('company.json');
        if (companyEntry) {
            const companyData = JSON.parse(companyEntry.getData().toString('utf8'));
            // Check if exists
            const existing = await Company.findById(companyData._id);
            if (!existing) {
                await Company.create(companyData);
            } else {
                // Un-delete if soft-deleted
                if (existing.deletedAt) {
                    existing.deletedAt = undefined;
                    existing.permanentDeleteAt = undefined;
                    await existing.save();
                }
            }
        }

        // Restore Users
        const usersEntry = zip.getEntry('users.json');
        if (usersEntry) {
            const usersData = JSON.parse(usersEntry.getData().toString('utf8'));
            for (const user of usersData) {
                const existing = await User.findById(user._id);
                if (!existing) await User.create(user);
            }
        }

        // Restore Sites and Site Data
        // Iterate through entries to find site data
        // Pattern: sites/SiteName_SiteId/ModelName.json
        // Or reading 'sites.json' first to know which sites to restore
        const sitesEntry = zip.getEntry('sites.json');
        if (sitesEntry) {
            const sitesData = JSON.parse(sitesEntry.getData().toString('utf8'));
            for (const site of sitesData) {
                const existing = await Site.findById(site._id);
                if (!existing) {
                    await Site.create(site);
                    results.restoredSites++;
                } else {
                    // Un-delete if soft-deleted
                    if (existing.deletedAt) {
                        existing.deletedAt = undefined;
                        existing.permanentDeleteAt = undefined;
                        await existing.save();
                        results.restoredSites++;
                    }
                }
            }
        }
    } else {
        // Site Export
        const siteEntry = zip.getEntry('site.json');
        if (siteEntry) {
            const siteData = JSON.parse(siteEntry.getData().toString('utf8'));
            const existing = await Site.findById(siteData._id);
            if (!existing) {
                await Site.create(siteData);
                results.restoredSites++;
            } else {
                // Un-delete if soft-deleted
                if (existing.deletedAt) {
                    existing.deletedAt = undefined;
                    existing.permanentDeleteAt = undefined;
                    await existing.save();
                    results.restoredSites++;
                }
            }
        }
    }

    // Restore Collections
    for (const [name, model] of Object.entries(siteModels)) {
        // Find all JSONs for this model
        // In Site export: name.json
        // In Company export: sites/Folder/name.json

        for (const entry of zipEntries) {
            if (entry.entryName.endsWith(`${name}.json`)) {
                const data = JSON.parse(entry.getData().toString('utf8'));
                if (Array.isArray(data)) {
                    for (const item of data) {
                        const existing = await (model as any).findById(item._id);
                        if (!existing) {
                            await (model as any).create(item);
                            results.restoredCollections++;
                        }
                    }
                }
            }
        }
    }

    return results;
};
