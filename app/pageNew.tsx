'use client';

import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ResearchHub from './components/ResearchHub';
import RLPipeline from './components/RLPipeline';
import RewardFunctionBuilder from './components/RewardFunctionBuilder';
import ModelGallery from './components/ModelGallery';
import CodeSandbox from './components/CodeSandbox';
import EnterpriseInfrastructure from './components/EnterpriseInfrastructure';
import Roadmap from './components/Roadmap';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      {/* Hero Section - Research-First */}
      <Hero />
      
      {/* Research Hub - New Priority Section */}
      <ResearchHub />
      
      {/* Collapsible RL Pipeline */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Constitutional AI Pipeline
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Our VL-RLHF pipeline—detailed in our research paper—boosts domain accuracy by 20-30% 
              through human preference optimization.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a 
                href="#" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                📄 Read Paper
              </a>
              <a 
                href="#" 
                className="border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                🔬 Open in Colab
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Collapsed RL Pipeline Details */}
      <RLPipeline />
      
      {/* Reward Function Builder */}
      <RewardFunctionBuilder />
      
      {/* Model Variants with Cost Calculator */}
      <ModelGallery />
      
      {/* Developer SDK & CLI */}
      <CodeSandbox />
      
      {/* Enterprise Infrastructure - Condensed */}
      <EnterpriseInfrastructure />
      
      {/* Roadmap & Community */}
      <Roadmap />
      
      {/* Footer - Updated with Research Links */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🌔 DreamForge</h3>
              <p className="text-slate-300 mb-4">
                Research platform for Moondream&apos;s tiny vision-language models. 
                Pushing the frontier of efficient AI through open science.
              </p>
              <div className="text-sm text-slate-400">
                Built for the AI research community
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Research</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">📄 Papers & Preprints</a></li>
                <li><a href="#" className="hover:text-white transition-colors">🏆 Benchmarks & Leaderboards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">🔬 Notebooks & Datasets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">🎯 Community Challenges</a></li>
              </ul>
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
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">⭐ GitHub (8.2k stars)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">💬 Discord Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">📧 Research Grants</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">🔍 System Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; 2025 DreamForge. Open source research platform.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Apache 2.0 License</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Research Ethics</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
