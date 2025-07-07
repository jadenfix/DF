'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function InteractiveBenchmark() {
  const [selectedTask, setSelectedTask] = useState('vqa');

  const benchmarks = {
    vqa: {
      name: 'VQA v2.0',
      metric: 'Accuracy (%)',
      models: [
        { name: 'Moondream 1.6B', score: 71.8, params: '1.6B', color: 'bg-blue-500' },
        { name: 'CLIP Tiny', score: 69.2, params: '1.3B', color: 'bg-red-400' },
        { name: 'LLaVA-1.5', score: 68.5, params: '7B', color: 'bg-yellow-400' },
        { name: 'SmolVLM', score: 65.3, params: '1.3B', color: 'bg-purple-400' }
      ]
    },
    coco: {
      name: 'COCO Captions',
      metric: 'BLEU-4 Score',
      models: [
        { name: 'Moondream 1.6B', score: 36.2, params: '1.6B', color: 'bg-blue-500' },
        { name: 'CLIP Tiny', score: 34.0, params: '1.3B', color: 'bg-red-400' },
        { name: 'Florence-2', score: 35.8, params: '10B', color: 'bg-green-400' },
        { name: 'SmolVLM', score: 32.1, params: '1.3B', color: 'bg-purple-400' }
      ]
    },
    efficiency: {
      name: 'Efficiency Score',
      metric: 'Score (Acc/GB)',
      models: [
        { name: 'Moondream 1.6B', score: 71.8, params: '1GB', color: 'bg-blue-500' },
        { name: 'CLIP Tiny', score: 53.2, params: '1.3GB', color: 'bg-red-400' },
        { name: 'LLaVA-1.5', score: 9.8, params: '7GB', color: 'bg-yellow-400' },
        { name: 'Florence-2', score: 3.6, params: '10GB', color: 'bg-green-400' }
      ]
    }
  };

  const currentBenchmark = benchmarks[selectedTask];
  const maxScore = Math.max(...currentBenchmark.models.map(m => m.score));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center mb-4">
        <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Live Benchmark Comparison
        </h3>
      </div>

      {/* Task Selector */}
      <div className="flex gap-2 mb-6">
        {Object.entries(benchmarks).map(([key, benchmark]) => (
          <button
            key={key}
            onClick={() => setSelectedTask(key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedTask === key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {benchmark.name}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="space-y-3">
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          {currentBenchmark.metric}
        </div>
        
        {currentBenchmark.models
          .sort((a, b) => b.score - a.score)
          .map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-20 text-xs text-slate-600 dark:text-slate-400 flex-shrink-0">
                {model.name}
              </div>
              <div className="flex-1 relative">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-full h-6 overflow-hidden">
                  <motion.div
                    className={`h-full ${model.color} flex items-center justify-end pr-2`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(model.score / maxScore) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <span className="text-white text-xs font-medium">
                      {model.score}{selectedTask === 'efficiency' ? '' : selectedTask === 'coco' ? '' : '%'}
                    </span>
                  </motion.div>
                </div>
              </div>
              <div className="w-12 text-xs text-slate-500 dark:text-slate-400 text-right">
                {model.params}
              </div>
            </motion.div>
          ))}
      </div>

      {/* Key Insight */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Key insight:</strong> Moondream achieves competitive accuracy with 4× smaller footprint than alternatives.
        </p>
      </div>
    </div>
  );
}
