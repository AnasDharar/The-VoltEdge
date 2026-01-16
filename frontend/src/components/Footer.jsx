import React from 'react';
import { CircuitBoard, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CircuitBoard className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl text-slate-800">The-VoltEdge</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering engineers and students with powerful digital logic simulation and analysis tools.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/ShardulBhaskar/The-VoltEdge" className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Tools</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="/k-map-solver" className="hover:text-blue-600 transition-colors">K-Map Solver</a></li>
              <li><a href="/truth-table" className="hover:text-blue-600 transition-colors">Truth Table Generator</a></li>
              <li><a href="/gate-simulator" className="hover:text-blue-600 transition-colors">Logic Gate Simulator</a></li>
              <li><a href="/base-converter" className="hover:text-blue-600 transition-colors">Base Converter</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Boolean Algebra Guide</a></li>
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <p>Shardul Bhaskar</p>
              </li>
              <li>
                <p>Anas Dharar</p>
              </li>
              <li>
                <p>Designed for students and professionals.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} The-VoltEdge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
