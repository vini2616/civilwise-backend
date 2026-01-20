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
var path_1 = __importDefault(require("path"));
var User_1 = __importDefault(require("./models/User")); // Correct import relative to server/src
// Adjust path to .env: it's in server/ (one level up from src)
// __dirname in ts-node/src context will be server/src
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
var connectDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vini-app')];
            case 1:
                conn = _a.sent();
                console.log("MongoDB Connected: ".concat(conn.connection.host));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error: ".concat(error_1.message));
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var fixUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var username, companies, user, testCompany, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectDB()];
            case 1:
                _a.sent();
                username = 'coffin';
                return [4 /*yield*/, mongoose_1.default.connection.db.collection('companies').find({}).toArray()];
            case 2:
                companies = _a.sent();
                console.log("Available Companies:", companies.map(function (c) { return ({ id: c._id, name: c.name }); }));
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 3:
                user = _a.sent();
                if (!user) {
                    console.log("User not found");
                    process.exit(1);
                }
                console.log("Current User:", { id: user._id, name: user.name, companies: user.companies });
                testCompany = companies.find(function (c) { return c.name === 'Test'; });
                if (!testCompany) return [3 /*break*/, 6];
                console.log("Found Test Company: ".concat(testCompany._id, ". Adding to user..."));
                // Use atomic update
                return [4 /*yield*/, User_1.default.updateOne({ _id: user._id }, { $addToSet: { companies: testCompany._id } })];
            case 4:
                // Use atomic update
                _a.sent();
                console.log("Update command sent.");
                return [4 /*yield*/, User_1.default.findOne({ username: username })];
            case 5:
                updatedUser = _a.sent();
                console.log("Updated User Companies:", updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.companies);
                return [3 /*break*/, 7];
            case 6:
                console.log("Test Company not found in DB.");
                _a.label = 7;
            case 7:
                // Force close
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); };
fixUser();
