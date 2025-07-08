'use client'

import React, { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon, CheckCircleIcon, ArrowRightIcon, ArrowUpTrayIcon, CpuChipIcon, BoltIcon, BeakerIcon } from '@heroicons/react/24/outline';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
  duration: number;
}

const SimpleRLPipeline: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps: Step[] = [
    {
      id: 1,
      title: 'Upload Your Images',
      description: 'Simply drag and drop your images or connect your data source',
      icon: <ArrowUpTrayIcon className="w-6 h-6" />,
      status: 'pending',
      duration: 2000
    },
    {
      id: 2,
      title: 'AI Analysis',
      description: 'Our vision AI analyzes your images and identifies patterns',
      icon: <CpuChipIcon className="w-6 h-6" />,
      status: 'pending',
      duration: 3000
    },
    {
      id: 3,
      title: 'Smart Learning',
      description: 'The system learns from your feedback to improve results',
      icon: <BoltIcon className="w-6 h-6" />,
      status: 'pending',
      duration: 2500
    },
    {
      id: 4,
      title: 'Optimized Results',
      description: 'Get accurate, fast results tailored to your specific needs',
      icon: <BeakerIcon className="w-6 h-6" />,
      status: 'pending',
      duration: 1500
    }
  ];

  const [pipelineSteps, setPipelineSteps] = useState(steps);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && currentStep < pipelineSteps.length) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (pipelineSteps[currentStep].duration / 100));
          
          if (newProgress >= 100) {
            setPipelineSteps(prev => 
              prev.map((step, index) => {
                if (index === currentStep) {
                  return { ...step, status: 'completed' };
                } else if (index === currentStep + 1) {
                  return { ...step, status: 'active' };
                }
                return step;
              })
            );
            
            if (currentStep < pipelineSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setProgress(0);
            } else {
              setIsRunning(false);
            }
            
            return 0;
          }
          
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isRunning, currentStep, pipelineSteps]);

  const handleStart = () => {
    if (currentStep === 0) {
      setPipelineSteps(prev => 
        prev.map((step, index) => ({
          ...step,
          status: index === 0 ? 'active' : 'pending'
        }))
      );
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setProgress(0);
    setPipelineSteps(steps);
  };

  const getStepStatus = (step: Step, index: number) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep && isRunning) return 'active';
    return 'pending';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
            <BoltIcon className="w-4 h-4 mr-2" />
            Simple Setup
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No complex setup or AI expertise required. Our intelligent system learns and improves automatically.
          </p>
        </div>

        {/* Interactive Pipeline Demo */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Interactive Demo
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                {currentStep === 0 ? 'Start Demo' : 'Resume'}
              </button>
              <button
                onClick={handlePause}
                disabled={!isRunning}
                className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PauseIcon className="w-5 h-5 mr-2" />
                Pause
              </button>
              <button
                onClick={handleReset}
                className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Pipeline Steps */}
          <div className="grid md:grid-cols-4 gap-6">
            {pipelineSteps.map((step, index) => {
              const status = getStepStatus(step, index);
              
              return (
                <div key={step.id} className="relative">
                  <div className={`
                    bg-white rounded-lg p-6 shadow-sm border-2 transition-all duration-300
                    ${status === 'active' ? 'border-blue-500 shadow-lg' : ''}
                    ${status === 'completed' ? 'border-green-500' : ''}
                    ${status === 'pending' ? 'border-gray-200' : ''}
                  `}>
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto
                      ${status === 'active' ? 'bg-blue-100 text-blue-600' : ''}
                      ${status === 'completed' ? 'bg-green-100 text-green-600' : ''}
                      ${status === 'pending' ? 'bg-gray-100 text-gray-400' : ''}
                    `}                    >
                      {status === 'completed' ? (
                        <CheckCircleIcon className="w-6 h-6" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 text-center">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 text-center">
                      {step.description}
                    </p>
                    
                    {status === 'active' && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {index < pipelineSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRightIcon className={`
                        w-6 h-6 
                        ${status === 'completed' ? 'text-green-500' : 'text-gray-300'}
                      `} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUpTrayIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Integration
            </h3>
            <p className="text-gray-600">
              Connect your existing tools and data sources with just a few clicks. No coding required.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CpuChipIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Smart Learning
            </h3>
            <p className="text-gray-600">
              Our AI continuously learns from your feedback to provide better, more accurate results over time.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BoltIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instant Results
            </h3>
            <p className="text-gray-600">
              Get accurate image analysis in under a second. Perfect for real-time applications and high-volume processing.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of developers who've already made the switch to faster, cheaper, and more accurate vision AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleRLPipeline;
