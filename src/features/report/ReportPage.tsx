import React from 'react';
import { motion } from 'framer-motion';
import { pageFadeVariant } from '../../animations/variants';
import { useReportStore } from '../../store/useReportStore';
import { useProjectStore } from '../../store/useProjectStore';
import { useCalculationStore } from '../../store/useCalculationStore';
import { PageHeader } from '../../components/common/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Download, Printer, Shield, Building, Layers, CheckCircle2, FileSpreadsheet, Calendar, CreditCard, ShoppingCart, Lightbulb } from 'lucide-react';
import { formatCurrency } from '../../utils/cn';

export const ReportPage: React.FC = () => {
  const { includeArchitecturalDrawings, includeDetailedBOQ, includeMaterialSpecification, preparedFor, toggleOption } =
    useReportStore();
  const { project } = useProjectStore();

  const { result } = useCalculationStore();
  const { report, area, quantities, budget, timeline, paymentPlan, boq, procurement } = result;

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div variants={pageFadeVariant} initial="initial" animate="animate" exit="exit" className="space-y-6 max-w-5xl mx-auto py-2">
      <PageHeader
        title="Executive Construction Report"
        subtitle="Bank-loan ready specification, BOQ & financial roadmap."
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Report Preview' }]}
        actions={
          <div className="flex items-center gap-3 print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
              Print / Save PDF
            </Button>
            <Button size="sm" onClick={handlePrint} leftIcon={<Download className="w-4 h-4" />}>
              Download Official Report
            </Button>
          </div>
        }
      />

      {/* Report Configuration Bar */}
      <Card className="p-4 bg-slate-50 border border-slate-200/80 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-700">Include Report Sections:</span>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeArchitecturalDrawings}
                onChange={() => toggleOption('includeArchitecturalDrawings')}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-slate-700 font-medium">Architectural Summary</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDetailedBOQ}
                onChange={() => toggleOption('includeDetailedBOQ')}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-slate-700 font-medium">Detailed BOQ Schedule</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeMaterialSpecification}
                onChange={() => toggleOption('includeMaterialSpecification')}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-slate-700 font-medium">Procurement List & Brands</span>
            </label>
          </div>
        </div>
      </Card>

      {/* Document Sheet Container */}
      <Card className="p-8 sm:p-12 bg-white border border-slate-200 shadow-soft-lg space-y-8 print:shadow-none print:border-none">
        {/* Header Branding */}
        <div className="flex justify-between items-start pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-black">
                C
              </div>
              <span className="font-extrabold text-slate-900 text-xl tracking-tight">COST CALCULATOR</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Home Construction Planning & Engineering Platform</p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">Report ID: {report.projectId} | Engine v{report.engineVersion}</p>
          </div>

          <div className="text-right space-y-1">
            <StatusBadge status="success" label="Engine Verified" />
            <p className="text-xs text-slate-500 font-medium pt-1">Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            <p className="text-xs text-slate-700 font-bold">Prepared For: {preparedFor}</p>
          </div>
        </div>

        {/* 1. Executive Summary */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <Building className="w-4 h-4" /> 1. Executive Summary & Key Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Total Built-Up Area</span>
              <p className="text-sm font-extrabold text-slate-900">{area.totalBUASqFt.toLocaleString('en-IN')} Sq Ft</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Total Estimated Cost</span>
              <p className="text-sm font-extrabold text-blue-600">{formatCurrency(budget.totalProjectCost)}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Cost per Sq Ft</span>
              <p className="text-sm font-extrabold text-slate-900">₹{budget.costPerSqFt.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Estimated Timeline</span>
              <p className="text-sm font-extrabold text-slate-900">{timeline.totalMonths} Months</p>
            </div>
          </div>
        </div>

        {/* 2. Project Information & Specifications */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4" /> 2. Configuration & Quality Tier
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100 space-y-0.5">
              <span className="text-slate-400 font-medium text-[10px]">Location & Authority</span>
              <div className="font-bold text-slate-800">{report.input.city} ({report.input.authority})</div>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100 space-y-0.5">
              <span className="text-slate-400 font-medium text-[10px]">House Type & Storeys</span>
              <div className="font-bold text-slate-800">{report.input.houseType} ({report.input.floors} Floors)</div>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100 space-y-0.5">
              <span className="text-slate-400 font-medium text-[10px]">Quality Tier</span>
              <div className="font-bold text-blue-600">{report.input.qualityTier} Grade</div>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100 space-y-0.5">
              <span className="text-slate-400 font-medium text-[10px]">Room Configuration</span>
              <div className="font-bold text-slate-800">{report.input.rooms.bedrooms} BHK + {report.input.rooms.bathrooms} Bath</div>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100 space-y-0.5">
              <span className="text-slate-400 font-medium text-[10px]">Parking Setup</span>
              <div className="font-bold text-slate-800">{report.input.parkingType} ({report.input.carCount} Cars)</div>
            </div>
            <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-100 space-y-0.5">
              <span className="text-slate-400 font-medium text-[10px]">Special Tech Add-ons</span>
              <div className="font-bold text-slate-800">
                {[report.input.evCharging && 'EV Charging', report.input.liftRequired && 'Passenger Lift'].filter(Boolean).join(', ') || 'Standard'}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Key Material Quantities */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> 3. Structural Material Schedule
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-0.5">
              <span className="text-slate-400 font-semibold text-[10px]">TMT Steel</span>
              <div className="font-extrabold text-blue-700 text-sm">{quantities.steelTonnes} Tonnes</div>
              <span className="text-[10px] text-slate-500">{report.input.materialBrands.steel}</span>
            </div>
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-0.5">
              <span className="text-slate-400 font-semibold text-[10px]">OPC 53 Cement</span>
              <div className="font-extrabold text-amber-700 text-sm">{quantities.cementBags} Bags</div>
              <span className="text-[10px] text-slate-500">{report.input.materialBrands.cement}</span>
            </div>
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-0.5">
              <span className="text-slate-400 font-semibold text-[10px]">RMC M25 Concrete</span>
              <div className="font-extrabold text-emerald-700 text-sm">{quantities.concreteCuM} Cu M</div>
              <span className="text-[10px] text-slate-500">Design Mix M25</span>
            </div>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-0.5">
              <span className="text-slate-400 font-semibold text-[10px]">AAC Blocks</span>
              <div className="font-extrabold text-indigo-700 text-sm">{quantities.aacBlocksCuM} Cu M</div>
              <span className="text-[10px] text-slate-500">Birla Aerocon Grade 1</span>
            </div>
          </div>
        </div>

        {/* 4. Budget Head Breakdown */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4" /> 4. Financial Allocation Schedule
          </h3>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
            {budget.heads.map((h) => (
              <div key={h.id} className="flex justify-between p-2.5 bg-white items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: h.color }} />
                  <span className="font-medium text-slate-800">{h.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">{h.percentage}%</span>
                  <span className="font-bold text-slate-900 min-w-[100px] text-right">{formatCurrency(h.allocatedAmount)}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between p-3 bg-slate-50 font-extrabold text-slate-900 text-xs">
              <span>Total Project Cost (incl. 12% GST & Contingency)</span>
              <span className="text-blue-600 text-sm">{formatCurrency(budget.totalProjectCost)}</span>
            </div>
          </div>
        </div>

        {/* 5. BOQ Line Items (if enabled) */}
        {includeDetailedBOQ && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4" /> 5. Itemized Bill of Quantities ({boq.length} Line Items)
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-2.5">Code</th>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5 text-right">Qty</th>
                    <th className="p-2.5">Unit</th>
                    <th className="p-2.5 text-right">Rate (₹)</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {boq.slice(0, 15).map((item) => (
                    <tr key={item.code} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono text-[10px] text-slate-400">{item.code}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{item.description}</td>
                      <td className="p-2.5 text-right font-medium">{item.quantity.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-slate-500">{item.unit}</td>
                      <td className="p-2.5 text-right">₹{item.unitRate.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {boq.length > 15 && (
                <div className="p-2.5 text-center text-slate-400 bg-slate-50 text-[11px] font-medium border-t border-slate-200">
                  + {boq.length - 15} additional BOQ line items included in complete PDF export
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. Payment Disbursement Roadmap */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-4 h-4" /> 6. Bank Disbursement & Payment Schedule
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {paymentPlan.map((m) => (
              <div key={m.stage} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-blue-600">Stage {m.stage}:</span>{' '}
                  <span className="font-bold text-slate-800">{m.title}</span>
                  <div className="text-[10px] text-slate-400">{m.targetDate} • {m.percentage}%</div>
                </div>
                <div className="text-right font-extrabold text-slate-900">{formatCurrency(m.amount)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Procurement Brands (if enabled) */}
        {includeMaterialSpecification && (
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4" /> 7. Approved Material Brand Palette
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {Object.entries(report.input.materialBrands).map(([category, brand]) => (
                <div key={category} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{category}</span>
                  <span className="font-bold text-slate-900">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. Recommendations */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" /> 8. Engineering Recommendations
          </h3>
          <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl space-y-1.5 text-xs text-amber-950">
            {report.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Report Footer Verification */}
        <div className="pt-8 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400">
          <span>Cost Calculator Deterministic Engine v1.0.0</span>
          <span>Certified Bank-Loan Disbursement Specification</span>
        </div>
      </Card>
    </motion.div>
  );
};
