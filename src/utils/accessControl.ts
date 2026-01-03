import { IUser } from '../models/User';
import Site from '../models/Site';
import Company from '../models/Company';
import mongoose from 'mongoose';

export const getAccessibleSiteIds = async (user: IUser): Promise<mongoose.Types.ObjectId[]> => {
    // Ensure user.sites is treated as an array of ObjectIds
    const userSiteIds = (user.sites || []).map(s => new mongoose.Types.ObjectId(s.toString()));

    if (user.permission === 'full_control' || ['Owner', 'Admin', 'Partner'].includes(user.role)) {
        // 1. Sites from the company the user is assigned to
        let assignedCompanySites: mongoose.Types.ObjectId[] = [];
        if (user.companyId) {
            const sites = await Site.find({ companyId: user.companyId }).select('_id');
            assignedCompanySites = sites.map(s => s._id as mongoose.Types.ObjectId);
        }

        // 2. Sites from companies OWNED by this user (for multi-company owners)
        let ownedCompanySites: mongoose.Types.ObjectId[] = [];
        const ownedCompanies = await Company.find({ ownerId: user._id }).select('_id');
        if (ownedCompanies.length > 0) {
            const companyIds = ownedCompanies.map(c => c._id);
            const sites = await Site.find({ companyId: { $in: companyIds } }).select('_id');
            ownedCompanySites = sites.map(s => s._id as mongoose.Types.ObjectId);
        }

        // Combine all unique site IDs
        const allSiteIds = [...userSiteIds, ...assignedCompanySites, ...ownedCompanySites];
        // Deduplicate
        const uniqueIds = Array.from(new Set(allSiteIds.map(id => id.toString()))).map(id => new mongoose.Types.ObjectId(id));

        return uniqueIds;
    } else {
        // Regular users only access assigned sites
        return userSiteIds;
    }
};

export const verifySiteAccess = async (user: IUser, siteId: string): Promise<boolean> => {
    const accessibleSites = await getAccessibleSiteIds(user);
    return accessibleSites.some(id => id.toString() === siteId.toString());
};
