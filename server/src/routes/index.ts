import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import downloadRoutes from './download.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/download', downloadRoutes);

// Health check
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    platform: 'Project Buniyad API Engine v1.0.0',
    timestamp: new Date().toISOString(),
  });
});

export default router;
