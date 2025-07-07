'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ChevronDownIcon,
  ChevronRightIcon,
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import Navigation from '../../components/layout/navigation';

interface AccordionItemProps {
  title: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ title, icon: Icon, children, isOpen, onToggle }: AccordionItemProps) => (
  <div className="border border-slate-200 dark:border-slate-700 rounded-lg mb-4 overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 text-left bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-between"
    >
      <div className="flex items-center">
        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {isOpen ? (
        <ChevronDownIcon className="w-5 h-5 text-slate-500" />
      ) : (
        <ChevronRightIcon className="w-5 h-5 text-slate-500" />
      )}
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-white dark:bg-slate-900">
        {children}
      </div>
    )}
  </div>
);

export default function RLPipelineDocs() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Constitutional AI Training Pipeline
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Learn how DreamForge implements Moondream's reinforcement learning pipeline 
              to create safer, more capable vision-language models.
            </p>
          </motion.div>

          {/* Mermaid Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              Pipeline Architecture
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre">
{`
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │  Human Feedback │    │ Reward Modeling │    │ Policy Training │
    │   Collection    │───▶│   (Bradley-     │───▶│      (PPO)      │
    │                 │    │    Terry)       │    │                 │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
              │                        │                        │
              ▼                        ▼                        ▼
    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │ Preference Data │    │  Reward Model   │    │   Fine-tuned    │
    │   & Rankings    │    │   Artifacts     │    │   Moondream     │
    └─────────────────┘    └─────────────────┘    └─────────────────┘
                                                            │
                                                            ▼
                                                  ┌─────────────────┐
                                                  │ Safety & Eval   │
                                                  │   Testing       │
                                                  └─────────────────┘
`}
              </pre>
            </div>
          </motion.div>

          {/* Detailed Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Step-by-Step Implementation
            </h2>

            <AccordionItem
              title="1. Data Collection & Feedback"
              icon={BeakerIcon}
              isOpen={openSections.has('collection')}
              onToggle={() => toggleSection('collection')}
            >
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Collect human preferences through pairwise comparisons of model outputs. 
                  This forms the foundation for reward model training.
                </p>
                
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">API Endpoint</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
{`POST /api/rl/collect-feedback

{
  "feedbackData": "image_a.jpg,image_b.jpg,preference:a\\n...",
  "preferences": [
    {
      "imageA": "url_or_id",
      "imageB": "url_or_id", 
      "outputA": "Description A",
      "outputB": "Description B",
      "preference": "a",
      "strength": 0.8
    }
  ]
}`}
                  </code>
                </div>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Expected Output</h4>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <code className="text-slate-700 dark:text-slate-300 text-sm">
{`{
  "success": true,
  "message": "Feedback data collected successfully",
  "data": {
    "id": "feedback-1234567890",
    "samples": 150,
    "preferences": [...],
    "status": "processed"
  }
}`}
                  </code>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              title="2. Reward Model Training"
              icon={ChartBarIcon}
              isOpen={openSections.has('reward')}
              onToggle={() => toggleSection('reward')}
            >
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Train a Bradley-Terry pairwise comparison model to predict human preferences. 
                  This reward model will guide policy optimization.
                </p>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">API Endpoint</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
{`POST /api/rl/train-reward

{
  "learningRate": 1e-5,
  "batchSize": 32,
  "epochs": 10,
  "feedbackId": "feedback-1234567890",
  "architecture": "bradley-terry",
  "constitutionalConstraints": true
}`}
                  </code>
                </div>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Training Process</h4>
                <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2">
                  <li>Initialize Bradley-Terry comparison model</li>
                  <li>Load processed feedback data</li>
                  <li>Train with constitutional safety constraints</li>
                  <li>Validate against held-out preference data</li>
                  <li>Save model artifacts to cloud storage</li>
                </ul>
              </div>
            </AccordionItem>

            <AccordionItem
              title="3. Policy Fine-tuning (PPO)"
              icon={CogIcon}
              isOpen={openSections.has('policy')}
              onToggle={() => toggleSection('policy')}
            >
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Use Proximal Policy Optimization (PPO) to fine-tune Moondream's policy 
                  using the trained reward model, with KL divergence constraints.
                </p>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">API Endpoint</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
{`POST /api/rl/fine-tune-policy

{
  "rewardModelPath": "s3://models/reward-model-xyz.pt",
  "klPenalty": 0.1,
  "learningRate": 1e-6,
  "ppoEpochs": 4,
  "clipRange": 0.2,
  "maxKL": 0.01
}`}
                  </code>
                </div>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Key Parameters</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <h5 className="font-semibold text-slate-900 dark:text-white">KL Penalty</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Constrains policy to stay close to original model
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <h5 className="font-semibold text-slate-900 dark:text-white">Clip Range</h5>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Limits policy update magnitude for stability
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              title="4. Safety Evaluation"
              icon={ShieldCheckIcon}
              isOpen={openSections.has('safety')}
              onToggle={() => toggleSection('safety')}
            >
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Comprehensive safety testing including constitutional constraints, 
                  bias evaluation, and adversarial testing.
                </p>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Safety Metrics</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center">
                    <h5 className="font-semibold text-slate-900 dark:text-white">Bias Score</h5>
                    <p className="text-2xl font-bold text-green-600">92%</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center">
                    <h5 className="font-semibold text-slate-900 dark:text-white">Safety Rate</h5>
                    <p className="text-2xl font-bold text-green-600">95%</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 text-center">
                    <h5 className="font-semibold text-slate-900 dark:text-white">Consistency</h5>
                    <p className="text-2xl font-bold text-green-600">89%</p>
                  </div>
                </div>
              </div>
            </AccordionItem>

            <AccordionItem
              title="5. Deployment & Monitoring"
              icon={RocketLaunchIcon}
              isOpen={openSections.has('deployment')}
              onToggle={() => toggleSection('deployment')}
            >
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">
                  Deploy the fine-tuned model with continuous monitoring and 
                  feedback collection for ongoing improvement.
                </p>

                <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Deployment Checklist</h4>
                <div className="space-y-2">
                  {[
                    'Safety metrics above threshold',
                    'KL divergence within bounds',
                    'A/B testing framework ready',
                    'Monitoring dashboards configured',
                    'Rollback plan prepared'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionItem>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Ready to Train Your Model?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Try the interactive RL pipeline dashboard to see constitutional AI training in action.
              </p>
              <a
                href="/rl-dashboard"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Open RL Dashboard
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
