'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  EyeIcon, 
  PaintBrushIcon, 
  ClockIcon,
  BeakerIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

export interface RewardWeights {
  accuracy: number;
  creativity: number;
  detail: number;
  speed: number;
  visual_quality: number;
  helpfulness: number;
}

interface RewardSliderProps {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  onChange: (value: number) => void;
  color: string;
}

function RewardSlider({ label, description, icon: Icon, value, onChange, color }: RewardSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="font-medium text-gray-900 dark:text-white">{label}</span>
        <span className="ml-auto text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {value.toFixed(2)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${color.replace('text-', 'bg-')} 0%, ${color.replace('text-', 'bg-')} ${(value / 2) * 100}%, #e5e7eb ${(value / 2) * 100}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}

interface RewardBuilderProps {
  weights: RewardWeights;
  onWeightsChange: (weights: RewardWeights) => void;
  onSave: () => void;
  onRetrain?: () => void;
  isSaving?: boolean;
  isTraining?: boolean;
}

export default function RewardBuilder({ weights, onWeightsChange, onSave, onRetrain, isSaving, isTraining }: RewardBuilderProps) {
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    setTotalScore(total);
  }, [weights]);

  const updateWeight = (key: keyof RewardWeights, value: number) => {
    onWeightsChange({
      ...weights,
      [key]: value
    });
  };

  const resetToDefaults = () => {
    onWeightsChange({
      accuracy: 1.0,
      creativity: 0.8,
      detail: 1.2,
      speed: 0.5,
      visual_quality: 1.0,
      helpfulness: 1.1
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Reward Function Builder
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Adjust weights to customize model behavior
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalScore.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500">Total Weight</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RewardSlider
          label="Accuracy"
          description="Factual correctness and object detection precision"
          icon={EyeIcon}
          value={weights.accuracy}
          onChange={(value) => updateWeight('accuracy', value)}
          color="text-green-600"
        />
        
        <RewardSlider
          label="Creativity"
          description="Novel and interesting response generation"
          icon={SparklesIcon}
          value={weights.creativity}
          onChange={(value) => updateWeight('creativity', value)}
          color="text-purple-600"
        />
        
        <RewardSlider
          label="Detail Level"
          description="Richness and depth of descriptions"
          icon={BeakerIcon}
          value={weights.detail}
          onChange={(value) => updateWeight('detail', value)}
          color="text-blue-600"
        />
        
        <RewardSlider
          label="Speed Priority"
          description="Response latency optimization"
          icon={ClockIcon}
          value={weights.speed}
          onChange={(value) => updateWeight('speed', value)}
          color="text-orange-600"
        />
        
        <RewardSlider
          label="Visual Quality"
          description="Image composition and aesthetic assessment"
          icon={PaintBrushIcon}
          value={weights.visual_quality}
          onChange={(value) => updateWeight('visual_quality', value)}
          color="text-pink-600"
        />
        
        <RewardSlider
          label="Helpfulness"
          description="Usefulness and relevance to user intent"
          icon={BookmarkIcon}
          value={weights.helpfulness}
          onChange={(value) => updateWeight('helpfulness', value)}
          color="text-indigo-600"
        />
      </div>

      <div className="flex gap-3 mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <BookmarkIcon className="h-5 w-5" />
          {isSaving ? 'Saving...' : 'Save Reward Function'}
        </motion.button>
        
        {onRetrain && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetrain}
            disabled={isTraining}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <BeakerIcon className="h-5 w-5" />
            {isTraining ? 'Retraining...' : 'Retrain Model'}
          </motion.button>
        )}
        
        <button
          onClick={resetToDefaults}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          Current Configuration:
        </div>
        <code className="text-xs font-mono text-gray-800 dark:text-gray-200">
          {JSON.stringify(weights, null, 2)}
        </code>
      </div>
    </div>
  );
}
