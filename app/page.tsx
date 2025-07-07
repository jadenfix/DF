'use client';

import { motion } from 'framer-motion';
import Hero from './components/Hero';
import RLPipeline from './components/RLPipeline';
import RewardFunctionBuilder from './components/RewardFunctionBuilder';
import ModelGallery from './components/ModelGallery';
import CodeSandbox from './components/CodeSandbox';
import EnterpriseInfrastructure from './components/EnterpriseInfrastructure';
import Roadmap from './components/Roadmap';
import Navigation from './components/layout/navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* RL Pipeline Showcase */}
      <RLPipeline />
      
      {/* Reward Function Builder */}
      <RewardFunctionBuilder />
      
      {/* Model Gallery */}
      <ModelGallery />
      
      {/* Developer SDK & CLI */}
      <CodeSandbox />
      
      {/* Enterprise Infrastructure */}
      <EnterpriseInfrastructure />
      
      {/* Roadmap & Community */}
      <Roadmap />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DreamForge</h3>
              <p className="text-slate-300">
                Advanced deployment platform for Moondream vision-language models. Scale from prototype to production.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/playground" className="hover:text-white transition-colors">Playground</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SDK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CLI</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 DreamForge. Built by Jaden for the AI community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 