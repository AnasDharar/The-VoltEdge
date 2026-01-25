import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const COLORS = [
  { name: 'Black', value: 0, multiplier: 1, tolerance: null, hex: '#000000', text: 'text-white' },
  { name: 'Brown', value: 1, multiplier: 10, tolerance: 1, hex: '#8B4513', text: 'text-white' },
  { name: 'Red', value: 2, multiplier: 100, tolerance: 2, hex: '#EF4444', text: 'text-white' }, // Tailwind red-500
  { name: 'Orange', value: 3, multiplier: 1000, tolerance: null, hex: '#F97316', text: 'text-black' }, // Tailwind orange-500
  { name: 'Yellow', value: 4, multiplier: 10000, tolerance: null, hex: '#EAB308', text: 'text-black' }, // Tailwind yellow-500
  { name: 'Green', value: 5, multiplier: 100000, tolerance: 0.5, hex: '#22C55E', text: 'text-white' }, // Tailwind green-500
  { name: 'Blue', value: 6, multiplier: 1000000, tolerance: 0.25, hex: '#3B82F6', text: 'text-white' }, // Tailwind blue-500
  { name: 'Violet', value: 7, multiplier: 10000000, tolerance: 0.1, hex: '#A855F7', text: 'text-white' }, // Tailwind purple-500
  { name: 'Gray', value: 8, multiplier: 100000000, tolerance: 0.05, hex: '#6B7280', text: 'text-white' },
  { name: 'White', value: 9, multiplier: 1000000000, tolerance: null, hex: '#FFFFFF', text: 'text-black' },
  { name: 'Gold', value: null, multiplier: 0.1, tolerance: 5, hex: '#EAB308', text: 'text-black' }, // approximation
  { name: 'Silver', value: null, multiplier: 0.01, tolerance: 10, hex: '#9CA3AF', text: 'text-black' },
];

const ResistorCalculator = () => {
  const [numBands, setNumBands] = useState(4);
  const [selections, setSelections] = useState({
    band1: 1, // Brown
    band2: 0, // Black
    band3: 0, // Black (only for 5 band)
    multiplier: 100, // Red (x100) -> 1k
    tolerance: 5 // Gold
  });

  const [result, setResult] = useState('');

  // Update default selections when band count changes
  useEffect(() => {
     if (numBands === 4) {
         setSelections(prev => ({ ...prev, multiplier: 100 }));
     } else {
         setSelections(prev => ({ ...prev, multiplier: 100 }));
     }
  }, [numBands]);

  useEffect(() => {
    calculateResistance();
  }, [selections, numBands]);

  const calculateResistance = () => {
    
    let resistance = 0;
    
    const b1 = COLORS.find(c => c.value === selections.band1);
    const b2 = COLORS.find(c => c.value === selections.band2);
    const b3 = COLORS.find(c => c.value === selections.band3);
    const mult = COLORS.find(c => c.multiplier === selections.multiplier);
    const tol = COLORS.find(c => c.tolerance === selections.tolerance);

    if (numBands === 4) {
        if (b1 && b2 && mult) {
            resistance = (b1.value * 10 + b2.value) * mult.multiplier;
        }
    } else {
        if (b1 && b2 && b3 && mult) {
            resistance = (b1.value * 100 + b2.value * 10 + b3.value) * mult.multiplier;
        }
    }

    setResult({
        resistance: formatResistance(resistance),
        tolerance: tol ? `± ${tol.tolerance}%` : ''
    });
  };

  const formatResistance = (ohms) => {
      if (ohms >= 1000000000) return (ohms / 1000000000).toFixed(2).replace(/\.00$/, '') + ' GΩ';
      if (ohms >= 1000000) return (ohms / 1000000).toFixed(2).replace(/\.00$/, '') + ' MΩ';
      if (ohms >= 1000) return (ohms / 1000).toFixed(2).replace(/\.00$/, '') + ' kΩ';
      return ohms.toFixed(2).replace(/\.00$/, '') + ' Ω';
  };

  const handleChange = (type, value) => {
    setSelections(prev => ({
        ...prev,
        [type]: parseFloat(value)
    }));
  };

  // Filter colors valid for each position
  const digitColors = COLORS.filter(c => c.value !== null);
  const multiplierColors = COLORS.filter(c => c.multiplier !== null);
  const toleranceColors = COLORS.filter(c => c.tolerance !== null);

  return (
    <div className='flex flex-col gap-8'>
      
      {/* Band Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-slate-100 p-1 rounded-lg inline-flex">
          <button 
            onClick={() => setNumBands(4)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              numBands === 4 ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            4 Bands
          </button>
          <button 
            onClick={() => setNumBands(5)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              numBands === 5 ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            5 Bands
          </button>
      
        </div>
      </div>

      {/* Result Display */}
      <div className="text-center mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Calculated Resistance</h2>
          <div className="text-4xl font-bold text-slate-800">
              {result.resistance} <span className="text-2xl text-slate-500 font-normal">{result.tolerance}</span>
          </div>
      </div>

      {/* Controls */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${numBands === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'}`}>
          
          <ColorSelect 
            label="Band 1" 
            options={digitColors} 
            value={selections.band1} 
            field="value"
            onChange={(v) => handleChange('band1', v)} 
          />

          <ColorSelect 
            label="Band 2" 
            options={digitColors} 
            value={selections.band2} 
            field="value"
            onChange={(v) => handleChange('band2', v)} 
          />

          {numBands === 5 && (
             <ColorSelect 
               label="Band 3" 
               options={digitColors} 
               value={selections.band3} 
               field="value"
               onChange={(v) => handleChange('band3', v)} 
             />
          )}

          <ColorSelect 
            label="Multiplier" 
            options={multiplierColors} 
            value={selections.multiplier} 
            field="multiplier"
            onChange={(v) => handleChange('multiplier', v)} 
          />

          <ColorSelect 
            label="Tolerance" 
            options={toleranceColors} 
            value={selections.tolerance} 
            field="tolerance"
            onChange={(v) => handleChange('tolerance', v)} 
          />

      </div>
    </div>
  );
};

const ColorSelect = ({ label, options, value, field, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <div className="relative">
                <select 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-700"
                >
                    {options.map(c => (
                        <option key={c.name} value={c[field]}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                </div>
                {/* Color Indicator */}
                <div 
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-slate-200 pointer-events-none"
                    style={{ backgroundColor: options.find(o => o[field] === value)?.hex }}
                ></div>
            </div>
        </div>
    )
}

export default ResistorCalculator;
