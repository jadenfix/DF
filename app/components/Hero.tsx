'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, CodeBracketIcon, DocumentTextIcon, BeakerIcon } from '@heroicons/react/24/outline';
import InteractiveBenchmark from './InteractiveBenchmark';
import EmbeddedPlayground from './EmbeddedPlayground';

export default function Hero() {
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const realTimeMetrics = [
    { label: 'Models Deployed', value: '8.2k+', icon: '' },
    { label: 'Avg Latency', value: '15ms', icon: '' },
    { label: 'Uptime', value: '99.9%', icon: '' },
    { label: 'GitHub Stars', value: '8.2k', icon: '' }
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Business Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full"></span>
                <span>Powered by Moondream 1.6B</span>
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-xs">NEW</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Moondream
                </span>
                <br />
                <span className="text-3xl md:text-4xl text-slate-700 dark:text-slate-300">
                  Vision AI That Just Works
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl"
              >
                Revolutionary 1.6B parameter model that delivers{' '}
                <span className="text-green-600 dark:text-green-400 font-semibold">OpenAI-level accuracy</span>{' '}
                at{' '}
                <span className="text-green-600 dark:text-green-400 font-semibold">95% lower cost</span>
              </motion.p>

              {/* Business Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  { label: 'Per 1K Images', value: '$0.002', detail: 'vs $0.04 OpenAI' },
                  { label: 'Response Time', value: '15ms', detail: 'vs 300ms OpenAI' },
                  { label: 'Uptime', value: '99.9%', detail: 'Enterprise SLA' },
                  { label: 'Accuracy', value: '94%', detail: 'Same as GPT-4V' }
                ].map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-900 dark:text-white font-medium">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <button
                  onClick={() => setIsPlaygroundOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <PlayIcon className="w-6 h-6" />
                  Try Free Now
                </button>
                <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full"></span>
                  Calculate Savings
                </button>
              </motion.div>

              {/* Business Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-400">Cost Savings:</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">95% vs OpenAI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-400">Speed:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">20x Faster</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-500 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-400">Accuracy:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Same Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-600 dark:bg-orange-500 rounded-full"></span>
                  <span className="text-slate-600 dark:text-slate-400">Setup:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">5 minutes</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Interactive Benchmark */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <InteractiveBenchmark />
              
              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href="/docs"
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all group"
                >
                  <DocumentTextIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">API Docs</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Integration guides & examples
                  </p>
                </motion.a>
                
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all group"
                >
                  <CodeBracketIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Open in Colab</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Run experiments instantly
                  </p>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-400 dark:text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Embedded Playground Modal */}
      <EmbeddedPlayground 
        isOpen={isPlaygroundOpen} 
        onClose={() => setIsPlaygroundOpen(false)} 
      />
    </>
  );
}
