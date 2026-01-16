import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen font-sora text-slate-900 relative w-full">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
             <div className='absolute top-0 left-0 animate-ball1 h-[50vh] w-[50vh] rounded-full bg-red-400 blur-3xl opacity-50'></div>
             <div className='absolute top-0 left-0 animate-ball2 h-[50vh] w-[50vh] rounded-full bg-blue-400 blur-3xl opacity-50'></div>
        </div>
        
        <Navbar />

        <main className="relative mx-auto px-6 pb-20 z-10">
            {children}
        </main>
    </div>
  );
};

export default Layout;
