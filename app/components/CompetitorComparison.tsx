'use client'

import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, CalculatorIcon, ChartBarIcon, BoltIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface ComparisonData {
  feature: string;
  dreamforge: string | boolean;
  openai: string | boolean;
  gwen?: string | boolean;
  highlight?: boolean;
}

const CompetitorComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cost' | 'performance'>('overview');

  const overviewData: ComparisonData[] = [
    { feature: 'Cost per 1K images', dreamforge: '$0.005', openai: '$0.10', gwen: '$0.08', highlight: true },
    { feature: 'Response time', dreamforge: '0.8s', openai: '2.3s', gwen: '1.9s', highlight: true },
    { feature: 'Uptime SLA', dreamforge: '99.9%', openai: '99.5%', gwen: '99.0%' },
    { feature: 'Setup time', dreamforge: '5 minutes', openai: '30 minutes', gwen: '15 minutes' },
    { feature: 'Monthly cost (10K images)', dreamforge: '$50', openai: '$1,000', gwen: '$800', highlight: true },
    { feature: 'Enterprise support', dreamforge: true, openai: true, gwen: false },
    { feature: 'Custom training', dreamforge: true, openai: false, gwen: true },
  ];

  const costData: ComparisonData[] = [
    { feature: 'Per image analysis', dreamforge: '$0.005', openai: '$0.10', gwen: '$0.08', highlight: true },
    { feature: '1K images/month', dreamforge: '$5', openai: '$100', gwen: '$80', highlight: true },
    { feature: '10K images/month', dreamforge: '$50', openai: '$1,000', gwen: '$800', highlight: true },
    { feature: '100K images/month', dreamforge: '$500', openai: '$10,000', gwen: '$8,000', highlight: true },
    { feature: 'Annual savings vs OpenAI', dreamforge: '$114,000', openai: '$0', gwen: '$24,000', highlight: true },
  ];

  const performanceData: ComparisonData[] = [
    { feature: 'Average response time', dreamforge: '0.8s', openai: '2.3s', gwen: '1.9s', highlight: true },
    { feature: 'Accuracy rate', dreamforge: '94.2%', openai: '91.8%', gwen: '89.5%', highlight: true },
    { feature: 'Concurrent requests', dreamforge: '1000+', openai: '100', gwen: '500' },
    { feature: 'Rate limit', dreamforge: 'Unlimited', openai: '60/min', gwen: '100/min' },
    { feature: 'Global latency', dreamforge: '<100ms', openai: '<200ms', gwen: '<150ms' },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'cost': return costData;
      case 'performance': return performanceData;
      default: return overviewData;
    }
  };

  const renderCell = (value: string | boolean, isHighlight: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircleIcon className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <XCircleIcon className="w-5 h-5 text-red-500 mx-auto" />
      );
    }
    
    return (
      <span className={`font-medium ${isHighlight ? 'text-blue-600' : 'text-gray-900'}`}>
        {value}
      </span>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Save 95% vs OpenAI
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose DreamForge?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get better results at a fraction of the cost. Perfect for developers who want ChatGPT-level vision AI without the enterprise price tag.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >                <CalculatorIcon className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('cost')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'cost' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CurrencyDollarIcon className="w-4 h-4 inline mr-2" />
                Cost Savings
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'performance' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BoltIcon className="w-4 h-4 inline mr-2" />
                Performance
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                    DreamForge
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    OpenAI Vision
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Gwen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getCurrentData().map((row, index) => (
                  <tr key={index} className={`hover:bg-gray-50 ${row.highlight ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex justify-center">
                        {renderCell(row.dreamforge, row.highlight)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex justify-center">
                        {renderCell(row.openai)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex justify-center">
                        {row.gwen !== undefined ? renderCell(row.gwen) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Calculate Your Savings
              </h3>
              <p className="text-gray-600 mb-6">
                See how much you'll save by switching from OpenAI to DreamForge for your vision AI needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>95% cost reduction vs OpenAI</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>3x faster response times</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>Better accuracy and reliability</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
              <h4 className="text-xl font-semibold mb-4">Annual Savings Example</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>OpenAI (100K images/month)</span>
                  <span className="font-bold">$120,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>DreamForge (100K images/month)</span>
                  <span className="font-bold">$6,000</span>
                </div>
                <div className="border-t border-blue-400 pt-3">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Your Savings</span>
                    <span className="text-green-300">$114,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparison;
