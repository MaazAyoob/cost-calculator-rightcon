import React from 'react';
import { useWizardStore } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Car, Bike, Zap, ArrowUpCircle, Check, Plus, Minus } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const Step5ParkingTech: React.FC = () => {
  const { parkingType, carCount, bikeCount, evCharging, liftRequired, setParkingConfig } = useWizardStore();

  const handleCars = (delta: number) => {
    setParkingConfig(parkingType, Math.max(0, carCount + delta), bikeCount, evCharging, liftRequired);
  };

  const handleBikes = (delta: number) => {
    setParkingConfig(parkingType, carCount, Math.max(0, bikeCount + delta), evCharging, liftRequired);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 5: Parking & Smart Amenities</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure vehicle capacity, EV charging ports, and elevator shafts.
        </p>
      </div>

      {/* Parking Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'Normal Parking', label: 'Ground Surface Parking', desc: 'Standard open/covered driveway parking.' },
          { id: 'Stilt Parking', label: 'Dedicated Stilt Floor', desc: 'Full ground level RCC stilt floor for 4+ vehicles.' },
        ].map((item) => {
          const isSelected = parkingType === item.id;
          return (
            <Card
              key={item.id}
              onClick={() => setParkingConfig(item.id as any, carCount, bikeCount, evCharging, liftRequired)}
              className={cn(
                'p-4 cursor-pointer transition-all duration-200 space-y-2',
                isSelected
                  ? 'bg-blue-50/50 border-blue-600 shadow-soft-sm ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
              </div>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      {/* Steppers for Vehicles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Cars Stepper */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Car Parking Slots</h4>
              <p className="text-[11px] text-slate-400">Covered sedan/SUV slots</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCars(-1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-700"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-extrabold text-sm text-slate-900">{carCount}</span>
            <button
              onClick={() => handleCars(1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-700"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>

        {/* Bikes Stepper */}
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Two-Wheeler Slots</h4>
              <p className="text-[11px] text-slate-400">Bikes & Scooter slots</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBikes(-1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-700"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-extrabold text-sm text-slate-900">{bikeCount}</span>
            <button
              onClick={() => handleBikes(1)}
              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-700"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </Card>
      </div>

      {/* Tech Toggles */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <div>
              <span className="text-xs font-bold text-slate-900">EV Charging Point Installation</span>
              <p className="text-[11px] text-slate-500">7.2kW AC Fast Charger conduit & dedicated breaker.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={evCharging}
            onChange={(e) => setParkingConfig(parkingType, carCount, bikeCount, e.target.checked, liftRequired)}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <ArrowUpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-xs font-bold text-slate-900">Passenger Elevator / Lift Shaft</span>
              <p className="text-[11px] text-slate-500">4-Passenger hydraulic/gearless elevator shaft & pit.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={liftRequired}
            onChange={(e) => setParkingConfig(parkingType, carCount, bikeCount, evCharging, e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </label>
      </div>
    </div>
  );
};
