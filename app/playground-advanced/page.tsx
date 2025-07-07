'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/layout/navigation';
import ModelSelector from '../components/features/ModelSelector';
import RewardBuilder, { RewardWeights } from '../components/features/RewardBuilder';
import OutputGrid, { GenerationResult } from '../components/features/OutputGrid';
import LogsConsole, { LogEntry } from '../components/features/LogsConsole';
import { 
  PhotoIcon, 
  SparklesIcon,
  ArrowPathIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const SAMPLE_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format',
    name: 'Office Scene'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
    name: 'Mountain Landscape'
  },
  {
    url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop&auto=format',
    name: 'Abstract Art'
  },
  {
    url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&h=300&fit=crop&auto=format',
    name: 'Text Document'
  }
];

export default function AdvancedPlayground() {
  const [selectedModel, setSelectedModel] = useState('moondream2');
  const [prompt, setPrompt] = useState('Describe this image in detail');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
    setLogs(prev => [...prev, newLog]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setSelectedImage(result);
        addLog('info', `Uploaded image: ${file.name}`, 'Upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt.trim()) {
      addLog('warning', 'Please select an image and enter a prompt', 'Generate');
      return;
    }

    setIsGenerating(true);
    addLog('info', 'Starting image analysis...', 'Generate');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          image: selectedImage,
          modelId: selectedModel,
          rewardWeights
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setResults(prev => [data.result, ...prev]);
        addLog('success', `Generated response in ${data.result.latency}ms (Score: ${(data.result.rewardScore * 100).toFixed(0)}%)`, 'Generate');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Generation failed:', error);
      addLog('error', `Generation failed: ${error}`, 'Generate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRewards = async () => {
    setIsSavingRewards(true);
    addLog('info', 'Saving reward function configuration...', 'Rewards');
    
    try {
      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      addLog('success', 'Reward function saved successfully', 'Rewards');
    } catch (error) {
      addLog('error', 'Failed to save reward function', 'Rewards');
    } finally {
      setIsSavingRewards(false);
    }
  };

  const handleStartTraining = async () => {
    setIsTraining(true);
    addLog('info', 'Initiating model retraining...', 'Training');

    try {
      const response = await fetch('/api/retrain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rewardWeights })
      });

      const data = await response.json();
      
      if (data.success) {
        addLog('success', 'Training pipeline started', 'Training');
        
        // Simulate training steps
        for (const step of data.steps) {
          await new Promise(resolve => setTimeout(resolve, step.delay));
          addLog('info', step.message, 'Training');
        }
        
        addLog('success', 'Model retraining completed!', 'Training');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      addLog('error', `Training failed: ${error}`, 'Training');
    } finally {
      setIsTraining(false);
    }
  };

  const handleFeedback = async (id: string, feedback: 'positive' | 'negative') => {
    addLog('info', `Recorded ${feedback} feedback for result ${id.substr(-8)}`, 'Feedback');
    
    // Update the result with feedback
    setResults(prev => prev.map(result => 
      result.id === id ? { ...result, feedback } : result
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced AI Playground
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive model explorer with custom reward functions and real-time training
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Model Selection */}
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />

            {/* Image Input */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Image Input
              </h3>
              
              {/* Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <PhotoIcon className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              {/* Sample Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Or use sample image
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_IMAGES.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img.url)}
                      className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-full h-16 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{img.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Prompt
              </h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={isGenerating || !selectedImage || !prompt.trim()}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {isGenerating ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  <SparklesIcon className="h-5 w-5" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Response'}
              </motion.button>
            </div>
          </div>

          {/* Middle Column - Results */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Results
              </h3>
              <OutputGrid
                results={results}
                onFeedback={handleFeedback}
                rewardWeights={rewardWeights}
                isLoading={isGenerating}
              />
            </div>
          </div>

          {/* Right Column - Reward Builder & Logs */}
          <div className="lg:col-span-1 space-y-6">
            <RewardBuilder
              weights={rewardWeights}
              onWeightsChange={setRewardWeights}
              onSave={handleSaveRewards}
              isSaving={isSavingRewards}
            />

            <LogsConsole
              logs={logs}
              isTraining={isTraining}
              onStartTraining={handleStartTraining}
              onStopTraining={() => setIsTraining(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
