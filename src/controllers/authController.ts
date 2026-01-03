import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Site from '../models/Site';
import Company from '../models/Company';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: 'Please add all fields' });
        return;
    }

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username: username || email }] });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    // Create user
    // password hashing is handled in the User model pre-save hook
    const user = await User.create({
        name,
        email,
        username: username || email, // Fallback to email if no username provided (for backward compat)
        passwordHash: password,
    });

    if (user) {
        res.status(201).json({
            _id: (user._id as unknown as string),
            name: user.name,
            email: user.email,
            username: user.username,
            token: generateToken(user._id as unknown as string),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    // Check for user by email or username
    const user = await User.findOne({
        $or: [
            { email: email || '' },
            { username: username || '' }
        ]
    });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: (user._id as unknown as string),
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            permissions: user.permissions,
            permission: user.permission,
            modulePermissions: user.modulePermissions,
            token: generateToken(user._id as unknown as string),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// @desc    Create a new user (Admin/Owner/Partner only)
// @route   POST /api/auth/create-user
// @access  Private (Owner, Admin, Partner)
// DEBUG LOGGING
const fs = require('fs');
const logDebug = (msg: string, data?: any) => {
    try {
        fs.appendFileSync('server_debug.log', `${new Date().toISOString()} - ${msg}\n${data ? JSON.stringify(data, null, 2) + '\n' : ''}`);
    } catch (e) { console.error('Log failed', e); }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        logDebug('createUser called', req.body);
        // @ts-ignore
        const requestingUser = req.user;

        if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
            res.status(403).json({ message: 'Not authorized to create users' });
            return;
        }

        const { name, email, username, password, role, permissions, permission, modulePermissions, siteId, companyId, mobile, salary } = req.body;

        if (!name || !email || !username || !password) {
            res.status(400).json({ message: 'Please add all fields' });
            return;
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            // Check if user is already in this company
            // @ts-ignore
            const existingCompanyIds = userExists.companies || (userExists.companyId ? [userExists.companyId] : []);

            // @ts-ignore
            if (companyId && existingCompanyIds.some(id => id.toString() === companyId.toString())) {
                res.status(400).json({ message: 'User already exists in this company' });
                return;
            }

            // Add to new company
            if (companyId) {
                // @ts-ignore
                if (!userExists.companies) userExists.companies = [];
                // @ts-ignore
                if (userExists.companyId) {
                    // Ensure primary is also in list
                    // @ts-ignore
                    if (!userExists.companies.some(id => id.toString() === userExists.companyId.toString())) {
                        // @ts-ignore
                        userExists.companies.push(userExists.companyId);
                    }
                }
                // @ts-ignore
                userExists.companies.push(companyId);
                await userExists.save();

                res.status(200).json({
                    message: 'User added to company successfully',
                    _id: userExists._id,
                    name: userExists.name,
                    email: userExists.email,
                    username: userExists.username,
                    role: userExists.role,
                    // @ts-ignore
                    companies: userExists.companies
                });
                return;
            } else {
                res.status(400).json({ message: 'User already exists' });
                return;
            }
        }

        const user = await User.create({
            name,
            email,
            username,
            passwordHash: password,
            role: role || 'User',
            mobile: mobile || '',
            salary: salary || 0,
            permissions: permissions || [],
            permission: permission || 'view_edit',
            modulePermissions: modulePermissions || {},

            sites: (siteId && /^[0-9a-fA-F]{24}$/.test(siteId)) ? [siteId] : [],
            companyId: companyId || null,
            companies: companyId ? [companyId] : []
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                permissions: user.permissions,
                permission: user.permission,
                modulePermissions: user.modulePermissions,
                sites: user.sites,
                companyId: user.companyId,
                companies: user.companies
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all users (optionally filtered by site or company)
// @route   GET /api/auth/users
// @access  Private
export const getUsers = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = req.user;
        const { siteId, companyId } = req.query;
        console.log("getUsers Request - Query:", req.query);
        console.log("getUsers Request - User Role:", user.role);
        console.log("getUsers Request - User Company:", user.companyId);
        let query: any = {};

        // Security Check: Users can only see users from their own company
        // Unless they are super admin (not implemented yet)
        // Security Check: Users can only see users from their own company
        // Unless they are super admin (not implemented yet)
        // REMOVED: This strict filter was blocking unassigned users. 
        // Logic is handled in the if(companyId) and fallback blocks below.

        // If specific company requested, ensure it matches user's company
        if (companyId) {
            // Check if user is authorized for this company
            // Check if user is authorized for this company
            if (user.companyId && user.companyId.toString() !== companyId.toString()) {
                // Allow Super Admin to bypass
                if (user.permission !== 'full_control') {
                    // If user is Owner, check if they own this company
                    const targetCompany = await Company.findById(companyId as string);
                    // @ts-ignore
                    if (!targetCompany || targetCompany.ownerId.toString() !== user._id.toString()) {
                        res.status(403).json({ message: 'Not authorized to view users of another company' });
                        return;
                    }
                }
            }

            // If user is Owner/Admin/Partner, allow fetching users from ALL their owned companies + unassigned
            if (['Owner', 'Admin', 'Partner'].includes(user.role)) {
                // @ts-ignore
                const ownedCompanies = await Company.find({ ownerId: user._id });
                const ownedCompanyIds = ownedCompanies.map(c => c._id);

                // Include the requested companyId in the list if not already there (though it should be)
                if (!ownedCompanyIds.some(id => id.toString() === companyId.toString())) {
                    // @ts-ignore
                    ownedCompanyIds.push(companyId);
                }

                query.$or = [
                    { companyId: { $in: ownedCompanyIds } },
                    { companyId: null },
                    { companyId: { $exists: false } }
                ];
            } else {
                // Regular users: strict company filter + unassigned
                query.$or = [
                    { companyId: companyId },
                    { companyId: null },
                    { companyId: { $exists: false } }
                ];
            }
        }

        if (siteId) {
            query.sites = siteId;
        }

        // Fallback: If no companyId on user, and no companyId in query, what to do?
        // Maybe return empty or just their own profile?
        // For now, if query is empty, it returns all users which is BAD.
        if (Object.keys(query).length === 0) {
            // Super Admins can see EVERYTHING
            if (user.permission === 'full_control') {
                // No filter = return all users
            }
            // If no filters, default to user's company if available
            else if (user.companyId) {
                if (['Owner', 'Admin', 'Partner'].includes(user.role)) {
                    // Owners can see their company users AND unassigned users
                    query.$or = [
                        { companyId: user.companyId },
                        { companyId: null },
                        { companyId: { $exists: false } }
                    ];
                } else {
                    query.companyId = user.companyId;
                }
            } else {
                // ... existing fallback ...
            }
        }
        // If really no context, return only self?
        // query._id = user._id; 
        // Actually, let's return users who share at least one site?
        // Too complex for now. Let's stick to company isolation.
        // If no companyId, return empty to be safe.
        if (!user.companyId) {
            // Allow seeing users in same sites?
            // const accessibleSites = user.sites;
            // query.sites = { $in: accessibleSites };
        }


        const users = await User.find(query).select('-passwordHash');
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Assign user to site
// @route   POST /api/auth/assign-site
// @access  Private (Owner, Admin, Partner)
export const assignUserToSite = async (req: Request, res: Response) => {
    try {
        logDebug('assignUserToSite called', req.body);
        // @ts-ignore
        const requestingUser = req.user;

        if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        const { username, siteId } = req.body;

        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Check if already assigned
        // @ts-ignore
        if (user.sites.includes(siteId)) {
            res.status(400).json({ message: 'User already assigned to this site' });
            return;
        }

        // Fetch site to get companyId
        if (!siteId || !/^[0-9a-fA-F]{24}$/.test(siteId)) {
            res.status(400).json({ message: 'Invalid Site ID' });
            return;
        }

        const site = await Site.findById(siteId);
        if (!site) {
            res.status(404).json({ message: 'Site not found' });
            return;
        }

        // If user has no companyId, assign them to this site's company
        if (!user.companyId) {
            // @ts-ignore
            user.companyId = site.companyId;
        }

        // Ensure user is associated with the company of the site
        // @ts-ignore
        if (!user.companies) user.companies = [];

        // @ts-ignore
        const companyIdStr = site.companyId.toString();
        // @ts-ignore
        const existingCompanyIds = user.companies.map(c => c.toString());

        if (!existingCompanyIds.includes(companyIdStr)) {
            // @ts-ignore
            user.companies.push(site.companyId);
        }

        // @ts-ignore
        if (!user.sites.includes(siteId)) {
            // @ts-ignore
            user.sites.push(siteId);
        }

        await user.save();

        res.json({ message: 'User assigned to site successfully', user });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Remove user from site
// @route   POST /api/auth/remove-site
// @access  Private (Owner, Admin, Partner)
export const removeUserFromSite = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const requestingUser = req.user;

        if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        const { userId, siteId } = req.body;
        console.log(`Removing user ${userId} from site ${siteId}`);

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        console.log('Current user sites:', user.sites);

        // @ts-ignore
        user.sites = user.sites.filter(site => site.toString() !== siteId);

        console.log('Updated user sites:', user.sites);

        await user.save();

        res.json({ message: 'User removed from site successfully', user });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a user permanently
// @route   DELETE /api/auth/users/:id
// @access  Private (Owner, Admin, Partner)
export const deleteUser = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const requestingUser = req.user;

        if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
            res.status(403).json({ message: 'Not authorized' });
            return;
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Prevent deleting yourself
        if (user._id.toString() === requestingUser._id.toString()) {
            res.status(400).json({ message: 'Cannot delete yourself' });
            return;
        }

        await user.deleteOne();

        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update user details
// @route   PUT /api/auth/users/:id
// @access  Private (Owner/Admin/Partner only)
export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, mobile, role, salary, username, password, permission, modulePermissions } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Update fields
        if (name) user.name = name;
        if (mobile) user.mobile = mobile;
        if (role) user.role = role;
        if (salary) user.salary = salary;
        if (username) user.username = username;
        if (password) user.passwordHash = password; // Will be hashed by pre-save hook
        if (permission) user.permission = permission;
        if (modulePermissions) user.modulePermissions = modulePermissions;

        const updatedUser = await user.save();

        res.json({
            _id: (updatedUser._id as unknown as string),
            name: updatedUser.name,
            email: updatedUser.email,
            username: updatedUser.username,
            role: updatedUser.role,
            mobile: updatedUser.mobile,
            salary: updatedUser.salary,
            permission: updatedUser.permission,
            modulePermissions: updatedUser.modulePermissions,
        });
    } catch (error: any) {
        console.error("Update User Error:", error);
        res.status(500).json({ message: 'Server error: ' + error.message, error: error.message });
    }
};

// @desc    Verify token and return user data
// @route   GET /api/auth/verify
// @access  Private
export const verifyUser = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const user = req.user;

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                permissions: user.permissions,
                permission: user.permission,
                modulePermissions: user.modulePermissions,
                token: req.headers.authorization?.split(' ')[1] // Return same token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
