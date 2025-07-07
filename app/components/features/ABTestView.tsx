'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowsPointingOutIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  BeakerIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface ModelOutput {
  model: string;
  response: string;
  confidence: number;
  latency: number;
  cost: number;
  rewardScore?: number;
  timestamp: number;
}

interface ABTestViewProps {
  prompt: string;
  imageUrl?: string;
  onOutputSelect?: (output: ModelOutput) => void;
}

export default function ABTestView({ prompt, imageUrl, onOutputSelect }: ABTestViewProps) {
  const [outputs, setOutputs] = useState<ModelOutput[]>([]);
  const [selectedOutput, setSelectedOutput] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'slider'>('grid');

  const models = [
    'moondream2',
    'moondream2-text', 
    'moondream2-detailed',
    'moondream2-fast'
  ];

  const generateOutputs = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setOutputs([]);
    setSelectedOutput(null);
    
    // Simulate API calls to different models
    const newOutputs: ModelOutput[] = [];
    
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      
      // Simulate different response styles based on model
      let response = '';
      let confidence = 0.8 + Math.random() * 0.2;
      let latency = 200 + Math.random() * 300;
      let cost = 0.001 + Math.random() * 0.005;
      
      switch (model) {
        case 'moondream2':
          response = `This image shows ${prompt.toLowerCase().includes('describe') ? 'a detailed scene with various elements including lighting, composition, and subject matter' : 'relevant visual content that matches the query'}. The main focus appears to be well-defined with good clarity and color balance.`;
          break;
        case 'moondream2-text':
          response = `Text-focused analysis: ${prompt.toLowerCase().includes('text') || prompt.toLowerCase().includes('read') ? 'Multiple text elements are visible with varying fonts and sizes. The text appears to be clearly legible with good contrast.' : 'Limited text content detected in this image, primarily focusing on visual elements instead.'}`;
          confidence *= 0.9;
          latency *= 0.8;
          break;
        case 'moondream2-detailed':
          response = `Comprehensive analysis: This image contains multiple layers of visual information. The composition demonstrates ${Math.random() > 0.5 ? 'strong symmetrical balance' : 'dynamic asymmetrical arrangement'} with ${Math.random() > 0.5 ? 'warm' : 'cool'} color temperature. Lighting conditions suggest ${Math.random() > 0.5 ? 'natural daylight' : 'artificial illumination'} with moderate contrast ratios.`;
          latency *= 1.5;
          cost *= 1.3;
          break;
        case 'moondream2-fast':
          response = `Quick scan: ${prompt.toLowerCase().includes('what') ? 'Object detected' : 'Scene analyzed'}. ${Math.random() > 0.5 ? 'Clear visibility' : 'Good quality'}. ${Math.random() > 0.5 ? 'Standard framing' : 'Close-up view'}.`;
          confidence *= 0.85;
          latency *= 0.6;
          cost *= 0.7;
          break;
      }
      
      const output: ModelOutput = {
        model,
        response,
        confidence,
        latency,
        cost,
        rewardScore: 0.7 + Math.random() * 0.3,
        timestamp: Date.now() + i * 100
      };
      
      newOutputs.push(output);
      setOutputs([...newOutputs]);
      
      // Simulate staggered responses
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    }
    
    setIsGenerating(false);
  };

  const handleOutputSelect = (index: number) => {
    setSelectedOutput(index);
    onOutputSelect?.(outputs[index]);
  };

  const nextOutput = () => {
    setCurrentIndex((prev) => (prev + 1) % outputs.length);
  };

  const prevOutput = () => {
    setCurrentIndex((prev) => (prev - 1 + outputs.length) % outputs.length);
  };

  const copyResponse = (response: string) => {
    navigator.clipboard.writeText(response);
  };

  const formatMetric = (value: number, type: 'confidence' | 'latency' | 'cost' | 'reward') => {
    switch (type) {
      case 'confidence':
        return `${(value * 100).toFixed(1)}%`;
      case 'latency':
        return `${value.toFixed(0)}ms`;
      case 'cost':
        return `$${value.toFixed(4)}`;
      case 'reward':
        return `${(value * 100).toFixed(0)}/100`;
      default:
        return value.toString();
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            A/B Model Comparison
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Compare outputs from different Moondream models side-by-side
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'slider' : 'grid')}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {viewMode === 'grid' ? <ArrowsPointingOutIcon className="w-4 h-4" /> : <DocumentDuplicateIcon className="w-4 h-4" />}
            <span>{viewMode === 'grid' ? 'Slider View' : 'Grid View'}</span>
          </button>
          
          <button
            onClick={generateOutputs}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <BeakerIcon className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Run A/B Test'}</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {models.map((model, index) => {
            const output = outputs[index];
            const isSelected = selectedOutput === index;
            
            return (
              <motion.div
                key={model}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="p-6">
                  {/* Model Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {model}
                      </h4>
                      {output && (
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span className={getConfidenceColor(output.confidence)}>
                            {formatMetric(output.confidence, 'confidence')}
                          </span>
                          <span>{formatMetric(output.latency, 'latency')}</span>
                          <span>{formatMetric(output.cost, 'cost')}</span>
                        </div>
                      )}
                    </div>
                    
                    {output && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyResponse(output.response)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <DocumentDuplicateIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOutputSelect(index)}
                          className={`p-1 rounded ${
                            isSelected 
                              ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/50' 
                              : 'text-gray-400 hover:text-blue-600'
                          }`}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Response */}
                  <div className="min-h-[120px]">
                    {output ? (
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {output.response}
                      </p>
                    ) : isGenerating && index < outputs.length + 1 ? (
                      <div className="flex items-center space-x-2 text-gray-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                        <span className="text-sm">Generating...</span>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        Click "Run A/B Test" to generate responses
                      </div>
                    )}
                  </div>
                  
                  {/* Reward Score */}
                  {output && output.rewardScore && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Reward Score</span>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {formatMetric(output.rewardScore, 'reward')}
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${output.rewardScore * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Slider View */}
      {viewMode === 'slider' && outputs.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevOutput}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {outputs[currentIndex]?.model}
                </h4>
                <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span className={getConfidenceColor(outputs[currentIndex]?.confidence || 0)}>
                    {formatMetric(outputs[currentIndex]?.confidence || 0, 'confidence')}
                  </span>
                  <span>{formatMetric(outputs[currentIndex]?.latency || 0, 'latency')}</span>
                  <span>{formatMetric(outputs[currentIndex]?.cost || 0, 'cost')}</span>
                </div>
              </div>
              
              <button
                onClick={nextOutput}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1} of {outputs.length}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {outputs[currentIndex]?.response}
            </p>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex items-center justify-center space-x-2">
            {outputs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* No Results */}
      {!isGenerating && outputs.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <BeakerIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Run an A/B test to compare model outputs</p>
        </div>
      )}
    </div>
  );
}
