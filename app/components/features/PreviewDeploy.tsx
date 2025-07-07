'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface Branch {
  name: string;
  status: 'building' | 'ready' | 'error' | 'deploying';
  url?: string;
  commit: string;
  deployedAt?: number;
  buildTime?: number;
}

interface PreviewDeployProps {
  currentBranch?: string;
  onBranchSwitch?: (branch: string) => void;
}

export default function PreviewDeploy({ currentBranch = 'main', onBranchSwitch }: PreviewDeployProps) {
  const [branches, setBranches] = useState<Branch[]>([
    {
      name: 'main',
      status: 'ready',
      url: 'https://dreamforge-main.production.app',
      commit: 'abc123f',
      deployedAt: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      buildTime: 45
    },
    {
      name: 'feature/reward-tuning',
      status: 'ready',
      url: 'https://dreamforge-feature-reward-tuning.staging.app',
      commit: 'def456a',
      deployedAt: Date.now() - 1000 * 60 * 10, // 10 minutes ago
      buildTime: 38
    },
    {
      name: 'feature/ui-improvements',
      status: 'building',
      commit: 'ghi789b',
      buildTime: 22
    },
    {
      name: 'staging',
      status: 'ready',
      url: 'https://dreamforge-staging.preview.app',
      commit: 'jkl012c',
      deployedAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      buildTime: 41
    }
  ]);

  const [isSimulatingDeploy, setIsSimulatingDeploy] = useState(false);

  // Simulate a new deployment
  const simulateNewDeploy = async () => {
    setIsSimulatingDeploy(true);
    
    // Add a new branch with building status
    const newBranch: Branch = {
      name: 'feature/ceo-demo',
      status: 'building',
      commit: `${Math.random().toString(36).substring(7)}`,
      buildTime: 0
    };
    
    setBranches(prev => [newBranch, ...prev]);
    
    // Simulate build progress
    let buildTime = 0;
    const buildInterval = setInterval(() => {
      buildTime += 1;
      setBranches(prev => 
        prev.map(branch => 
          branch.name === newBranch.name 
            ? { ...branch, buildTime }
            : branch
        )
      );
      
      if (buildTime >= 30) {
        clearInterval(buildInterval);
        // Mark as ready
        setBranches(prev => 
          prev.map(branch => 
            branch.name === newBranch.name 
              ? { 
                  ...branch, 
                  status: 'ready', 
                  url: `https://dreamforge-feature-ceo-demo.preview.app`,
                  deployedAt: Date.now(),
                  buildTime: 30
                }
              : branch
          )
        );
        setIsSimulatingDeploy(false);
      }
    }, 1000);
  };

  const getStatusIcon = (status: Branch['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'building':
      case 'deploying':
        return <ArrowPathIcon className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error':
        return <ExclamationCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 rounded-full bg-gray-300" />;
    }
  };

  const getStatusText = (status: Branch['status']) => {
    switch (status) {
      case 'ready':
        return 'Ready';
      case 'building':
        return 'Building...';
      case 'deploying':
        return 'Deploying...';
      case 'error':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Preview Deployments
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Every branch gets its own preview URL - enterprise deployment made simple
          </p>
        </div>
        
        <button
          onClick={simulateNewDeploy}
          disabled={isSimulatingDeploy}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSimulatingDeploy ? (
            <ArrowPathIcon className="w-4 h-4 animate-spin" />
          ) : (
            <PlayIcon className="w-4 h-4" />
          )}
          <span>{isSimulatingDeploy ? 'Deploying...' : 'Simulate Deploy'}</span>
        </button>
      </div>

      {/* Current Active Branch */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Currently Viewing: {currentBranch}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This is the active branch for the playground and analytics
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Live</span>
          </div>
        </div>
      </div>

      {/* Branches List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Deployments
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                branch.name === currentBranch ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(branch.status)}
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {branch.name}
                      </h4>
                      {branch.name === currentBranch && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                          Active
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span>Commit: {branch.commit}</span>
                      <span>•</span>
                      <span>{getStatusText(branch.status)}</span>
                      {branch.buildTime && (
                        <>
                          <span>•</span>
                          <span>Build: {branch.buildTime}s</span>
                        </>
                      )}
                      {branch.deployedAt && (
                        <>
                          <span>•</span>
                          <span>{formatTime(branch.deployedAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {branch.status === 'ready' && branch.url && (
                    <a
                      href={branch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>Preview</span>
                    </a>
                  )}
                  
                  {branch.name !== currentBranch && (
                    <button
                      onClick={() => onBranchSwitch?.(branch.name)}
                      className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Switch to
                    </button>
                  )}
                </div>
              </div>
              
              {branch.status === 'building' && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Building...</span>
                    <span>{branch.buildTime}s</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((branch.buildTime || 0) / 30 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Info Box */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ExclamationCircleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">
              Enterprise Preview Deployments
            </p>
            <p className="text-amber-700 dark:text-amber-300">
              Each branch automatically gets its own preview URL when you push commits. 
              Switch between branches to see how analytics and features differ across deployments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
