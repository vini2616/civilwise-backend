import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import companyRoutes from './routes/companyRoutes';
import siteRoutes from './routes/siteRoutes';
import transactionRoutes from './routes/transactionRoutes';
import dprRoutes from './routes/dprRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import estimationRoutes from './routes/estimationRoutes';
import contactRoutes from './routes/contactRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import materialRoutes from './routes/materialRoutes';
import checklistRoutes from './routes/checklistRoutes';
import projectTaskRoutes from './routes/projectTaskRoutes';
import customShapeRoutes from './routes/customShapeRoutes';
import siteSettingsRoutes from './routes/siteSettingsRoutes';
import billRoutes from './routes/billRoutes';
import manpowerRoutes from './routes/manpowerRoutes';
import chatRoutes from './routes/chatRoutes';
import documentRoutes from './routes/documentRoutes';
import reportRoutes from './routes/reportRoutes';

// Load env vars
dotenv.config();

import { startCleanupJob } from './services/cleanupService';

// Connect to database
connectDB();

// Start cleanup job (cron)
startCleanupJob();

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10000, // Increased limit for development
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dpr', dprRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/estimations', estimationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/checklists', checklistRoutes);
app.use('/api/project-tasks', projectTaskRoutes);
app.use('/api/custom-shapes', customShapeRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/manpower', manpowerRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/reports', reportRoutes);

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ ok: true });
});

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log('Server process updated: Ready for deleted sites.');
});

// Force reload for debugging Team Import
