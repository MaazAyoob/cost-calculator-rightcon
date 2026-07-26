import { Router } from 'express';
import { downloadPDF, downloadCSV, downloadExcel } from '../controllers/download.controller';

const router = Router();

router.get('/pdf', downloadPDF);
router.get('/csv', downloadCSV);
router.get('/excel', downloadExcel);

export default router;
