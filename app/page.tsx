'use client';

import { motion } from 'framer-motion';
import Hero from './components/Hero';
// import CompetitorComparison from './components/CompetitorComparison';
// import SimpleRLPipeline from './components/SimpleRLPipeline';
import Navigation from '../components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      {/* Hero Section - Moondream-Focused */}
      <Hero />
      
      {/* Moondream Technology Showcase */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Powered by Moondream Vision Technology
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Revolutionary vision AI that delivers OpenAI-level accuracy with breakthrough efficiency and cost savings.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Moondream Changes Everything
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1 mr-4">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Ultra-Efficient Architecture</h4>
                    <p className="text-gray-600 dark:text-gray-300">1.6B parameters deliver the same results as 175B+ models</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1 mr-4">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Lightning Fast Inference</h4>
                    <p className="text-gray-600 dark:text-gray-300">Sub-second response times without compromising accuracy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1 mr-4">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Cost Revolutionary</h4>
                    <p className="text-gray-600 dark:text-gray-300">95% cost reduction compared to traditional vision APIs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Moondream Performance</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">VQA Accuracy</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">71.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Model Size</span>
                  <span className="font-bold text-green-600 dark:text-green-400">1.6B params</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Inference Time</span>
                  <span className="font-bold text-green-600 dark:text-green-400">0.8s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Cost per 1K images</span>
                  <span className="font-bold text-green-600 dark:text-green-400">$0.005</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Moondream vs Competitors Comparison */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 mb-6">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
              Moondream Technology Advantage
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Moondream vs OpenAI vs Gwen
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how Moondream's revolutionary architecture delivers superior ROI with unmatched efficiency.
            </p>
          </div>

          {/* Main Comparison Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* DreamForge - Highlighted */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border-2 border-blue-500 dark:border-blue-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Recommended
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">Moondream</h3>
                <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">via DreamForge API</div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">$0.005</div>
                <div className="text-gray-600 dark:text-gray-300">per 1K images</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">0.8s response time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">No rate limits</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">5-minute setup</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">99.9% uptime SLA</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Custom model training</span>
                </div>
              </div>
            </div>

            {/* OpenAI */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">OpenAI Vision</h3>
                <div className="text-4xl font-bold text-red-600 dark:text-red-400">$0.10</div>
                <div className="text-gray-600 dark:text-gray-300">per 1K images</div>
                <div className="text-sm text-red-600 dark:text-red-400 mt-1">20x more expensive</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">2.3s response time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">60 requests/minute limit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">30-minute setup</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">99.5% uptime</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">No custom training</span>
                </div>
              </div>
            </div>

            {/* Gwen */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gwen-VL</h3>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">$0.08</div>
                <div className="text-gray-600 dark:text-gray-300">per 1K images</div>
                <div className="text-sm text-purple-600 dark:text-purple-400 mt-1">16x more expensive</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">1.5s response time</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">80 requests/minute limit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">20-minute setup</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">98.8% uptime</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Limited custom training</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Calculate Your Savings</h3>
              <p className="text-gray-600 dark:text-gray-300">See how much you'll save by switching from OpenAI or Gwen to Moondream</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">10K images/month</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">OpenAI:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">$1,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Gwen:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">$800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Moondream:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">$50</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900 dark:text-white">You Save:</span>
                      <span className="text-blue-600 dark:text-blue-400">$950/mo</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">100K images/month</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">OpenAI:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">$10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Gwen:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">$8,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Moondream:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">$500</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900 dark:text-white">You Save:</span>
                      <span className="text-blue-600 dark:text-blue-400">$9,500/mo</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1M images/month</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">OpenAI:</span>
                    <span className="font-bold text-red-600 dark:text-red-400">$100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Gwen:</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">$80,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Moondream:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">$5,000</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between font-bold">
                      <span className="text-gray-900 dark:text-white">You Save:</span>
                      <span className="text-blue-600 dark:text-blue-400">$95,000/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </button>
                <button className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                  Get Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced RL Pipeline - Business Benefits */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Simple Setup, Enterprise Results
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              From Zero to Moondream in 5 Minutes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              While OpenAI and Gwen require complex enterprise setups, Moondream works instantly. No PhDs required.
            </p>
          </div>
          
          {/* Comparison Timeline */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* DreamForge Timeline */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">Moondream Setup</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Sign up & get API key</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">30 seconds</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Upload first image</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">1 minute</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Get results & start building</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">3 minutes</div>
                  </div>
                </div>
                <div className="border-t border-blue-200 dark:border-blue-800 pt-4">
                  <div className="font-bold text-blue-600 dark:text-blue-400">Total: 5 minutes</div>
                </div>
              </div>
            </div>
            
            {/* OpenAI Timeline */}
            <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-950 dark:to-orange-950 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 text-center">OpenAI Setup</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Enterprise application</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">1-2 weeks</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Rate limit negotiations</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">3-5 days</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Integration & testing</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">1-2 weeks</div>
                  </div>
                </div>
                <div className="border-t border-red-200 dark:border-red-800 pt-4">
                  <div className="font-bold text-red-600 dark:text-red-400">Total: 3-5 weeks</div>
                </div>
              </div>
            </div>

            {/* Gwen Timeline */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-950 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6 text-center">Gwen Setup</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Model deployment</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">2-3 days</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Infrastructure setup</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">1-2 days</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Fine-tuning & testing</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">3-5 days</div>
                  </div>
                </div>
                <div className="border-t border-purple-200 dark:border-purple-800 pt-4">
                  <div className="font-bold text-purple-600 dark:text-purple-400">Total: 1-2 weeks</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Advantages */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Instant Scale
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No rate limits or throttling. Handle millions of images without waiting for approval or paying enterprise fees.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Predictable Costs
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No surprise bills or usage caps. Simple per-image pricing that scales with your business, not against it.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-950 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Smart Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI learns your specific use case and improves over time. OpenAI gives you the same generic model forever.
              </p>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Experience Moondream?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join 5,000+ developers who've already saved millions by switching to Moondream. No contracts, no enterprise sales calls.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  View Live Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - Simple */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DreamForge</h3>
              <p className="text-slate-300 dark:text-slate-400 mb-4">
                High-performance vision AI that&apos;s faster and cheaper than OpenAI. 
                Built for developers who want results without the complexity.
              </p>
              <div className="text-sm text-slate-400 dark:text-slate-500">
                Enterprise-ready vision AI
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300 dark:text-slate-400">
                <li><a href="/playground" className="hover:text-white transition-colors">AI Playground</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-300 dark:text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customers</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300 dark:text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Slack Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 dark:text-slate-500 text-sm">© 2025 DreamForge. Better vision AI for everyone.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-white transition-colors text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
