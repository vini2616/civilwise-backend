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
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var User_1 = __importDefault(require("./models/User"));
var Company_1 = __importDefault(require("./models/Company"));
dotenv_1.default.config();
var resetUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, adminUser, updateResult, companies, newCompany, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_URI || '')];
            case 1:
                conn = _a.sent();
                console.log("MongoDB Connected: ".concat(conn.connection.host));
                // 1. Delete all users
                console.log('Deleting all users...');
                return [4 /*yield*/, User_1.default.deleteMany({})];
            case 2:
                _a.sent();
                console.log('All users deleted.');
                // 2. Create Super Admin User
                console.log('Creating Super Admin User...');
                return [4 /*yield*/, User_1.default.create({
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
                    })];
            case 3:
                adminUser = _a.sent();
                console.log("User created: ".concat(adminUser.username, " (").concat(adminUser._id, ")"));
                // 3. Reassign all companies to this user
                console.log('Reassigning all companies to new user...');
                return [4 /*yield*/, Company_1.default.updateMany({}, { ownerId: adminUser._id })];
            case 4:
                updateResult = _a.sent();
                console.log("Updated ".concat(updateResult.modifiedCount, " companies."));
                return [4 /*yield*/, Company_1.default.find({})];
            case 5:
                companies = _a.sent();
                if (!(companies.length === 0)) return [3 /*break*/, 8];
                console.log('No companies found. Creating default company...');
                return [4 /*yield*/, Company_1.default.create({
                        name: 'Vini Construction',
                        address: 'Main Office',
                        mobile: '9999999999',
                        ownerId: adminUser._id
                    })];
            case 6:
                newCompany = _a.sent();
                console.log("Default company created: ".concat(newCompany.name));
                // Assign user to this company
                adminUser.companyId = newCompany._id;
                return [4 /*yield*/, adminUser.save()];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8:
                // Assign user to the first company found
                console.log("Assigning user to company: ".concat(companies[0].name));
                adminUser.companyId = companies[0]._id;
                return [4 /*yield*/, adminUser.save()];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                console.log('Reset complete.');
                process.exit(0);
                return [3 /*break*/, 12];
            case 11:
                error_1 = _a.sent();
                console.error('Error resetting users:', error_1);
                process.exit(1);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
resetUsers();
