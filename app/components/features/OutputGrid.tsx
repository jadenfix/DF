'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  ClockIcon,
  CpuChipIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpSolid, HandThumbDownIcon as HandThumbDownSolid } from '@heroicons/react/24/solid';

export interface GenerationResult {
  id: string;
  modelId: string;
  prompt: string;
  response: string;
  timestamp: number;
  latency: number;
  rewardScore?: number;
  feedback?: 'positive' | 'negative' | null;
}

interface OutputCardProps {
  result: GenerationResult;
  onFeedback: (id: string, feedback: 'positive' | 'negative') => void;
  rewardWeights?: any;
}

function OutputCard({ result, onFeedback, rewardWeights }: OutputCardProps) {
  const [localFeedback, setLocalFeedback] = useState<'positive' | 'negative' | null>(result.feedback || null);

  const handleFeedback = (feedback: 'positive' | 'negative') => {
    const newFeedback = localFeedback === feedback ? null : feedback;
    setLocalFeedback(newFeedback);
    if (newFeedback) {
      onFeedback(result.id, newFeedback);
    }
  };

  const calculateRewardScore = () => {
    if (!rewardWeights) return 0.75; // Default score
    
    // Simulate reward calculation based on response characteristics
    const responseLength = result.response.length;
    const hasDetails = result.response.split(' ').length > 20;
    const isCreative = result.response.includes('unique') || result.response.includes('interesting');
    
    let score = 0;
    score += rewardWeights.accuracy * 0.8; // Base accuracy
    score += rewardWeights.detail * (hasDetails ? 1 : 0.5);
    score += rewardWeights.creativity * (isCreative ? 1 : 0.6);
    score += rewardWeights.helpfulness * 0.9;
    score += rewardWeights.visual_quality * 0.85;
    score -= rewardWeights.speed * (result.latency / 1000); // Penalize latency
    
    return Math.max(0, Math.min(1, score / 6)); // Normalize to 0-1
  };

  const rewardScore = result.rewardScore || calculateRewardScore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CpuChipIcon className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-gray-900 dark:text-white">
            {result.modelId}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Latency */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ClockIcon className="h-4 w-4" />
            {result.latency}ms
          </div>
          
          {/* Reward Score */}
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {(rewardScore * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Prompt */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">Prompt:</span> {result.prompt}
      </div>

      {/* Response */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
        <p className="text-gray-900 dark:text-white leading-relaxed">
          {result.response}
        </p>
      </div>

      {/* Feedback & Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFeedback('positive')}
            className={`p-2 rounded-lg transition-colors ${
              localFeedback === 'positive'
                ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
            }`}
          >
            {localFeedback === 'positive' ? (
              <HandThumbUpSolid className="h-5 w-5" />
            ) : (
              <HandThumbUpIcon className="h-5 w-5" />
            )}
          </button>
          
          <button
            onClick={() => handleFeedback('negative')}
            className={`p-2 rounded-lg transition-colors ${
              localFeedback === 'negative'
                ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500'
            }`}
          >
            {localFeedback === 'negative' ? (
              <HandThumbDownSolid className="h-5 w-5" />
            ) : (
              <HandThumbDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="text-xs text-gray-500">
          {new Date(result.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
}

interface OutputGridProps {
  results: GenerationResult[];
  onFeedback: (id: string, feedback: 'positive' | 'negative') => void;
  rewardWeights?: any;
  isLoading?: boolean;
}

export default function OutputGrid({ results, onFeedback, rewardWeights, isLoading }: OutputGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="space-y-6">
        {/* Research Context Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700 p-4">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 dark:text-blue-400 text-lg">🔬</div>
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Research-Grade Analysis</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Generate responses using Moondream's 1.6B parameter VLM. Compare baseline vs RLHF-optimized outputs, 
                analyze reward scores, and contribute to our community benchmarks.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  📊 Benchmark Ready
                </span>
                <span className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                  ⚡ Sub-400ms Latency
                </span>
                <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  🎯 RLHF Optimized
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* No Results State */}
        <div className="text-center py-12">
          <CpuChipIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No results yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generate some responses to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {results.map((result) => (
        <OutputCard
          key={result.id}
          result={result}
          onFeedback={onFeedback}
          rewardWeights={rewardWeights}
        />
      ))}
    </div>
  );
}
