import React from 'react';
import { motion } from 'framer-motion';
import { pageFadeVariant } from '../../animations/variants';
import { useDashboardStore } from '../../store/useDashboardStore';
import { useCalculationStore, useBudgetResult, useBOQ, usePaymentResult, useArea, useQuantities } from '../../store/useCalculationStore';
import { useMaterialStore } from '../../store/useMaterialStore';

// Dashboard Shell
import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { HeroSummaryBanner } from '../../components/dashboard/HeroSummaryBanner';
import { LeftStageSidebar } from '../../components/dashboard/LeftStageSidebar';
import { CentreActivityWorkspace } from '../../components/dashboard/CentreActivityWorkspace';
import { RightDetailDrawer } from '../../components/dashboard/RightDetailDrawer';

// Tab Content
import { OverviewTab } from '../../components/dashboard/OverviewTab';
import { DownloadsTab } from '../../components/dashboard/DownloadsTab';
import { CompareDrawer } from '../../components/dashboard/CompareDrawer';

// Shared Components
import { MaterialCard } from '../../components/cards/MaterialCard';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/tables/Table';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ProgressIndicator } from '../../components/common/ProgressIndicator';
import { Button } from '../../components/ui/Button';
import { ChartContainer } from '../../components/charts/ChartContainer';
import { Filter, Download, Building2, CreditCard } from 'lucide-react';
import { formatCurrency } from '../../utils/cn';

const MATERIAL_CATEGORIES = ['All', 'Structure', 'Finishing', 'MEP', 'Fixtures', 'Joinery'];

