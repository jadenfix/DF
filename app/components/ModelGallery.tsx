'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CpuChipIcon, 
  ClockIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

interface Model {
  id: string;
  name: string;
  parameters: string;
  latency: string;
  memory: string;
  accuracy: string;
  cost: string;
  description: string;
  features: string[];
}

const models: Model[] = [
  {
    id: 'moondream-10m',
    name: 'Moondream-10M',
    parameters: '10M',
    latency: '15ms',
    memory: '512MB',
    accuracy: '92%',
    cost: '$0.001',
    description: 'Ultra-fast vision-language model for real-time applications',
    features: ['Image captioning', 'Visual Q&A', 'Object detection', 'OCR']
  },
  {
    id: 'moondream-25m',
    name: 'Moondream-25M',
    parameters: '25M',
    latency: '25ms',
    memory: '1GB',
    accuracy: '94%',
    cost: '$0.002',
    description: 'Balanced performance and efficiency for production use',
    features: ['Advanced reasoning', 'Multi-modal understanding', 'Context awareness']
  },
  {
    id: 'moondream-50m',
    name: 'Moondream-50M',
    parameters: '50M',
    latency: '40ms',
    memory: '2GB',
    accuracy: '96%',
    cost: '$0.004',
    description: 'High-accuracy model for complex visual understanding tasks',
    features: ['Complex scene analysis', 'Detailed descriptions', 'Spatial reasoning']
  }
];

export default function ModelGallery() {
  const [selectedModel, setSelectedModel] = useState<string>('moondream-25m');

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Model Gallery
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Choose from our optimized small-parameter models. Achieve 95% of SOTA performance at 1/10th the cost.
          </p>
        </motion.div>

        {/* Model Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              className={`relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                selectedModel === model.id
                  ? 'border-blue-500 shadow-xl scale-105'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onClick={() => setSelectedModel(model.id)}
              whileHover={{ y: -5 }}
            >
              {/* Model Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CpuChipIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {model.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {model.description}
                </p>
              </div>

              {/* Benchmarks */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <ClockIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">Latency</span>
                  </div>
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {model.latency}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CpuChipIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">Memory</span>
                  </div>
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {model.memory}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircleIcon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">Accuracy</span>
                  </div>
                  <span className="text-lg font-semibold text-green-600">
                    {model.accuracy}
                  </span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Cost</span>
                  </div>
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {model.cost}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Features:</h4>
                {model.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Selection Indicator */}
              {selectedModel === model.id && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircleIcon className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Performance Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    Model
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    Parameters
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    Latency
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    Accuracy
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    Cost/Request
                  </th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr
                    key={model.id}
                    className={`border-b border-slate-100 dark:border-slate-700 ${
                      selectedModel === model.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      {model.name}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">
                      {model.parameters}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">
                      {model.latency}
                    </td>
                    <td className="py-3 px-4 text-center text-green-600 font-semibold">
                      {model.accuracy}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">
                      {model.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Cost Calculator */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Cost Calculator</h3>
            <p className="text-blue-100">Estimate your monthly costs</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <label className="block text-sm font-medium mb-2">Images per month</label>
              <input
                type="range"
                min="100"
                max="100000"
                step="100"
                defaultValue="1000"
                className="w-full"
              />
              <div className="flex justify-between text-sm mt-1">
                <span>100</span>
                <span>10,000</span>
                <span>100,000</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">$2.40</div>
              <div className="text-blue-100">Estimated monthly cost</div>
              <div className="text-sm text-blue-200 mt-2">
                Free tier: Up to 1,000 images/month
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 