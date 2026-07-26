import React from 'react';
import { useWizardStore, RoomCounts } from '../../../store/useWizardStore';
import { Card } from '../../../components/ui/Card';
import { Plus, Minus, Bed, Bath, Utensils, Tv, Sun, Briefcase, Sparkles, Box, LayoutGrid } from 'lucide-react';

export const Step6RoomPlanning: React.FC = () => {
  const { rooms, updateRoomCount } = useWizardStore();

  const roomList: { key: keyof RoomCounts; title: string; desc: string; icon: React.ReactNode }[] = [
    { key: 'bedrooms', title: 'Bedrooms', desc: 'Master & Guest bedrooms with attached toilets.', icon: <Bed className="w-4 h-4 text-blue-600" /> },
    { key: 'bathrooms', title: 'Bathrooms', desc: 'Ensuite & powder restrooms with waterproofing.', icon: <Bath className="w-4 h-4 text-blue-600" /> },
    { key: 'kitchen', title: 'Kitchens', desc: 'Modular kitchen space with utility outlet.', icon: <Utensils className="w-4 h-4 text-blue-600" /> },
    { key: 'dining', title: 'Dining Areas', desc: 'Family dining hall adjoining kitchen.', icon: <Utensils className="w-4 h-4 text-blue-600" /> },
    { key: 'living', title: 'Living Halls', desc: 'Formal and family lounge living rooms.', icon: <Tv className="w-4 h-4 text-blue-600" /> },
    { key: 'balcony', title: 'Balconies', desc: 'Open terrace and sit-out balconies.', icon: <Sun className="w-4 h-4 text-blue-600" /> },
    { key: 'office', title: 'Home Office / Study', desc: 'Dedicated workspace room.', icon: <Briefcase className="w-4 h-4 text-blue-600" /> },
    { key: 'pooja', title: 'Pooja Room', desc: 'East-facing Vastu compliant prayer space.', icon: <Sparkles className="w-4 h-4 text-blue-600" /> },
    { key: 'utility', title: 'Utility Area', desc: 'Washing machine & drying yard.', icon: <Box className="w-4 h-4 text-blue-600" /> },
    { key: 'storeRoom', title: 'Store Rooms', desc: 'Pantry and trunk storage space.', icon: <LayoutGrid className="w-4 h-4 text-blue-600" /> },
  ];

  const totalPoints = rooms.bedrooms * 8 + rooms.bathrooms * 6 + rooms.kitchen * 12 + rooms.living * 14;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Step 6: Room Count & Layout Planning</h2>
        <p className="text-xs text-slate-500 mt-1">
          Adjust room numbers. Real-time engineering algorithms update electrical point runs, plumbing fixtures, and flooring requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roomList.map((item) => (
          <Card key={item.key} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl">{item.icon}</div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-400">{item.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateRoomCount(item.key, -1)}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-700 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-extrabold text-sm text-slate-900">{rooms[item.key]}</span>
              <button
                onClick={() => updateRoomCount(item.key, 1)}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-700 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Real-time Engineering Impact Notice */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex justify-between items-center">
        <span>Estimated Electrical Points: <strong>{totalPoints} Runs</strong></span>
        <span>Estimated Doors & Windows: <strong>{rooms.bedrooms * 2 + rooms.bathrooms + 4} Sets</strong></span>
      </div>
    </div>
  );
};
