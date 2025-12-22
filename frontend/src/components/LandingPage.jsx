import React, { useState } from 'react';
import { 
  Grid3x3, 
  Table, 
  Cpu, 
  Ampersands,
  Binary, 
  Calculator, 
  Zap, 
  Search, 
  ArrowRight 
} from 'lucide-react';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Tool definitions for easy management
  const tools = [
    {
      id: 'kmap',
      title: 'K-Map Solver',
      desc: 'Simplify boolean expressions with SOP and POS methods.',
      icon: <Grid3x3 className="w-8 h-8 text-blue-600" />,
      tag: 'Logic'
    },
    {
      id: 'truthtable',
      title: 'Truth Table Generator',
      desc: 'Generate tables from boolean expressions.',
      icon: <Table className="w-8 h-8 text-emerald-600" />,
      tag: 'Logic'
    },
    
    {
      id: 'converter',
      title: 'Base Converter',
      desc: 'Hex, Binary, Decimal, Octal translator.',
      icon: <Binary className="w-8 h-8 text-orange-600" />,
      tag: 'Math'
    },
    {
      id: 'gates',
      title: 'Logic Gates Minimizer',
      desc: "Solve and understand basic logic gates.",
      icon: <Ampersands className="w-8 h-8 text-red-600" />,
      tag: 'Circuits'
    }
  ];

  // Filter tools based on search
  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navbar - Minimalist */}
      <nav className="sticky top-10 backdrop-blur-[10px] z-100 left-0 w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="" alt="Logo" className='w-6 h-6 border border-black rounded-full' />
          <span className="font-bold text-xl tracking-tight">The VoltEdge</span>
        </div>
        <div className='flex gap-8'>
        <div className="text-md font-medium text-slate-500 hover:text-blue-600 cursor-pointer">
          About
        </div>
        <div className="text-md font-medium text-slate-500 hover:text-blue-600 cursor-pointer">
          Contact Us
        </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative max-w-5xl mx-auto px-6 pt-16 pb-20">
        <div className='absolute top-0 left-0 animate-ball1 h-[50vh] w-[50vh] rounded-full bg-red-400 blur-2xl z-0'></div>
        <div className='absolute top-0 left-0 animate-ball2 h-[50vh] w-[50vh] rounded-full bg-blue-400 blur-2xl z-0'></div>
        {/* Header Text */}
        <div className="relative text-center mb-12 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight">
            Your Digital Electronics Companion
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Instant tools for digital logic, conversions, etc. for electronics students
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* The Grid Toolset */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between h-48"
              onClick={() => console.log(`Navigating to ${tool.id}`)}
            >
              <div>
                <div className="flex justify-center items-start mb-4">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    {tool.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if search yields no results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No tools found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-2 text-blue-600 font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default LandingPage;