export const DashboardPage: React.FC = () => {
  const { activeTab } = useDashboardStore();
  const { materials, updateMaterialTier, selectedCategoryFilter, setCategoryFilter } = useMaterialStore();
  const budget = useBudgetResult();
  const boqItems = useBOQ();
  const paymentMilestones = usePaymentResult();
  const area = useArea();
  const quantities = useQuantities();

  const filteredMaterials = selectedCategoryFilter === 'All'
    ? materials
    : materials.filter((m) => m.category === selectedCategoryFilter);

  const chartData = budget.heads.map((h) => ({ name: h.name, value: h.allocatedAmount }));

  // BOQ grouped by category for summary
  const boqByCategory = boqItems.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + item.amount;
    return acc;
  }, {});

  return (
    <motion.div
      variants={pageFadeVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      className="-mx-4 lg:-mx-8 -mt-6 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-[#F8FAFC]"
    >
      <DashboardHeader />
      <HeroSummaryBanner />

      <div className="flex-1 flex overflow-hidden min-h-0 relative">

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto">
            <OverviewTab />
          </div>
        )}

        {/* ── Construction Journey ── */}
        {activeTab === 'journey' && (
          <>
            <LeftStageSidebar />
            <CentreActivityWorkspace />
            <RightDetailDrawer />
          </>
        )}

        {/* ── Materials Tab ── */}
        {activeTab === 'materials' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-600">Category:</span>
                {MATERIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 text-[11px] font-bold rounded-full border transition-colors ${
                      selectedCategoryFilter === cat
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {filteredMaterials.length} Items
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredMaterials.map((mat) => (
                <MaterialCard key={mat.id} material={mat} onSelectTier={updateMaterialTier} />
              ))}
            </div>
          </div>
        )}

        {/* ── BOQ Tab ── (LIVE from engine) */}
        {activeTab === 'boq' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Bill of Quantities</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {boqItems.length} IS-code items across {Object.keys(boqByCategory).length} categories · Total: {formatCurrency(boqItems.reduce((s, i) => s + i.amount, 0))}
                </p>
              </div>
              <Button size="sm" leftIcon={<Download className="w-3.5 h-3.5" />} onClick={() => {}}>
                Export CSV
              </Button>
            </div>

            {/* BOQ Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(boqByCategory).slice(0, 4).map(([cat, total]) => (
                <div key={cat} className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs">
                  <div className="text-slate-500 font-medium truncate">{cat}</div>
                  <div className="font-extrabold text-slate-900 mt-1">{formatCurrency(total)}</div>
                </div>
              ))}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Rate (₹)</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boqItems.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell className="font-mono text-[10px] text-slate-400">{item.code}</TableCell>
                    <TableCell>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded whitespace-nowrap">
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-slate-900 text-xs">{item.description}</div>
                      {item.remarks && <div className="text-[10px] text-slate-400">{item.remarks}</div>}
                    </TableCell>
                    <TableCell className="text-[11px] text-slate-500 max-w-[120px] truncate">{item.brand}</TableCell>
                    <TableCell className="text-right font-medium text-xs">{item.quantity.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-[11px] text-slate-500">{item.unit}</TableCell>
                    <TableCell className="text-right font-medium text-xs">₹{item.unitRate.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right font-extrabold text-slate-900 text-xs">{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* ── Budget Tab ── (LIVE from engine) */}
        {activeTab === 'budget' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Key Budget Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Project Cost', value: formatCurrency(budget.totalProjectCost), color: 'text-blue-600' },
                { label: 'Base Construction', value: formatCurrency(budget.baseConstructionCost), color: 'text-slate-900' },
                { label: 'Cost per Sq Ft', value: `₹${budget.costPerSqFt.toLocaleString('en-IN')}`, color: 'text-emerald-600' },
                { label: 'GST (12%)', value: formatCurrency(budget.gstAmount), color: 'text-amber-600' },
              ].map((m) => (
                <div key={m.label} className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-soft-xs">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{m.label}</div>
                  <div className={`text-lg font-extrabold ${m.color}`}>{m.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <Card>
                <CardHeader><CardTitle>Budget Distribution</CardTitle></CardHeader>
                <CardContent>
                  <ChartContainer type="donut" data={chartData} height={260} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Head-wise Allocations</CardTitle>
                    <span className="text-xs font-bold text-blue-600">{formatCurrency(budget.totalProjectCost)}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {budget.heads.map((h) => (
                    <div key={h.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: h.color }} />
                          <span className="text-slate-800 font-medium">{h.name}</span>
                        </div>
                        <span className="font-extrabold text-slate-900">
                          {formatCurrency(h.allocatedAmount)} <span className="text-slate-400 font-normal">({h.percentage}%)</span>
                        </span>
                      </div>
                      <ProgressIndicator value={h.percentage} color="bg-blue-600" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Structural vs Finishing vs MEP summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Structural Cost', val: budget.structuralCost, icon: <Building2 className="w-4 h-4 text-blue-600" /> },
                { label: 'Finishing Cost',  val: budget.finishingCost,  icon: <Filter className="w-4 h-4 text-indigo-600" /> },
                { label: 'MEP Cost',        val: budget.mepCost,        icon: <CreditCard className="w-4 h-4 text-emerald-600" /> },
              ].map((s) => (
                <div key={s.label} className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <span className="text-xs font-semibold text-slate-600">{s.label}</span>
                  </div>
                  <div className="text-lg font-extrabold text-slate-900">{formatCurrency(s.val)}</div>
                  <div className="text-[10px] text-slate-400">{Math.round(s.val / budget.totalProjectCost * 100)}% of project total</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Payment Tab ── (LIVE from engine) */}
        {activeTab === 'payment' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Bank-Linked Payment Milestones</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {paymentMilestones.length} disbursement stages · Total: {formatCurrency(budget.totalProjectCost)}
                </p>
              </div>
            </div>

            {/* Milestone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentMilestones.map((m) => (
                <div
                  key={m.stage}
                  className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                    m.status === 'Completed' ? 'bg-emerald-50/60 border-emerald-200' :
                    m.status === 'Due'       ? 'bg-amber-50/60 border-amber-200'   : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 text-sm">Stage {m.stage}</span>
                    <StatusBadge
                      status={m.status === 'Completed' ? 'success' : m.status === 'Due' ? 'warning' : 'neutral'}
                      label={m.status}
                    />
                  </div>
                  <div className="font-bold text-slate-900 leading-snug">{m.title}</div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{m.description}</p>
                  <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-slate-400">Target</div>
                      <div className="font-semibold text-slate-700">{m.targetDate}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">{m.percentage}% release</div>
                      <div className="font-extrabold text-blue-600">{formatCurrency(m.amount)}</div>
                    </div>
                  </div>
                  {m.bankDisbursement && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full w-fit border border-emerald-200">
                      <CreditCard className="w-2.5 h-2.5" /> Bank Disbursement
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Payment Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stage</TableHead>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Target Date</TableHead>
                  <TableHead className="text-right">% Release</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead>Bank Link</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMilestones.map((m) => (
                  <TableRow key={m.stage}>
                    <TableCell className="font-extrabold text-blue-600">Stage {m.stage}</TableCell>
                    <TableCell className="font-semibold text-xs text-slate-900">{m.title}</TableCell>
                    <TableCell className="text-xs text-slate-600">{m.targetDate}</TableCell>
                    <TableCell className="text-right font-bold text-xs">{m.percentage}%</TableCell>
                    <TableCell className="text-right font-extrabold text-slate-900">{formatCurrency(m.amount)}</TableCell>
                    <TableCell>
                      {m.bankDisbursement
                        ? <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Bank</span>
                        : <span className="text-[10px] text-slate-400">Self</span>}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={m.status === 'Completed' ? 'success' : m.status === 'Due' ? 'warning' : 'neutral'}
                        label={m.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* ── Downloads Tab ── */}
        {activeTab === 'export' && (
          <div className="flex-1 overflow-y-auto">
            <DownloadsTab />
          </div>
        )}
      </div>

      <CompareDrawer />
    </motion.div>
  );
};
