'use client';

import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CogIcon, 
  ServerIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  quarter: string;
  icon: React.ComponentType<any>;
  features: string[];
}

const roadmapItems: RoadmapItem[] = [
  {
    id: 'multi-objective',
    title: 'Multi-objective Reward Support',
    description: 'Advanced reward functions with multiple optimization targets',
    status: 'in-progress',
    quarter: 'Q1 2024',
    icon: ChartBarIcon,
    features: [
      'Multi-dimensional reward vectors',
      'Pareto optimal solutions',
      'Interactive reward visualization'
    ]
  },
  {
    id: 'gitops',
    title: 'GitOps for Reward Configs',
    description: 'Version control and CI/CD for reward function management',
    status: 'planned',
    quarter: 'Q2 2024',
    icon: CogIcon,
    features: [
      'Git-based configuration management',
      'Automated deployment pipelines',
      'Rollback capabilities'
    ]
  },
  {
    id: 'on-prem',
    title: 'On-prem VPC Deploy',
    description: 'Enterprise deployment options for private infrastructure',
    status: 'planned',
    quarter: 'Q3 2024',
    icon: ServerIcon,
    features: [
      'Private cloud deployment',
      'Custom model support',
      'Enterprise security features'
    ]
  },
  {
    id: 'global',
    title: 'Global Edge Deployment',
    description: 'Worldwide edge network for ultra-low latency',
    status: 'planned',
    quarter: 'Q4 2024',
    icon: GlobeAltIcon,
    features: [
      'Global edge locations',
      'Automatic geo-routing',
      'Regional compliance'
    ]
  }
];

export default function Roadmap() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'planned':
        return 'bg-slate-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Planned';
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Product Roadmap
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our development roadmap shows what's coming next. We're building the future of vision-language AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {roadmapItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.quarter}
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {item.description}
              </p>

              <div className="space-y-2">
                <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                  Key Features:
                </h4>
                {item.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-blue-100">
              Help shape the future of vision-language AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold mb-2">Discord Community</h4>
              <p className="text-blue-100 text-sm">
                Join 2,000+ developers discussing AI and sharing projects
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="font-semibold mb-2">GitHub Discussions</h4>
              <p className="text-blue-100 text-sm">
                Open source contributions and feature requests
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-semibold mb-2">Newsletter</h4>
              <p className="text-blue-100 text-sm">
                Weekly updates on new features and AI research
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Get Involved
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 