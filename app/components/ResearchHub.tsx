'use client';

import { motion } from 'framer-motion';
import { DocumentTextIcon, ChartBarIcon, BeakerIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function ResearchHub() {
  const benchmarkData = [
    {
      task: 'COCO Captions',
      metric: 'BLEU-4',
      moondream: '36.2',
      moondream4bit: '35.9',
      competitor: '34.0 (CLIP Tiny)',
      improvement: '+6.5%'
    },
    {
      task: 'VQA v2.0',
      metric: 'Accuracy',
      moondream: '71.8%',
      moondream4bit: '71.5%',
      competitor: '69.2% (CLIP Tiny)',
      improvement: '+3.8%'
    },
    {
      task: 'TextVQA',
      metric: 'Accuracy',
      moondream: '58.4%',
      moondream4bit: '58.1%',
      competitor: '54.2% (LLaVA-1.5)',
      improvement: '+7.8%'
    }
  ];

  const papers = [
    {
      title: 'Moondream 2: Tiny Vision Language Model',
      authors: 'Vikhyat Korrapati',
      venue: 'Open Source 2024',
      description: 'A 1.6B parameter vision-language model achieving competitive performance with 4× smaller footprint than alternatives.',
      github: 'https://github.com/vikhyat/moondream',
      huggingface: 'https://huggingface.co/vikhyatk/moondream2'
    }
  ];

  const challenges = [
    {
      name: 'Contribute to Moondream',
      description: 'Join the open source community building the world\'s most efficient vision-language model',
      deadline: 'Open Source',
      participants: '25+ contributors',
      topScore: '8.2k GitHub stars',
      url: 'https://github.com/vikhyat/moondream'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950/20 dark:via-slate-900 dark:to-blue-950/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Research Hub
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Pushing the frontier of tiny vision-language models through open research, 
            community benchmarks, and reproducible experiments.
          </p>
          <a
            href="https://github.com/vikhyat/moondream"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <span className="mr-2">💻</span>
            Explore Moondream on GitHub
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Papers & Publications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center mb-6">
              <DocumentTextIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Papers & Preprints
              </h3>
            </div>
            
            <div className="space-y-6">
              {papers.map((paper, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {paper.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {paper.authors} • {paper.venue}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    {paper.description}
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href={paper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
                    >
                      � GitHub
                    </a>
                    <a 
                      href={paper.huggingface}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      🤗 HuggingFace
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benchmarks & Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center mb-6">
              <ChartBarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Live Benchmarks
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-600">
                    <th className="text-left py-2 text-slate-900 dark:text-white">Task</th>
                    <th className="text-center py-2 text-slate-900 dark:text-white">FP16</th>
                    <th className="text-center py-2 text-slate-900 dark:text-white">4-bit</th>
                    <th className="text-center py-2 text-slate-900 dark:text-white">vs Best</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkData.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                      <td className="py-3">
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">{row.task}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{row.metric}</div>
                        </div>
                      </td>
                      <td className="text-center py-3 font-mono text-green-600 dark:text-green-400 font-medium">
                        {row.moondream}
                      </td>
                      <td className="text-center py-3 font-mono text-green-600 dark:text-green-400 font-medium">
                        {row.moondream4bit}
                      </td>
                      <td className="text-center py-3">
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                          {row.improvement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-600">
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Benchmarks updated from latest Moondream releases
              </p>
            </div>
          </motion.div>
        </div>

        {/* Notebooks & Community Challenges */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Notebooks Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center mb-6">
              <BeakerIcon className="w-8 h-8 text-teal-600 dark:text-teal-400 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Notebooks & Datasets
              </h3>
            </div>
            
            <div className="grid gap-4">
              {[
                { 
                  title: 'Moondream Getting Started Guide', 
                  views: '8.2k', 
                  runtime: '~5 min',
                  url: 'https://moondream.ai/c/docs/quickstart'
                },
                { 
                  title: 'Moondream Playground Demo', 
                  views: '2.3k', 
                  runtime: 'Interactive',
                  url: 'https://moondream.ai/playground'
                },
                { 
                  title: 'HuggingFace Model Card', 
                  views: '545k', 
                  runtime: '~3 min',
                  url: 'https://huggingface.co/vikhyatk/moondream2'
                }
              ].map((notebook, index) => (
                <a 
                  key={index} 
                  href={notebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">{notebook.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{notebook.views} views • {notebook.runtime}</p>
                  </div>
                  <span className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                    Open →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Community Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center mb-6">
              <TrophyIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mr-3" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Open Source Project
              </h3>
            </div>
            
            <div className="space-y-6">
              {challenges.map((challenge, index) => (
                <a 
                  key={index} 
                  href={challenge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-slate-200 dark:border-slate-600 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {challenge.name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                    {challenge.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="space-y-1">
                      <div className="text-slate-500 dark:text-slate-400">
                        🏆 Current: <span className="font-medium">{challenge.topScore}</span>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">
                        👥 {challenge.participants}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-600 dark:text-green-400 font-medium">
                        {challenge.deadline}
                      </div>
                      <span className="mt-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                        Join Project →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
