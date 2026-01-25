import React from 'react';
import { Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex p-3 bg-slate-900 rounded-2xl mb-6 shadow-xl shadow-slate-900/20">
          <Zap size={32} className="text-white fill-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Simplifying Electronics Design
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          VoltEdge is built for students, engineers, and hobbyists. Providing simple, intuitive tools to visualize and solve complex circuit logic problems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <div className="border-l-4 border-slate-700 pl-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To democratize access to high-quality digital logic design tools. We believe that learning electronics should be interactive, visual, and accessible directly from your browser.
            </p>
          </div>
          <div className="border-l-4 border-slate-700 pl-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">The Tools</h3>
            <p className="text-slate-600 leading-relaxed">
              From K-Map solvers to Resistor Calculators, our suite of tools is designed to handle the tedious calculations so you can focus on the logic and design.
            </p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 relative overflow-hidden">
            
            <h3 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Open Source</h3>
            <p className="text-slate-600 mb-6 relative z-10">
                VoltEdge is proudly open source. We believe in transparency and community collaboration. Check out our code, contribute, or suggest new features on GitHub.
            </p>
            <a 
                href="https://github.com/ShardulBhaskar/The-VoltEdge" 
                target="_blank" 
                rel="noreferrer"
                className="border p-2 rounded-lg inline-flex items-center text-sm duration-100 text-slate-900 hover:bg-slate-700 hover:text-white transition-colors relative z-10"
            >
                Start Contributing
            </a>
        </div>
      </div>
    </div>
  );
};

export default About;
