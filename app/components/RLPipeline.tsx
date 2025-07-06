'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CpuChipIcon, 
  UserIcon, 
  ChartBarIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

interface PipelineStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  metrics: {
    label: string;
    value: string;
    unit: string;
  }[];
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 'inference',
    title: 'Model Inference',
    description: 'Fast, efficient vision-language processing',
    icon: CpuChipIcon,
    metrics: [
      { label: 'Latency', value: '20', unit: 'ms' },
      { label: 'Model Size', value: '50', unit: 'M params' }
    ]
  },
  {
    id: 'feedback',
    title: 'Human Feedback',
    description: 'Real-time user preference collection',
    icon: UserIcon,
    metrics: [
      { label: 'Events/Day', value: '2k', unit: '' },
      { label: 'Response Rate', value: '85', unit: '%' }
    ]
  },
  {
    id: 'reward',
    title: 'Reward Shaping',
    description: 'Dynamic reward function optimization',
    icon: ChartBarIcon,
    metrics: [
      { label: 'Accuracy Weight', value: '+1.0', unit: '' },
      { label: 'Latency Penalty', value: '-0.01', unit: '/ms' }
    ]
  },
  {
    id: 'update',
    title: 'Policy Update',
    description: 'Continuous model improvement',
    icon: ArrowPathIcon,
    metrics: [
      { label: 'Update Frequency', value: 'Daily', unit: '' },
      { label: 'Improvement', value: '+3.2', unit: '%' }
    ]
  }
];

export default function RLPipeline() {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

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
            Interactive RL Pipeline
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            See how DreamForge continuously improves through reinforcement learning from human feedback
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Connection Line */}
              {index < pipelineSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-300 dark:bg-slate-600 transform -translate-y-1/2 z-0" />
              )}

              {/* Step Card */}
              <motion.div
                className={`relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 transition-all duration-300 ${
                  hoveredStep === step.id
                    ? 'border-blue-500 shadow-xl scale-105'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {step.description}
                </p>

                {/* Metrics */}
                <div className="space-y-2">
                  {step.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {metric.label}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {metric.value}{metric.unit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover Tooltip */}
                {hoveredStep === step.id && (
                  <motion.div
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
                    Click to configure
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Pipeline Flow Animation */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-slate-800 rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Live Pipeline
              </span>
            </div>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Processing 1,247 requests today
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 