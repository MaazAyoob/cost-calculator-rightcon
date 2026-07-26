// ============================================================
// EXCEL EXPORT SERVICE
// Generates formatted CSV / TSV spreadsheet buffer for BOQ & Budget
// ============================================================

import { generateBOQCSV } from './csv.service';

export function generateExcelWorkbook(boqItems: any[], budgetHeads: any[]): string {
  let output = '=== SHEET: BILL OF QUANTITIES ===\n';
  output += generateBOQCSV(boqItems);

  output += '\n\n=== SHEET: BUDGET ALLOCATIONS ===\n';
  output += 'Budget Head,Allocated Percentage (%),Allocated Amount (INR)\n';

  if (budgetHeads && budgetHeads.length > 0) {
    for (const head of budgetHeads) {
      output += `"${head.name}",${head.percentage},${head.allocatedAmount}\n`;
    }
  }

  return output;
}
