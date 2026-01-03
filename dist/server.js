"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var db_1 = __importDefault(require("./config/db"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
var companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
var siteRoutes_1 = __importDefault(require("./routes/siteRoutes"));
var transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
var dprRoutes_1 = __importDefault(require("./routes/dprRoutes"));
var inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
var estimationRoutes_1 = __importDefault(require("./routes/estimationRoutes"));
var contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
var attendanceRoutes_1 = __importDefault(require("./routes/attendanceRoutes"));
var materialRoutes_1 = __importDefault(require("./routes/materialRoutes"));
var checklistRoutes_1 = __importDefault(require("./routes/checklistRoutes"));
var projectTaskRoutes_1 = __importDefault(require("./routes/projectTaskRoutes"));
var customShapeRoutes_1 = __importDefault(require("./routes/customShapeRoutes"));
var siteSettingsRoutes_1 = __importDefault(require("./routes/siteSettingsRoutes"));
var billRoutes_1 = __importDefault(require("./routes/billRoutes"));
var manpowerRoutes_1 = __importDefault(require("./routes/manpowerRoutes"));
var chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
var documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
var reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
// Load env vars
dotenv_1.default.config();
var cleanupService_1 = require("./services/cleanupService");
// Connect to database
(0, db_1.default)();
// Start cleanup job (cron)
(0, cleanupService_1.startCleanupJob)();
var app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
// Rate limiting
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10000, // Increased limit for development
});
app.use(limiter);
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/notes', noteRoutes_1.default);
app.use('/api/companies', companyRoutes_1.default);
app.use('/api/sites', siteRoutes_1.default);
app.use('/api/transactions', transactionRoutes_1.default);
app.use('/api/dpr', dprRoutes_1.default);
app.use('/api/inventory', inventoryRoutes_1.default);
app.use('/api/estimations', estimationRoutes_1.default);
app.use('/api/contacts', contactRoutes_1.default);
app.use('/api/attendance', attendanceRoutes_1.default);
app.use('/api/materials', materialRoutes_1.default);
app.use('/api/checklists', checklistRoutes_1.default);
app.use('/api/project-tasks', projectTaskRoutes_1.default);
app.use('/api/custom-shapes', customShapeRoutes_1.default);
app.use('/api/site-settings', siteSettingsRoutes_1.default);
app.use('/api/bills', billRoutes_1.default);
app.use('/api/manpower', manpowerRoutes_1.default);
app.use('/api/chat', chatRoutes_1.default);
app.use('/api/documents', documentRoutes_1.default);
app.use('/api/reports', reportRoutes_1.default);
app.get('/api/health', function (req, res) {
    res.status(200).json({ ok: true });
});
// 404 Handler
app.use(function (req, res, next) {
    res.status(404).json({ message: "Route not found: ".concat(req.originalUrl) });
});
// Error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});
var PORT = process.env.PORT || 5000;
app.listen(Number(PORT), '0.0.0.0', function () {
    console.log("Server running in ".concat(process.env.NODE_ENV, " mode on port ").concat(PORT));
    console.log('Server process updated: Ready for deleted sites.');
});
// Force reload for debugging Team Import
