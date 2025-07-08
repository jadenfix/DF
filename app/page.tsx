'use client';

import { motion } from 'framer-motion';
import Hero from './components/Hero';
import CompetitorComparison from './components/CompetitorComparison';
import SimpleRLPipeline from './components/SimpleRLPipeline';
import Navigation from './components/layout/navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      {/* Hero Section - Developer-Focused */}
      <Hero />
      
      {/* OpenAI vs DreamForge Comparison */}
      <CompetitorComparison />
      
      {/* Simple RL Pipeline Demo */}
      <SimpleRLPipeline />
      
      {/* Footer - Simple */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🚀 DreamForge</h3>
              <p className="text-slate-300 mb-4">
                High-performance vision AI that&apos;s faster and cheaper than OpenAI. 
                Built for developers who want results without the complexity.
              </p>
              <div className="text-sm text-slate-400">
                Enterprise-ready vision AI
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/playground" className="hover:text-white transition-colors">AI Playground</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/research" className="hover:text-white transition-colors">Research</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2025 DreamForge. Better vision AI for everyone.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
