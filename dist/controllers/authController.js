"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.updateUser = exports.deleteUser = exports.removeUserFromSite = exports.assignUserToSite = exports.getUsers = exports.createUser = exports.loginUser = exports.registerUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var Site_1 = __importDefault(require("../models/Site"));
var Company_1 = __importDefault(require("../models/Company"));
var generateToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, username, password, userExists, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, username = _a.username, password = _a.password;
                if (!name || !email || !password) {
                    res.status(400).json({ message: 'Please add all fields' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User_1.default.findOne({ $or: [{ email: email }, { username: username || email }] })];
            case 1:
                userExists = _b.sent();
                if (userExists) {
                    res.status(400).json({ message: 'User already exists' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User_1.default.create({
                        name: name,
                        email: email,
                        username: username || email, // Fallback to email if no username provided (for backward compat)
                        passwordHash: password,
                    })];
            case 2:
                user = _b.sent();
                if (user) {
                    res.status(201).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        token: generateToken(user._id),
                    });
                }
                else {
                    res.status(400).json({ message: 'Invalid user data' });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, password, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({
                        $or: [
                            { email: email || '' },
                            { username: username || '' }
                        ]
                    })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, user.matchPassword(password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    res.json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        permissions: user.permissions,
                        permission: user.permission,
                        modulePermissions: user.modulePermissions,
                        token: generateToken(user._id),
                    });
                }
                else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
// @desc    Create a new user (Admin/Owner/Partner only)
// @route   POST /api/auth/create-user
// @access  Private (Owner, Admin, Partner)
// DEBUG LOGGING
var fs = require('fs');
var logDebug = function (msg, data) {
    try {
        fs.appendFileSync('server_debug.log', "".concat(new Date().toISOString(), " - ").concat(msg, "\n").concat(data ? JSON.stringify(data, null, 2) + '\n' : ''));
    }
    catch (e) {
        console.error('Log failed', e);
    }
};
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestingUser, _a, name_1, email, username, password, role, permissions, permission, modulePermissions, siteId, companyId_1, mobile, salary, userExists_1, existingCompanyIds, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                logDebug('createUser called', req.body);
                requestingUser = req.user;
                if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
                    res.status(403).json({ message: 'Not authorized to create users' });
                    return [2 /*return*/];
                }
                _a = req.body, name_1 = _a.name, email = _a.email, username = _a.username, password = _a.password, role = _a.role, permissions = _a.permissions, permission = _a.permission, modulePermissions = _a.modulePermissions, siteId = _a.siteId, companyId_1 = _a.companyId, mobile = _a.mobile, salary = _a.salary;
                if (!name_1 || !email || !username || !password) {
                    res.status(400).json({ message: 'Please add all fields' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User_1.default.findOne({ $or: [{ email: email }, { username: username }] })];
            case 1:
                userExists_1 = _b.sent();
                if (!userExists_1) return [3 /*break*/, 4];
                existingCompanyIds = userExists_1.companies || (userExists_1.companyId ? [userExists_1.companyId] : []);
                // @ts-ignore
                if (companyId_1 && existingCompanyIds.some(function (id) { return id.toString() === companyId_1.toString(); })) {
                    res.status(400).json({ message: 'User already exists in this company' });
                    return [2 /*return*/];
                }
                if (!companyId_1) return [3 /*break*/, 3];
                // @ts-ignore
                if (!userExists_1.companies)
                    userExists_1.companies = [];
                // @ts-ignore
                if (userExists_1.companyId) {
                    // Ensure primary is also in list
                    // @ts-ignore
                    if (!userExists_1.companies.some(function (id) { return id.toString() === userExists_1.companyId.toString(); })) {
                        // @ts-ignore
                        userExists_1.companies.push(userExists_1.companyId);
                    }
                }
                // @ts-ignore
                userExists_1.companies.push(companyId_1);
                return [4 /*yield*/, userExists_1.save()];
            case 2:
                _b.sent();
                res.status(200).json({
                    message: 'User added to company successfully',
                    _id: userExists_1._id,
                    name: userExists_1.name,
                    email: userExists_1.email,
                    username: userExists_1.username,
                    role: userExists_1.role,
                    // @ts-ignore
                    companies: userExists_1.companies
                });
                return [2 /*return*/];
            case 3:
                res.status(400).json({ message: 'User already exists' });
                return [2 /*return*/];
            case 4: return [4 /*yield*/, User_1.default.create({
                    name: name_1,
                    email: email,
                    username: username,
                    passwordHash: password,
                    role: role || 'User',
                    mobile: mobile || '',
                    salary: salary || 0,
                    permissions: permissions || [],
                    permission: permission || 'view_edit',
                    modulePermissions: modulePermissions || {},
                    sites: (siteId && /^[0-9a-fA-F]{24}$/.test(siteId)) ? [siteId] : [],
                    companyId: companyId_1 || null,
                    companies: companyId_1 ? [companyId_1] : []
                })];
            case 5:
                user = _b.sent();
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
                }
                else {
                    res.status(400).json({ message: 'Invalid user data' });
                }
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                res.status(500).json({ message: 'Server Error', error: error_1.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
// @desc    Get all users (optionally filtered by site or company)
// @route   GET /api/auth/users
// @access  Private
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, siteId, companyId_2, query, targetCompany, ownedCompanies, ownedCompanyIds, users, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                user = req.user;
                _a = req.query, siteId = _a.siteId, companyId_2 = _a.companyId;
                console.log("getUsers Request - Query:", req.query);
                console.log("getUsers Request - User Role:", user.role);
                console.log("getUsers Request - User Company:", user.companyId);
                query = {};
                if (!companyId_2) return [3 /*break*/, 5];
                if (!(user.companyId && user.companyId.toString() !== companyId_2.toString())) return [3 /*break*/, 2];
                if (!(user.permission !== 'full_control')) return [3 /*break*/, 2];
                return [4 /*yield*/, Company_1.default.findById(companyId_2)];
            case 1:
                targetCompany = _b.sent();
                // @ts-ignore
                if (!targetCompany || targetCompany.ownerId.toString() !== user._id.toString()) {
                    res.status(403).json({ message: 'Not authorized to view users of another company' });
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                if (!['Owner', 'Admin', 'Partner'].includes(user.role)) return [3 /*break*/, 4];
                return [4 /*yield*/, Company_1.default.find({ ownerId: user._id })];
            case 3:
                ownedCompanies = _b.sent();
                ownedCompanyIds = ownedCompanies.map(function (c) { return c._id; });
                // Include the requested companyId in the list if not already there (though it should be)
                if (!ownedCompanyIds.some(function (id) { return id.toString() === companyId_2.toString(); })) {
                    // @ts-ignore
                    ownedCompanyIds.push(companyId_2);
                }
                query.$or = [
                    { companyId: { $in: ownedCompanyIds } },
                    { companyId: null },
                    { companyId: { $exists: false } }
                ];
                return [3 /*break*/, 5];
            case 4:
                // Regular users: strict company filter + unassigned
                query.$or = [
                    { companyId: companyId_2 },
                    { companyId: null },
                    { companyId: { $exists: false } }
                ];
                _b.label = 5;
            case 5:
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
                        }
                        else {
                            query.companyId = user.companyId;
                        }
                    }
                    else {
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
                return [4 /*yield*/, User_1.default.find(query).select('-passwordHash')];
            case 6:
                users = _b.sent();
                res.json(users);
                return [3 /*break*/, 8];
            case 7:
                error_2 = _b.sent();
                res.status(500).json({ message: 'Server Error', error: error_2.message });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
// @desc    Assign user to site
// @route   POST /api/auth/assign-site
// @access  Private (Owner, Admin, Partner)
var assignUserToSite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestingUser, _a, username, siteId, user, site, companyIdStr, existingCompanyIds, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                logDebug('assignUserToSite called', req.body);
                requestingUser = req.user;
                if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
                    res.status(403).json({ message: 'Not authorized' });
                    return [2 /*return*/];
                }
                _a = req.body, username = _a.username, siteId = _a.siteId;
                return [4 /*yield*/, User_1.default.findOne({ $or: [{ username: username }, { email: username }] })];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                // Check if already assigned
                // @ts-ignore
                if (user.sites.includes(siteId)) {
                    res.status(400).json({ message: 'User already assigned to this site' });
                    return [2 /*return*/];
                }
                // Fetch site to get companyId
                if (!siteId || !/^[0-9a-fA-F]{24}$/.test(siteId)) {
                    res.status(400).json({ message: 'Invalid Site ID' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Site_1.default.findById(siteId)];
            case 2:
                site = _b.sent();
                if (!site) {
                    res.status(404).json({ message: 'Site not found' });
                    return [2 /*return*/];
                }
                // If user has no companyId, assign them to this site's company
                if (!user.companyId) {
                    // @ts-ignore
                    user.companyId = site.companyId;
                }
                // Ensure user is associated with the company of the site
                // @ts-ignore
                if (!user.companies)
                    user.companies = [];
                companyIdStr = site.companyId.toString();
                existingCompanyIds = user.companies.map(function (c) { return c.toString(); });
                if (!existingCompanyIds.includes(companyIdStr)) {
                    // @ts-ignore
                    user.companies.push(site.companyId);
                }
                // @ts-ignore
                if (!user.sites.includes(siteId)) {
                    // @ts-ignore
                    user.sites.push(siteId);
                }
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.json({ message: 'User assigned to site successfully', user: user });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                res.status(500).json({ message: 'Server Error', error: error_3.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.assignUserToSite = assignUserToSite;
// @desc    Remove user from site
// @route   POST /api/auth/remove-site
// @access  Private (Owner, Admin, Partner)
var removeUserFromSite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestingUser, _a, userId, siteId_1, user, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                requestingUser = req.user;
                if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
                    res.status(403).json({ message: 'Not authorized' });
                    return [2 /*return*/];
                }
                _a = req.body, userId = _a.userId, siteId_1 = _a.siteId;
                console.log("Removing user ".concat(userId, " from site ").concat(siteId_1));
                return [4 /*yield*/, User_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                console.log('Current user sites:', user.sites);
                // @ts-ignore
                user.sites = user.sites.filter(function (site) { return site.toString() !== siteId_1; });
                console.log('Updated user sites:', user.sites);
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                res.json({ message: 'User removed from site successfully', user: user });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                res.status(500).json({ message: 'Server Error', error: error_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeUserFromSite = removeUserFromSite;
// @desc    Delete a user permanently
// @route   DELETE /api/auth/users/:id
// @access  Private (Owner, Admin, Partner)
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestingUser, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                requestingUser = req.user;
                if (!['Owner', 'Admin', 'Partner'].includes(requestingUser.role) && requestingUser.permission !== 'full_control') {
                    res.status(403).json({ message: 'Not authorized' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                // Prevent deleting yourself
                if (user._id.toString() === requestingUser._id.toString()) {
                    res.status(400).json({ message: 'Cannot delete yourself' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user.deleteOne()];
            case 2:
                _a.sent();
                res.json({ message: 'User deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).json({ message: 'Server Error', error: error_5.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
// @desc    Update user details
// @route   PUT /api/auth/users/:id
// @access  Private (Owner/Admin/Partner only)
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, mobile, role, salary, username, password, permission, modulePermissions, user, updatedUser, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, mobile = _a.mobile, role = _a.role, salary = _a.salary, username = _a.username, password = _a.password, permission = _a.permission, modulePermissions = _a.modulePermissions;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findById(id)];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                // Update fields
                if (name)
                    user.name = name;
                if (mobile)
                    user.mobile = mobile;
                if (role)
                    user.role = role;
                if (salary)
                    user.salary = salary;
                if (username)
                    user.username = username;
                if (password)
                    user.passwordHash = password; // Will be hashed by pre-save hook
                if (permission)
                    user.permission = permission;
                if (modulePermissions)
                    user.modulePermissions = modulePermissions;
                return [4 /*yield*/, user.save()];
            case 3:
                updatedUser = _b.sent();
                res.json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    username: updatedUser.username,
                    role: updatedUser.role,
                    mobile: updatedUser.mobile,
                    salary: updatedUser.salary,
                    permission: updatedUser.permission,
                    modulePermissions: updatedUser.modulePermissions,
                });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                console.error("Update User Error:", error_6);
                res.status(500).json({ message: 'Server error: ' + error_6.message, error: error_6.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
// @desc    Verify token and return user data
// @route   GET /api/auth/verify
// @access  Private
var verifyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    var _a;
    return __generator(this, function (_b) {
        try {
            user = req.user;
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
                    token: (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1] // Return same token
                });
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
        return [2 /*return*/];
    });
}); };
exports.verifyUser = verifyUser;
