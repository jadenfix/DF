'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BeakerIcon, 
  ChartBarIcon, 
  CogIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

interface TrainingJob {
  id: string;
  stage: 'collect' | 'train-reward' | 'fine-tune' | 'evaluate' | 'complete';
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  logs: string[];
  metrics: {
    rewardLoss?: number;
    klDivergence?: number;
    accuracy?: number;
    safetyScore?: number;
  };
}

export default function RLDashboard() {
  const [currentJob, setCurrentJob] = useState<TrainingJob>({
    id: '',
    stage: 'collect',
    status: 'idle',
    progress: 0,
    logs: [],
    metrics: {}
  });

  const [feedbackData, setFeedbackData] = useState('');
  const [isTraining, setIsTraining] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setCurrentJob(prev => {
          const newProgress = Math.min(prev.progress + Math.random() * 10, 100);
          const newLogs = [...prev.logs];
          
          if (newProgress > 25 && prev.stage === 'collect') {
            newLogs.push('✓ Feedback data processed. Starting reward model training...');
            return { ...prev, stage: 'train-reward', progress: newProgress, logs: newLogs };
          }
          if (newProgress > 50 && prev.stage === 'train-reward') {
            newLogs.push('✓ Reward model converged. Beginning policy fine-tuning...');
            return { 
              ...prev, 
              stage: 'fine-tune', 
              progress: newProgress, 
              logs: newLogs,
              metrics: { ...prev.metrics, rewardLoss: 0.23 }
            };
          }
          if (newProgress > 75 && prev.stage === 'fine-tune') {
            newLogs.push('✓ Policy optimization complete. Running safety evaluation...');
            return { 
              ...prev, 
              stage: 'evaluate', 
              progress: newProgress, 
              logs: newLogs,
              metrics: { ...prev.metrics, klDivergence: 0.15 }
            };
          }
          if (newProgress >= 100 && prev.stage === 'evaluate') {
            newLogs.push('🎉 RL pipeline complete! Model ready for deployment.');
            setIsTraining(false);
            return { 
              ...prev, 
              stage: 'complete', 
              status: 'completed',
              progress: 100, 
              logs: newLogs,
              metrics: { 
                ...prev.metrics, 
                accuracy: 0.847, 
                safetyScore: 0.92 
              }
            };
          }
          
          return { ...prev, progress: newProgress };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTraining]);

  const startTraining = () => {
    setIsTraining(true);
    setCurrentJob({
      id: `rl-job-${Date.now()}`,
      stage: 'collect',
      status: 'running',
      progress: 0,
      logs: ['🚀 Starting Constitutional AI training pipeline...'],
      metrics: {}
    });
  };

  const stopTraining = () => {
    setIsTraining(false);
    setCurrentJob(prev => ({ ...prev, status: 'idle' }));
  };

  const stages = [
    { 
      id: 'collect', 
      name: 'Data Collection', 
      icon: BeakerIcon,
      description: 'Collect human feedback and preference data'
    },
    { 
      id: 'train-reward', 
      name: 'Reward Modeling', 
      icon: ChartBarIcon,
      description: 'Train Bradley-Terry pairwise comparison model'
    },
    { 
      id: 'fine-tune', 
      name: 'Policy Optimization', 
      icon: CogIcon,
      description: 'PPO fine-tuning with KL divergence constraints'
    },
    { 
      id: 'evaluate', 
      name: 'Safety Evaluation', 
      icon: ExclamationTriangleIcon,
      description: 'Constitutional constraints and bias testing'
    },
    { 
      id: 'complete', 
      name: 'Complete', 
      icon: CheckCircleIcon,
      description: 'Model ready for deployment'
    }
  ];

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950/20 dark:via-slate-900 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Constitutional AI Training Pipeline
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Transform Moondream into a domain-specific expert through human preference optimization 
              and constitutional safety constraints.
            </p>
          </motion.div>

          {/* Pipeline Stages */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              {stages.map((stage, index) => {
                const Icon = stage.icon;
                const isActive = currentJob.stage === stage.id;
                const isCompleted = stages.findIndex(s => s.id === currentJob.stage) > index;
                
                return (
                  <div key={stage.id} className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : isCompleted 
                        ? 'bg-green-600 text-white' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm text-center">
                      {stage.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 text-center max-w-24">
                      {stage.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentJob.progress}%` }}
              />
            </div>
            <p className="text-center text-slate-600 dark:text-slate-400">
              {currentJob.progress.toFixed(1)}% Complete
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Training Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Training Controls
              </h2>

              {/* Feedback Data Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Human Feedback Data
                </label>
                <textarea
                  value={feedbackData}
                  onChange={(e) => setFeedbackData(e.target.value)}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  rows={4}
                  placeholder="Upload CSV or paste preference comparisons..."
                />
              </div>

              {/* Training Configuration */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Learning Rate
                  </label>
                  <input
                    type="number"
                    defaultValue="1e-5"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    KL Penalty
                  </label>
                  <input
                    type="number"
                    defaultValue="0.1"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!isTraining ? (
                  <button
                    onClick={startTraining}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    Start Training
                  </button>
                ) : (
                  <button
                    onClick={stopTraining}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <StopIcon className="w-5 h-5 mr-2" />
                    Stop Training
                  </button>
                )}
                
                <button className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Load Config
                </button>
              </div>
            </motion.div>

            {/* Live Metrics & Logs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Live Metrics
              </h2>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Reward Loss</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {currentJob.metrics.rewardLoss?.toFixed(3) || '--'}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">KL Divergence</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {currentJob.metrics.klDivergence?.toFixed(3) || '--'}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Accuracy</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {currentJob.metrics.accuracy ? `${(currentJob.metrics.accuracy * 100).toFixed(1)}%` : '--'}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">Safety Score</h3>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {currentJob.metrics.safetyScore ? `${(currentJob.metrics.safetyScore * 100).toFixed(1)}%` : '--'}
                  </p>
                </div>
              </div>

              {/* Training Logs */}
              <div className="bg-slate-900 rounded-lg p-4 h-48 overflow-y-auto">
                <h3 className="text-sm font-medium text-green-400 mb-2">Training Logs</h3>
                <div className="space-y-1">
                  {currentJob.logs.map((log, index) => (
                    <p key={index} className="text-sm text-green-300 font-mono">
                      {log}
                    </p>
                  ))}
                  {currentJob.logs.length === 0 && (
                    <p className="text-sm text-slate-500">No logs yet. Start training to see output.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Active Learning
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Identify low-confidence examples for additional human labeling
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Review Examples
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Safety Validation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Run constitutional constraints and bias testing
              </p>
              <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Run Safety Tests
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Model Deployment
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Deploy trained model to production environment
              </p>
              <button 
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentJob.stage === 'complete' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-slate-300 dark:bg-slate-600 text-slate-500 cursor-not-allowed'
                }`}
                disabled={currentJob.stage !== 'complete'}
              >
                Deploy Model
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
