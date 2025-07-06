'use client';

import { motion } from 'framer-motion';
import { 
  ServerIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';

interface InfrastructureFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  metrics: {
    label: string;
    value: string;
    unit: string;
  }[];
}

const infrastructureFeatures: InfrastructureFeature[] = [
  {
    id: 'deployment',
    title: 'Deployment Pipeline',
    description: 'GitHub → Vercel Edge Functions → Auto-scaling',
    icon: ServerIcon,
    metrics: [
      { label: 'Uptime', value: '99.9', unit: '%' },
      { label: 'Cold Start', value: '<2', unit: 's' }
    ]
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    description: 'TLS everywhere, SOC-2 ready, GDPR compliant',
    icon: ShieldCheckIcon,
    metrics: [
      { label: 'Data Encryption', value: 'AES-256', unit: '' },
      { label: 'Compliance', value: 'SOC-2', unit: 'Ready' }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Alerts',
    description: 'Real-time metrics, automated alerting',
    icon: ChartBarIcon,
    metrics: [
      { label: 'Response Time', value: '<100', unit: 'ms' },
      { label: 'Error Rate', value: '<0.1', unit: '%' }
    ]
  },
  {
    id: 'automation',
    title: 'Automated Scaling',
    description: 'Kubernetes + Argo Workflows for RL jobs',
    icon: CogIcon,
    metrics: [
      { label: 'Auto-scaling', value: '0-1000', unit: 'instances' },
      { label: 'RL Training', value: 'Daily', unit: 'updates' }
    ]
  }
];

export default function EnterpriseInfrastructure() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Enterprise-Grade Infrastructure
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Built for scale, security, and reliability. Production-ready infrastructure that grows with your needs.
          </p>
        </motion.div>

        {/* Infrastructure Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {infrastructureFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="bg-slate-800 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-300 mb-4">
                {feature.description}
              </p>

              <div className="space-y-2">
                {feature.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">
                      {metric.label}
                    </span>
                    <span className="text-sm font-semibold text-blue-400">
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <motion.div
          className="bg-slate-800 rounded-xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            System Architecture
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">FE</span>
              </div>
              <h4 className="font-semibold mb-2">Frontend</h4>
              <p className="text-slate-300 text-sm">
                Next.js + React<br />
                Vercel Edge Functions<br />
                Global CDN
              </p>
            </div>

            {/* API Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">API</span>
              </div>
              <h4 className="font-semibold mb-2">API Gateway</h4>
              <p className="text-slate-300 text-sm">
                Rate Limiting<br />
                Authentication<br />
                Request Routing
              </p>
            </div>

            {/* AI Layer */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">AI</span>
              </div>
              <h4 className="font-semibold mb-2">AI Processing</h4>
              <p className="text-slate-300 text-sm">
                Moondream VLM<br />
                Anthropic Claude<br />
                RL Pipeline
              </p>
            </div>
          </div>

          {/* Data Flow */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
              <div className="w-16 h-0.5 bg-slate-600" />
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <div className="w-16 h-0.5 bg-slate-600" />
              <div className="w-4 h-4 bg-purple-500 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Reliability Metrics */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-center bg-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-slate-300">Uptime SLA</div>
            <div className="text-slate-400 text-sm mt-2">
              Guaranteed availability with automatic failover
            </div>
          </div>

          <div className="text-center bg-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">&lt;100ms</div>
            <div className="text-slate-300">Response Time</div>
            <div className="text-slate-400 text-sm mt-2">
              Global edge network for lightning-fast responses
            </div>
          </div>

          <div className="text-center bg-slate-800 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-slate-300">Monitoring</div>
            <div className="text-slate-400 text-sm mt-2">
              Real-time alerts and automated incident response
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Security First</h3>
            <p className="text-blue-100">
              Enterprise-grade security with compliance certifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white">End-to-end encryption (TLS 1.3)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white">SOC-2 Type II compliance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white">GDPR data retention policies</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white">Regular security audits</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white">VPC deployment options</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white">Role-based access control</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 