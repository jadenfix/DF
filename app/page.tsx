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
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DreamForge</h3>
              <p className="text-slate-300 mb-4">
                Enterprise-grade deployment platform for Moondream's vision-language AI. Transform your business with constitutional AI training.
              </p>
              <div className="text-sm text-slate-400">
                Built for the AI community
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="/playground" className="hover:text-white transition-colors">AI Playground</a></li>
                <li><a href="/playground-advanced" className="hover:text-white transition-colors">Advanced Features</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Enterprise AI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Integration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">On-Premise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; 2025 DreamForge. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 