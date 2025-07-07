'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ServerIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface UsageMetric {
  label: string;
  value: string;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface ApiCall {
  timestamp: number;
  endpoint: string;
  latency: number;
  cost: number;
  status: 'success' | 'error';
  model: string;
  branch?: string;
}

interface UsageDashboardProps {
  selectedBranch?: string;
  onBranchChange?: (branch: string) => void;
}

export default function UsageDashboard({ selectedBranch = 'main', onBranchChange }: UsageDashboardProps) {
  const [metrics, setMetrics] = useState<UsageMetric[]>([]);
  const [apiCalls, setApiCalls] = useState<ApiCall[]>([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const branches = ['main', 'feature/reward-tuning', 'feature/ui-improvements', 'staging'];

  // Simulate real-time metrics updates
  useEffect(() => {
    const generateMetrics = () => {
      const baseCallCount = 150;
      const baseLatency = 280;
      const baseCost = 0.045;
      
      // Simulate branch-specific variations
      const branchMultiplier = selectedBranch === 'main' ? 1.0 : 
                              selectedBranch.includes('staging') ? 0.3 : 0.1;
      
      const callCount = Math.floor(baseCallCount * branchMultiplier + Math.random() * 20);
      const avgLatency = baseLatency + (Math.random() - 0.5) * 50;
      const totalCost = baseCost * branchMultiplier + Math.random() * 0.01;
      const successRate = 98.5 + Math.random() * 1.5;

      return [
        {
          label: 'API Calls',
          value: callCount.toLocaleString(),
          change: Math.random() > 0.5 ? Math.random() * 15 : -Math.random() * 8,
          icon: ServerIcon,
          color: 'blue'
        },
        {
          label: 'Avg Latency',
          value: `${avgLatency.toFixed(0)}ms`,
          change: Math.random() > 0.5 ? -Math.random() * 10 : Math.random() * 5,
          icon: ClockIcon,
          color: 'green'
        },
        {
          label: 'Total Cost',
          value: `$${totalCost.toFixed(3)}`,
          change: Math.random() > 0.5 ? Math.random() * 20 : -Math.random() * 12,
          icon: CurrencyDollarIcon,
          color: 'purple'
        },
        {
          label: 'Success Rate',
          value: `${successRate.toFixed(1)}%`,
          change: Math.random() > 0.5 ? Math.random() * 2 : -Math.random() * 1,
          icon: ChartBarIcon,
          color: 'emerald'
        }
      ];
    };

    setMetrics(generateMetrics());
    
    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedBranch, timeRange]);

  // Generate sample API call data
  useEffect(() => {
    const generateApiCalls = () => {
      const calls: ApiCall[] = [];
      const now = Date.now();
      const endpoints = ['/api/generate', '/api/retrain', '/api/analyze'];
      const models = ['moondream2', 'moondream2-text', 'moondream2-detailed'];
      
      for (let i = 0; i < 50; i++) {
        calls.push({
          timestamp: now - Math.random() * 24 * 60 * 60 * 1000, // Last 24h
          endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
          latency: 200 + Math.random() * 300,
          cost: 0.001 + Math.random() * 0.01,
          status: Math.random() > 0.02 ? 'success' : 'error',
          model: models[Math.floor(Math.random() * models.length)],
          branch: Math.random() > 0.7 ? selectedBranch : 'main'
        });
      }
      
      return calls.sort((a, b) => b.timestamp - a.timestamp);
    };

    setApiCalls(generateApiCalls());
  }, [selectedBranch]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Usage Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Monitor API usage and performance across branches
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Branch Selector */}
          <select
            value={selectedBranch}
            onChange={(e) => onBranchChange?.(e.target.value)}
            className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg bg-${metric.color}-100 dark:bg-${metric.color}-900/20`}>
                <metric.icon className={`w-4 h-4 md:w-6 md:h-6 text-${metric.color}-600`} />
              </div>
              <div className="flex items-center space-x-1">
                {metric.change >= 0 ? (
                  <ArrowTrendingUpIcon className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                ) : (
                  <ArrowTrendingDownIcon className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                )}
                <span className={`text-xs md:text-sm font-medium ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {metric.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* API Calls Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent API Calls
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Live feed of API requests for {selectedBranch} branch
          </p>
        </div>
        
        {/* Mobile-friendly table */}
        <div className="block md:hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {apiCalls.slice(0, 10).map((call, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                    {call.endpoint}
                  </span>
                  <span className={getStatusColor(call.status)}>
                    {call.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{call.model}</span>
                  <span>{formatTime(call.timestamp)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                  <span>{call.latency.toFixed(0)}ms</span>
                  <span>${call.cost.toFixed(4)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Latency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {apiCalls.slice(0, 10).map((call, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatTime(call.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600 dark:text-gray-400">
                    {call.endpoint}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {call.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {call.latency.toFixed(0)}ms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    ${call.cost.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={getStatusColor(call.status)}>
                      {call.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
