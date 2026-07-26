// ============================================================
// CSV EXPORT SERVICE
// Generates clean CSV string for BOQ and Material schedules
// ============================================================

export function generateBOQCSV(boqItems: any[]): string {
  const headers = ['Item Code', 'Category', 'Description', 'Unit', 'Quantity', 'Unit Rate (INR)', 'Amount (INR)', 'Brand', 'Remarks'];
  
  const rows = boqItems.map((item) => [
    `"${item.code || ''}"`,
    `"${item.category || ''}"`,
    `"${(item.description || '').replace(/"/g, '""')}"`,
    `"${item.unit || ''}"`,
    item.quantity || 0,
    item.unitRate || 0,
    item.amount || 0,
    `"${item.brand || ''}"`,
    `"${(item.remarks || '').replace(/"/g, '""')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function generateMaterialCSV(materials: any[]): string {
  const headers = ['Category', 'Item Name', 'Brand Specification', 'Quantity', 'Unit', 'Estimated Unit Rate (INR)', 'Total Cost (INR)'];
  
  const rows = materials.map((m) => [
    `"${m.category || m.trade || ''}"`,
    `"${(m.name || m.item || '').replace(/"/g, '""')}"`,
    `"${(m.brand || m.specification || '').replace(/"/g, '""')}"`,
    m.estimatedQuantity || m.quantity || 0,
    `"${m.unit || ''}"`,
    m.ratePerUnit || m.unitRate || 0,
    m.totalCost || m.total || 0,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
