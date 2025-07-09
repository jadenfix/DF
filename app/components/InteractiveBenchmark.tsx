'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function InteractiveBenchmark() {
  const [selectedTask, setSelectedTask] = useState('cost');

  const benchmarks = {
    cost: {
      name: 'Cost Efficiency',
      metric: 'Cost per 1K Images',
      models: [
        { name: 'Moondream 1.6B', score: 0.001, params: 'Self-hosted', color: 'bg-blue-500' },
        { name: 'OpenAI GPT-4V', score: 1.50, params: 'API', color: 'bg-red-500' },
        { name: 'Gwen-VL', score: 0.12, params: 'Self-hosted', color: 'bg-purple-500' }
      ]
    },
    efficiency: {
      name: 'Efficiency Score',
      metric: 'Performance per GB',
      models: [
        { name: 'Moondream 1.6B', score: 44.9, params: '1.6GB', color: 'bg-blue-500' },
        { name: 'OpenAI GPT-4V', score: 0.45, params: '175GB', color: 'bg-red-500' },
        { name: 'Gwen-VL', score: 10.4, params: '7GB', color: 'bg-purple-500' }
      ]
    },
    latency: {
      name: 'Inference Speed',
      metric: 'Images/Second',
      models: [
        { name: 'Moondream 1.6B', score: 4.2, params: '1.6B', color: 'bg-blue-500' },
        { name: 'OpenAI GPT-4V', score: 0.8, params: '175B', color: 'bg-red-500' },
        { name: 'Gwen-VL', score: 1.9, params: '7B', color: 'bg-purple-500' }
      ]
    },
    vqa: {
      name: 'VQA v2.0',
      metric: 'Accuracy (%)',
      models: [
        { name: 'Moondream 1.6B', score: 71.8, params: '1.6B', color: 'bg-blue-500' },
        { name: 'OpenAI GPT-4V', score: 78.2, params: '175B', color: 'bg-red-500' },
        { name: 'Gwen-VL', score: 73.1, params: '7B', color: 'bg-purple-500' }
      ]
    }
  };

  const currentBenchmark = benchmarks[selectedTask];
  const maxScore = selectedTask === 'cost' 
    ? Math.min(...currentBenchmark.models.map(m => m.score)) // For cost, use min as baseline
    : Math.max(...currentBenchmark.models.map(m => m.score)); // For others, use max

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
          .sort((a, b) => {
            // For cost, lower is better, so sort ascending
            if (selectedTask === 'cost') {
              return a.score - b.score;
            }
            // For all other metrics, higher is better
            return b.score - a.score;
          })
          .map((model, index) => {
            const maxVal = Math.max(...currentBenchmark.models.map(m => m.score));
            const minVal = Math.min(...currentBenchmark.models.map(m => m.score));
            
            let barWidth;
            if (selectedTask === 'cost') {
              // For cost, lower is better, so invert the calculation
              barWidth = `${100 - ((model.score - minVal) / (maxVal - minVal)) * 80}%`;
            } else {
              // For all other metrics, higher is better
              barWidth = `${(model.score / maxVal) * 100}%`;
            }
            
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-24 text-xs text-slate-600 dark:text-slate-400 flex-shrink-0">
                  {model.name}
                </div>
                <div className="flex-1 relative">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-full h-6 overflow-hidden">
                    <motion.div
                      className={`h-full ${model.color} flex items-center justify-end pr-2`}
                      initial={{ width: 0 }}
                      animate={{ width: barWidth }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <span className="text-white text-xs font-medium">
                        {selectedTask === 'cost' ? `$${model.score}` : 
                         selectedTask === 'latency' ? `${model.score}` :
                         selectedTask === 'efficiency' ? `${model.score}` :
                         `${model.score}%`}
                      </span>
                    </motion.div>
                  </div>
                </div>
                <div className="w-16 text-xs text-slate-500 dark:text-slate-400 text-right">
                  {model.params}
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Dynamic Key Insight */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Key insight:</strong> {
            selectedTask === 'cost' ? 'Moondream costs 1500x less per image than GPT-4V API - enabling affordable AI at scale.' :
            selectedTask === 'efficiency' ? 'Moondream delivers 100x better efficiency than GPT-4V with competitive accuracy.' :
            selectedTask === 'latency' ? 'Moondream processes images 5x faster than GPT-4V with real-time inference capabilities.' :
            selectedTask === 'vqa' ? 'Moondream achieves 91.8% of GPT-4V accuracy with 99% fewer parameters.' :
            'Moondream excels in efficiency metrics crucial for production deployment.'
          }
        </p>
      </div>
    </div>
  );
}
