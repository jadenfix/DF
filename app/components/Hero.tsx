'use client';

import { motion } from 'framer-motion';
import { PlayIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated SVG Pipeline */}
      <div className="absolute inset-0 opacity-10">
        <motion.svg
          viewBox="0 0 800 600"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          {/* Image Input */}
          <motion.rect
            x="50"
            y="250"
            width="120"
            height="100"
            rx="8"
            fill="#3b82f6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <text x="110" y="310" textAnchor="middle" className="text-xs fill-white">
            Image
          </text>

          {/* Arrow */}
          <motion.path
            d="M 180 300 L 280 300"
            stroke="#6b7280"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />

          {/* Feature Map */}
          <motion.rect
            x="300"
            y="200"
            width="150"
            height="150"
            rx="8"
            fill="#10b981"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />
          <text x="375" y="280" textAnchor="middle" className="text-xs fill-white">
            Feature Map
          </text>

          {/* Arrow */}
          <motion.path
            d="M 470 275 L 570 275"
            stroke="#6b7280"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          />

          {/* Text Output */}
          <motion.rect
            x="590"
            y="250"
            width="120"
            height="100"
            rx="8"
            fill="#f59e0b"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
          />
          <text x="650" y="310" textAnchor="middle" className="text-xs fill-white">
            Text
          </text>
        </motion.svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Powerful Visual AI.
          <span className="block text-blue-600 dark:text-blue-400">Tiny Footprint.</span>
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Enterprise-grade deployment platform for Moondream's revolutionary 1.6B parameter vision-language model. 
          From prototype to production in minutes, not months.
        </motion.p>

        {/* Live Code Snippet */}
        <motion.div
          className="bg-slate-900 rounded-lg p-4 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Terminal</span>
            <CodeBracketIcon className="w-4 h-4 text-slate-400" />
          </div>
          <code className="text-green-400 text-sm md:text-base">
            pip install moondream && python -c "import moondream; moondream.vl()"
          </code>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href="/playground" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
            <PlayIcon className="w-5 h-5" />
            Get Started
          </a>
          <a href="/docs" className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            View Documentation
          </a>
        </motion.div>
      </div>
    </section>
  );
} 