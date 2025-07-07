'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  ArrowUpIcon, 
  ArrowDownIcon 
} from '@heroicons/react/24/outline';

interface RewardMetric {
  id: string;
  name: string;
  weight: number;
  operator: 'maximize' | 'minimize';
  description: string;
}

const defaultMetrics: RewardMetric[] = [
  {
    id: 'helpfulness',
    name: 'Helpfulness Score',
    weight: 1.0,
    operator: 'maximize',
    description: 'Human preference for response quality and usefulness'
  },
  {
    id: 'accuracy',
    name: 'Factual Accuracy',
    weight: 0.8,
    operator: 'maximize',
    description: 'Alignment with ground truth annotations'
  },
  {
    id: 'safety',
    name: 'Safety Compliance',
    weight: 1.2,
    operator: 'maximize',
    description: 'Constitutional AI safety constraints'
  },
  {
    id: 'brevity',
    name: 'Response Brevity',
    weight: 0.3,
    operator: 'maximize',
    description: 'Preference for concise, informative responses'
  }
];

export default function RewardFunctionBuilder() {
  const [metrics, setMetrics] = useState<RewardMetric[]>(defaultMetrics);
  const [isSaving, setIsSaving] = useState(false);

  const addMetric = () => {
    const newMetric: RewardMetric = {
      id: `metric_${Date.now()}`,
      name: 'New Metric',
      weight: 0.0,
      operator: 'maximize',
      description: 'Custom metric description'
    };
    setMetrics([...metrics, newMetric]);
  };

  const removeMetric = (id: string) => {
    setMetrics(metrics.filter(m => m.id !== id));
  };

  const updateMetric = (id: string, field: keyof RewardMetric, value: any) => {
    setMetrics(metrics.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const saveConfiguration = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/reward-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': 'admin-secret'
        },
        body: JSON.stringify({
          accuracy: metrics.find(m => m.id === 'accuracy')?.weight || 1.0,
          helpfulness: metrics.find(m => m.id === 'helpfulness')?.weight || 1.0,
          latency: metrics.find(m => m.id === 'latency')?.weight || -0.01
        })
      });
      
      if (response.ok) {
        // Show success message
        console.log('Reward function updated successfully');
      }
    } catch (error) {
      console.error('Failed to update reward function:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Constitutional Reward Function Builder
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Design mathematically principled reward functions with AI-powered insights and constitutional constraints
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                  Metrics Configuration
                </h3>
                <button
                  onClick={addMetric}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Metric
                </button>
              </div>

              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.id}
                    className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={metric.name}
                          onChange={(e) => updateMetric(metric.id, 'name', e.target.value)}
                          className="w-full text-lg font-semibold text-slate-900 dark:text-white bg-transparent border-none outline-none"
                          placeholder="Metric name"
                        />
                        <input
                          type="text"
                          value={metric.description}
                          onChange={(e) => updateMetric(metric.id, 'description', e.target.value)}
                          className="w-full text-sm text-slate-600 dark:text-slate-300 bg-transparent border-none outline-none mt-1"
                          placeholder="Description"
                        />
                      </div>
                      <button
                        onClick={() => removeMetric(metric.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Weight
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={metric.weight}
                          onChange={(e) => updateMetric(metric.id, 'weight', parseFloat(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Operator
                        </label>
                        <select
                          value={metric.operator}
                          onChange={(e) => updateMetric(metric.id, 'operator', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        >
                          <option value="maximize">Maximize</option>
                          <option value="minimize">Minimize</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={saveConfiguration}
                disabled={isSaving}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? 'Saving...' : 'Save Configuration'}
              </motion.button>
            </motion.div>
          </div>

          {/* Preview Panel */}
          <div>
            <motion.div
              className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Reward Function Preview
              </h3>
              
              <div className="bg-slate-900 rounded-lg p-4 mb-4">
                <code className="text-green-400 text-sm">
                  R(s, a) = {metrics.map((metric, index) => (
                    <span key={metric.id}>
                      {index > 0 && ' + '}
                      {metric.weight >= 0 ? '+' : ''}{metric.weight} × {metric.name.toLowerCase().replace(/\s+/g, '_')}
                    </span>
                  )).join('')}
                </code>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-slate-900 dark:text-white">Current Weights:</h4>
                {metrics.map(metric => (
                  <div key={metric.id} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {metric.name}
                    </span>
                    <span className={`text-sm font-semibold ${
                      metric.weight > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.weight > 0 ? '+' : ''}{metric.weight}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 