import React from 'react';
import { Ampersands } from 'lucide-react';
import ResistorCalculator from '../components/resistorColor/ResistorCalculator';

const ResistorColorCode = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[60vh]">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-50 rounded-xl">
           <Ampersands className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Resistor Color Code Calculator</h1>
           <p className="text-slate-500">Calculate resistance values based on color bands.</p>
        </div>
      </div>
      
      <ResistorCalculator />
    </div>
  );
};

export default ResistorColorCode;
