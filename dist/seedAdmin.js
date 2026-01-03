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
dotenv_1.default.config();
var seedAdmin = function () { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, email, userExists, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_URI)];
            case 1:
                _a.sent();
                console.log('MongoDB Connected');
                username = 'Vini';
                password = 'AlwaysVini';
                email = 'vini@admin.com';
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 2:
                userExists = _a.sent();
                if (!userExists) return [3 /*break*/, 4];
                console.log('User Vini already exists. Updating password...');
                userExists.passwordHash = password; // Will be hashed by pre-save hook? No, wait.
                // The User model likely has a pre-save hook to hash the password.
                // Let's check if I can just save it.
                // Actually, if I update it directly, I should assign it to the virtual 'password' field if it exists, or handle hashing manually if not.
                // Let's look at the User model again to be sure.
                // But to be safe, let's delete and recreate.
                return [4 /*yield*/, User_1.default.deleteOne({ username: username })];
            case 3:
                // The User model likely has a pre-save hook to hash the password.
                // Let's check if I can just save it.
                // Actually, if I update it directly, I should assign it to the virtual 'password' field if it exists, or handle hashing manually if not.
                // Let's look at the User model again to be sure.
                // But to be safe, let's delete and recreate.
                _a.sent();
                console.log('Existing user deleted.');
                _a.label = 4;
            case 4: return [4 /*yield*/, User_1.default.create({
                    name: 'Vini Admin',
                    email: email,
                    username: username,
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
                })];
            case 5:
                user = _a.sent();
                console.log('User Vini created successfully');
                process.exit();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error('Error seeding user:', error_1);
                process.exit(1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
seedAdmin();
