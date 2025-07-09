'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

const services = [
  {
    name: 'Moondream API',
    status: 'operational',
    uptime: '99.98%',
    responseTime: '15ms',
    description: 'Vision-language model inference'
  },
  {
    name: 'Authentication',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '45ms',
    description: 'User authentication and sessions'
  },
  {
    name: 'Dashboard',
    status: 'operational',
    uptime: '99.95%',
    responseTime: '120ms',
    description: 'Web application and UI'
  },
  {
    name: 'Database',
    status: 'operational',
    uptime: '99.97%',
    responseTime: '8ms',
    description: 'Data storage and retrieval'
  },
  {
    name: 'CDN',
    status: 'operational',
    uptime: '99.99%',
    responseTime: '25ms',
    description: 'Global content delivery'
  }
];

const incidents = [
  {
    date: 'Jan 15, 2025',
    title: 'Brief API latency increase',
    status: 'resolved',
    duration: '12 minutes',
    impact: 'minimal'
  },
  {
    date: 'Jan 10, 2025',
    title: 'Scheduled maintenance',
    status: 'completed',
    duration: '30 minutes',
    impact: 'none'
  }
];

function StatusBadge({ status }: { status: string }) {
  const getColor = () => {
    switch (status) {
      case 'operational': return 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30';
      case 'degraded': return 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30';
      case 'outage': return 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30';
      default: return 'text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-900/30';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'operational': return CheckCircleIcon;
      case 'degraded': return ExclamationTriangleIcon;
      case 'outage': return ExclamationTriangleIcon;
      default: return ClockIcon;
    }
  };

  const Icon = getIcon();

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getColor()}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function StatusPage() {
  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              System Status
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-time status of DreamForge services
            </p>
          </motion.div>

          {/* Overall Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  All Systems Operational
                </h2>
                <p className="text-muted-foreground">
                  All services are running normally
                </p>
              </div>
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
          </motion.div>

          {/* Services Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Service Status
            </h3>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium text-foreground">{service.name}</h4>
                      <StatusBadge status={service.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-foreground font-mono">{service.responseTime}</div>
                    <div className="text-muted-foreground">{service.uptime} uptime</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Recent Incidents
            </h3>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{incident.title}</h4>
                    <StatusBadge status={incident.status} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>{incident.date}</span> • 
                    <span className="ml-1">Duration: {incident.duration}</span> • 
                    <span className="ml-1">Impact: {incident.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
