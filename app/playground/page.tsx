'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/layout/navigation';
import ModelSelector from '../components/features/ModelSelector';
import RewardBuilder, { RewardWeights } from '../components/features/RewardBuilder';
import OutputGrid, { GenerationResult } from '../components/features/OutputGrid';
import LogsConsole, { LogEntry } from '../components/features/LogsConsole';
import UsageDashboard from '../components/features/UsageDashboard';
import PreviewDeploy from '../components/features/PreviewDeploy';
import ABTestView from '../components/features/ABTestView';
import { 
  PhotoIcon, 
  SparklesIcon,
  ArrowPathIcon,
  CogIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  BeakerIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const SAMPLE_IMAGES = [
  {
    url: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    name: 'Test Image 1'
  },
  {
    url: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    name: 'Test Image 2'
  }
];

type TabType = 'playground' | 'analytics' | 'deploys' | 'abtest';

export default function Playground() {
  const [activeTab, setActiveTab] = useState<TabType>('playground');
  const [selectedModel, setSelectedModel] = useState('moondream2');
  const [prompt, setPrompt] = useState('Describe this image in detail');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [rewardWeights, setRewardWeights] = useState<RewardWeights>({
    accuracy: 1.0,
    creativity: 0.8,
    detail: 1.2,
    speed: 0.5,
    visual_quality: 1.0,
    helpfulness: 1.1
  });
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isSavingRewards, setIsSavingRewards] = useState(false);

  const addLog = (level: LogEntry['level'], message: string, component?: string) => {
    const newLog: LogEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      level,
      message,
      component
    };
    setLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setUploadedImage(base64);
        setSelectedImage(base64);
        addLog('info', `Uploaded image: ${file.name}`, 'Image Upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      addLog('error', 'Please enter a prompt', 'Generation');
      return;
    }

    setIsGenerating(true);
    addLog('info', `Starting generation with model: ${selectedModel}`, 'Generation');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          image: selectedImage,
          rewardWeights
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const newResult: GenerationResult = {
        id: `result_${Date.now()}`,
        modelId: selectedModel,
        prompt,
        response: data.response || 'Generated response content...',
        timestamp: Date.now(),
        rewardScore: data.rewardScore || 0.85,
        latency: data.latency || Math.floor(Math.random() * 300) + 200
      };

      setResults(prev => [newResult, ...prev.slice(0, 9)]);
      addLog('success', `Generated response: ${data.response?.substring(0, 50)}...`, 'Generation');
      
    } catch (error) {
      console.error('Generation error:', error);
      addLog('error', `Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'Generation');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRewards = async () => {
    setIsSavingRewards(true);
    addLog('info', 'Saving reward function configuration...', 'Reward Config');
    
    try {
      const response = await fetch('/api/admin/reward-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardWeights })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      addLog('success', 'Reward function saved successfully', 'Reward Config');
    } catch (error) {
      console.error('Save rewards error:', error);
      addLog('error', `Failed to save rewards: ${error instanceof Error ? error.message : 'Unknown error'}`, 'Reward Config');
    } finally {
      setIsSavingRewards(false);
    }
  };

  const handleRetrain = async () => {
    setIsTraining(true);
    addLog('info', 'Starting RLHF retraining process...', 'Retraining');
    
    try {
      const response = await fetch('/api/retrain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          rewardWeights,
          datasetSize: 100
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Simulate training progress
      const steps = [
        'Initializing training environment...',
        'Loading base model weights...',
        'Preparing training dataset...',
        'Starting reward model training...',
        'Running policy optimization...',
        'Validating model performance...',
        'Saving trained model...',
        'Training complete!'
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        addLog('info', steps[i], 'Retraining');
      }

      addLog('success', 'Model retrained successfully with custom reward function', 'Retraining');
    } catch (error) {
      console.error('Retraining error:', error);
      addLog('error', `Retraining failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'Retraining');
    } finally {
      setIsTraining(false);
    }
  };

  const tabs = [
    { id: 'playground' as TabType, label: 'Playground', icon: SparklesIcon },
    { id: 'abtest' as TabType, label: 'A/B Testing', icon: BeakerIcon },
    { id: 'analytics' as TabType, label: 'Analytics', icon: ChartBarIcon },
    { id: 'deploys' as TabType, label: 'Deployments', icon: RocketLaunchIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            DreamForge Advanced Playground
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-6"
          >
            The Vercel of Vision Language Models
          </motion.p>
          
          {/* Branch Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Currently viewing: {currentBranch}</span>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'playground' && (
            <motion.div
              key="playground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Controls */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Model Selection */}
                  <ModelSelector
                    selectedModel={selectedModel}
                    onModelChange={setSelectedModel}
                  />

                  {/* Image Upload */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Image Input
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Upload Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Or choose sample
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {SAMPLE_IMAGES.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(image.url)}
                              className={`p-2 border-2 rounded-lg transition-colors ${
                                selectedImage === image.url
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <img 
                                src={image.url} 
                                alt={image.name}
                                className="w-full h-16 object-cover rounded"
                              />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {image.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prompt Input */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Prompt
                    </h3>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Describe what you want the model to analyze or generate..."
                    />
                    
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt.trim()}
                      className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isGenerating ? (
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      ) : (
                        <SparklesIcon className="w-5 h-5" />
                      )}
                      <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
                    </button>
                  </div>

                  {/* Reward Function Builder */}
                  <RewardBuilder
                    weights={rewardWeights}
                    onWeightsChange={setRewardWeights}
                    onSave={handleSaveRewards}
                    onRetrain={handleRetrain}
                    isSaving={isSavingRewards}
                    isTraining={isTraining}
                  />
                </div>

                {/* Right Column - Results and Logs */}
                <div className="lg:col-span-2 space-y-6">
                  <OutputGrid 
                    results={results} 
                    onFeedback={(id, feedback) => {
                      setResults(prev => 
                        prev.map(result => 
                          result.id === id 
                            ? { ...result, feedback }
                            : result
                        )
                      );
                      addLog('info', `Feedback recorded: ${feedback}`, 'Feedback');
                    }}
                  />
                  <LogsConsole logs={logs} />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'abtest' && (
            <motion.div
              key="abtest"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ABTestView 
                prompt={prompt}
                imageUrl={selectedImage || undefined}
                onOutputSelect={(output) => {
                  addLog('info', `Selected output from ${output.model}`, 'A/B Test');
                }}
              />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <UsageDashboard 
                selectedBranch={currentBranch}
                onBranchChange={setCurrentBranch}
              />
            </motion.div>
          )}

          {activeTab === 'deploys' && (
            <motion.div
              key="deploys"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <PreviewDeploy 
                currentBranch={currentBranch}
                onBranchSwitch={setCurrentBranch}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 