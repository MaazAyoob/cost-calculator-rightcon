import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUIStore } from '../../../store/useUIStore';
import { Sparkles, Building2, Loader2 } from 'lucide-react';

export const Step10LoadingExperience: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useUIStore();
  const [currentMessageIdx, setCurrentMessageIdx] = useState(0);
  const [progress, setProgress] = useState(5);

  const messages = [
    'Analysing Plot Geometry & Setback Laws...',
    'Calculating Built-up Area & FAR Ratios...',
    'Estimating TMT Steel & Structural Concrete Quantities...',
    'Estimating Cement Bags & AAC Block Masonry...',
    'Generating Category BOQ Breakdown...',
    'Preparing 10-Month Milestone Budget...',
    'Building Material Specification Matrix...',
    'Creating Bank-Ready Payment Schedule...',
    'Finalising Cost Calculator Dashboard Workspace...',
  ];

  useEffect(() => {
    // 5 second timer sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 12;
      });

      setCurrentMessageIdx((prev) => (prev + 1) % messages.length);
    }, 550);

    const redirectTimer = setTimeout(() => {
      addToast({
        title: 'Cost Calculator Engine Ready!',
        description: 'BOQ, materials, budget, and payment roadmap generated successfully.',
        type: 'success',
      });
      navigate('/dashboard');
    }, 5200);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [navigate, addToast]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-8 max-w-xl mx-auto">
      {/* Animated Brand Logo Icon */}
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-soft-xl animate-pulse">
          C
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 text-white rounded-xl shadow-soft-sm">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Engineering Your Dream Home</h2>
        <p className="text-xs text-slate-500">Cost Calculator Engine is compiling your baseline BOQ...</p>
      </div>

      {/* Message Carousel */}
      <div className="h-10 flex items-center justify-center">
        <motion.div
          key={currentMessageIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200/80 text-xs font-bold shadow-soft-xs"
        >
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span>{messages[currentMessageIdx]}</span>
        </motion.div>
      </div>

      {/* Smooth Progress Bar */}
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-600">
          <span>Computation Progress</span>
          <span className="text-blue-600">{Math.min(100, progress)}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      <div className="pt-4 flex items-center gap-4 text-xs text-slate-400 font-medium">
        <span>IS 456 Compliant</span>
        <span>•</span>
        <span>RMC Ready</span>
        <span>•</span>
        <span>Bank Loan Approval Standard</span>
      </div>
    </div>
  );
};
