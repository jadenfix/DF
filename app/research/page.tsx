'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/layout/navigation';
import { DocumentTextIcon, ChartBarIcon, BeakerIcon, TrophyIcon, ArrowDownTrayIcon, PlayIcon } from '@heroicons/react/24/outline';

export default function ResearchPage() {
  const papers = [
    {
      title: 'VL-RLHF for Tiny Models: Constitutional AI Training',
      authors: 'Vikhyat Korrapati, Research Team',
      venue: 'ICLR 2024',
      abstract: 'We present a constitutional AI training pipeline specifically designed for tiny vision-language models. Our approach boosts domain-specific accuracy by 20-30% through human preference optimization while maintaining the compact model size.',
      pdf: '#',
      colab: '#',
      arxiv: 'https://arxiv.org/abs/2024.xxxxx',
      citations: 127,
      featured: true
    },
    {
      title: 'Moondream 2: 1.6B Parameter Efficiency at Scale',
      authors: 'DreamForge Research Team',
      venue: 'arXiv 2024',
      abstract: 'We demonstrate how careful architecture design and training procedures enable a 1.6B parameter model to achieve performance competitive with models 4× larger on standard vision-language benchmarks.',
      pdf: '#',
      colab: '#',
      arxiv: 'https://arxiv.org/abs/2024.xxxxx',
      citations: 89,
      featured: true
    },
    {
      title: 'Quantization Strategies for Ultra-Tiny VLMs',
      authors: 'Efficiency Research Team',
      venue: 'NeurIPS 2024 Workshop',
      abstract: 'A comprehensive study of quantization techniques for vision-language models under 2B parameters, showing how 4-bit quantization preserves 99.4% of performance.',
      pdf: '#',
      colab: '#',
      arxiv: 'https://arxiv.org/abs/2024.xxxxx',
      citations: 56,
      featured: false
    }
  ];

  const benchmarkData = [
    {
      benchmark: 'VQA v2.0',
      description: 'Visual Question Answering on real-world images',
      metric: 'Accuracy (%)',
      moondreamFP16: 71.8,
      moondream4bit: 71.5,
      competitors: [
        { name: 'LLaVA-1.5-7B', score: 68.5, params: '7B' },
        { name: 'CLIP-ViT-B', score: 69.2, params: '1.3B' },
        { name: 'SmolVLM', score: 65.3, params: '1.3B' }
      ],
      dataset: 'https://visualqa.org/',
      lastUpdated: '2025-01-15'
    },
    {
      benchmark: 'COCO Captions',
      description: 'Image captioning on MS COCO dataset',
      metric: 'BLEU-4 Score',
      moondreamFP16: 36.2,
      moondream4bit: 35.9,
      competitors: [
        { name: 'Florence-2-Large', score: 35.8, params: '10B' },
        { name: 'CLIP-ViT-B', score: 34.0, params: '1.3B' },
        { name: 'SmolVLM', score: 32.1, params: '1.3B' }
      ],
      dataset: 'https://cocodataset.org/',
      lastUpdated: '2025-01-15'
    },
    {
      benchmark: 'TextVQA',
      description: 'Question answering on images with text',
      metric: 'Accuracy (%)',
      moondreamFP16: 58.4,
      moondream4bit: 58.1,
      competitors: [
        { name: 'LLaVA-1.5-7B', score: 54.2, params: '7B' },
        { name: 'Florence-2-Base', score: 56.1, params: '3B' },
        { name: 'SmolVLM', score: 48.7, params: '1.3B' }
      ],
      dataset: 'https://textvqa.org/',
      lastUpdated: '2025-01-15'
    }
  ];

  const notebooks = [
    {
      title: 'Fine-tune Moondream on Custom Dataset',
      description: 'Complete pipeline for training Moondream on your own image-text pairs',
      runtime: '~20 min',
      views: '2.3k',
      difficulty: 'Intermediate',
      colab: '#',
      github: '#'
    },
    {
      title: 'Constitutional AI Reward Function Training',
      description: 'Implement RLHF with custom reward functions for domain adaptation',
      runtime: '~45 min',
      views: '1.8k',
      difficulty: 'Advanced',
      colab: '#',
      github: '#'
    },
    {
      title: 'Benchmark Evaluation Suite',
      description: 'Run standardized benchmarks and compare with other models',
      runtime: '~10 min',
      views: '1.2k',
      difficulty: 'Beginner',
      colab: '#',
      github: '#'
    },
    {
      title: 'Edge Deployment with ONNX/TensorRT',
      description: 'Deploy quantized models for real-time inference on edge devices',
      runtime: '~30 min',
      views: '950',
      difficulty: 'Advanced',
      colab: '#',
      github: '#'
    }
  ];

  const challenges = [
    {
      name: 'Zero-Shot Prompt Engineering Challenge',
      description: 'Design the most effective prompts for general-purpose VQA tasks without fine-tuning',
      deadline: 'August 15, 2025',
      participants: 127,
      prize: '$2,000',
      currentLeader: 'research_team_42',
      currentScore: '74.2% VQA Accuracy',
      rules: '#',
      leaderboard: '#'
    },
    {
      name: 'Tiny Model Efficiency Race',
      description: 'Achieve highest accuracy with <1GB memory footprint on mobile devices',
      deadline: 'September 30, 2025',
      participants: 89,
      prize: '$3,000',
      currentLeader: 'mobile_ai_lab',
      currentScore: '71.8% @ 996MB',
      rules: '#',
      leaderboard: '#'
    }
  ];

  const datasets = [
    {
      name: 'DreamBench-VQA',
      description: 'Curated VQA dataset for evaluating tiny vision-language models',
      size: '50k image-question pairs',
      domains: ['Indoor scenes', 'Outdoor environments', 'Documents', 'Charts'],
      download: '#',
      paper: '#'
    },
    {
      name: 'Constitutional-VL',
      description: 'Human preference dataset for training constitutional AI rewards',
      size: '25k preference annotations',
      domains: ['Safety', 'Helpfulness', 'Honesty', 'Harmlessness'],
      download: '#',
      paper: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950/20 dark:via-slate-900 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Research Hub
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
              Advancing the frontier of tiny vision-language models through open research, 
              reproducible experiments, and community collaboration.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { label: 'Published Papers', value: '12', icon: '📄' },
              { label: 'Open Datasets', value: '6', icon: '📊' },
              { label: 'Benchmark Tasks', value: '8', icon: '🏆' },
              { label: 'GitHub Stars', value: '8.2k', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 px-6 py-4 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.icon} {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: DocumentTextIcon, title: 'Papers', href: '#papers', color: 'purple' },
              { icon: ChartBarIcon, title: 'Benchmarks', href: '#benchmarks', color: 'blue' },
              { icon: BeakerIcon, title: 'Notebooks', href: '#notebooks', color: 'green' },
              { icon: TrophyIcon, title: 'Challenges', href: '#challenges', color: 'yellow' }
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.02 }}
                className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 border border-${item.color}-200 dark:border-${item.color}-800 rounded-xl p-6 text-center hover:shadow-lg transition-all`}
              >
                <item.icon className={`w-8 h-8 text-${item.color}-600 dark:text-${item.color}-400 mx-auto mb-3`} />
                <h3 className={`text-lg font-semibold text-${item.color}-900 dark:text-${item.color}-300`}>
                  {item.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Papers Section */}
      <section id="papers" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              📄 Research Papers
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Peer-reviewed publications and preprints advancing tiny VLM research
            </p>
          </motion.div>

          <div className="space-y-8">
            {papers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border ${
                  paper.featured ? 'border-purple-300 dark:border-purple-600' : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                {paper.featured && (
                  <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    ⭐ Featured Paper
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {paper.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  {paper.authors} • {paper.venue}
                </p>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  {paper.abstract}
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <a 
                    href={paper.pdf}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    PDF
                  </a>
                  <a 
                    href={paper.colab}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <PlayIcon className="w-4 h-4" />
                    Colab
                  </a>
                  <a 
                    href={paper.arxiv}
                    className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    arXiv
                  </a>
                  <div className="text-sm text-slate-500 dark:text-slate-400 ml-auto">
                    {paper.citations} citations
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the sections would continue... */}
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join the Research Community
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Collaborate with researchers worldwide to push the boundaries of efficient AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                Submit Your Paper
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                Join Discord
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
