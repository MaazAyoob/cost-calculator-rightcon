import { Request, Response } from 'express';
import { generatePDFHTML } from '../services/pdf.service';
import { generateBOQCSV, generateMaterialCSV } from '../services/csv.service';
import { generateExcelWorkbook } from '../services/excel.service';

export async function downloadPDF(req: Request, res: Response) {
  const sampleData = {
    name: req.query.name || 'Dream Home Villa',
    city: req.query.city || 'Bangalore',
    totalCost: 9405000,
    bua: 3850,
  };

  const html = generatePDFHTML(sampleData);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', 'inline; filename="buniyad-construction-report.html"');
  res.send(html);
}

export async function downloadCSV(req: Request, res: Response) {
  const type = req.query.type || 'boq';

  if (type === 'materials') {
    const mockMaterials = [
      { category: 'Structure', name: 'TMT Steel Fe 550D', brand: 'Tata Tiscon', estimatedQuantity: 18.5, unit: 'Tonnes', ratePerUnit: 64000, totalCost: 1184000 },
      { category: 'Structure', name: 'OPC 53 Cement', brand: 'UltraTech', estimatedQuantity: 1450, unit: 'Bags', ratePerUnit: 420, totalCost: 609000 },
    ];
    const csv = generateMaterialCSV(mockMaterials);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="buniyad-materials.csv"');
    return res.send(csv);
  }

  const mockBOQ = [
    { code: 'SP-001', category: 'Site Prep', description: 'Topsoil Clearing & Land Demarcation', unit: 'Sq Ft', quantity: 2400, unitRate: 30, amount: 72000, brand: 'Total Station' },
    { code: 'FD-001', category: 'Foundation', description: 'PCC M10 Bed below Footings', unit: 'Cu M', quantity: 15, unitRate: 3200, amount: 48000, brand: 'UltraTech OPC 53' },
  ];
  const csv = generateBOQCSV(mockBOQ);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="buniyad-boq.csv"');
  return res.send(csv);
}

export async function downloadExcel(req: Request, res: Response) {
  const mockBOQ = [
    { code: 'SP-001', category: 'Site Prep', description: 'Topsoil Clearing & Land Demarcation', unit: 'Sq Ft', quantity: 2400, unitRate: 30, amount: 72000, brand: 'Total Station' },
  ];
  const mockHeads = [
    { name: 'Foundation & Structure', percentage: 40, allocatedAmount: 3762000 },
    { name: 'Masonry', percentage: 8, allocatedAmount: 752400 },
  ];

  const excelContent = generateExcelWorkbook(mockBOQ, mockHeads);
  res.setHeader('Content-Type', 'application/vnd.ms-excel');
  res.setHeader('Content-Disposition', 'attachment; filename="buniyad-construction-boq.xls"');
  res.send(excelContent);
}
