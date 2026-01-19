import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-[95%] md:max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl md:rounded-full px-4 py-3 md:px-6 md:py-3 flex justify-between items-center transition-all duration-300">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
           <div className="p-2 bg-slate-900 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-slate-900/20">
              <Zap size={18} className="text-white fill-white" />
           </div>
           <span className="font-bold text-lg text-slate-900 tracking-tight">VoltEdge</span>
        </Link>

        {/* Desktop Links - Pill Style */}
        <div className="hidden md:flex items-center gap-2">
            {[
              { name: 'Tools', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="px-4 py-2 rounded-full text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2.5 text-slate-900 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors border border-slate-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-2 flex flex-col gap-1 animate-in slide-in-from-top-2 fade-in duration-200 origin-top-right">
           {['Tools', 'About', 'Contact'].map((item) => (
             <div key={item} className="px-4 py-3 hover:bg-slate-50 rounded-xl font-medium text-sm text-slate-600 cursor-pointer transition-colors text-left">
                {item}
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
