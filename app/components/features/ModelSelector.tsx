'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const MOONDREAM_MODELS = [
  {
    id: 'moondream2',
    name: 'Moondream 2',
    description: '1.86B parameters - Fast and accurate',
    params: '1.86B',
    latency: '~200ms',
    cost: '$0.001/request'
  },
  {
    id: 'moondream2-text',
    name: 'Moondream 2 Text',
    description: '1.86B parameters - Optimized for text recognition',
    params: '1.86B',
    latency: '~180ms',
    cost: '$0.0009/request'
  },
  {
    id: 'moondream2-detailed',
    name: 'Moondream 2 Detailed',
    description: '1.86B parameters - Enhanced detail recognition',
    params: '1.86B',
    latency: '~300ms',
    cost: '$0.0015/request'
  },
  {
    id: 'moondream2-fast',
    name: 'Moondream 2 Fast',
    description: '1.6B parameters - Optimized for speed',
    params: '1.6B',
    latency: '~120ms',
    cost: '$0.0007/request'
  }
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selected = MOONDREAM_MODELS.find(m => m.id === selectedModel) || MOONDREAM_MODELS[0];

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Select Model
      </label>
      
      <button
        type="button"
        className="relative w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-left shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {selected.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selected.params} • {selected.latency} • {selected.cost}
            </div>
          </div>
          <ChevronDownIcon 
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {MOONDREAM_MODELS.map((model) => (
            <button
              key={model.id}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onModelChange(model.id);
                setIsOpen(false);
              }}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {model.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {model.description}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {model.params} • {model.latency} • {model.cost}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
