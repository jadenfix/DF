'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CommandLineIcon, 
  PlayIcon, 
  StopIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  component?: string;
}

interface LogsConsoleProps {
  logs: LogEntry[];
  isTraining?: boolean;
  onStartTraining?: () => void;
  onStopTraining?: () => void;
  maxHeight?: string;
}

const LOG_ICONS = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationCircleIcon,
  error: ExclamationCircleIcon,
};

const LOG_COLORS = {
  info: 'text-blue-600 dark:text-blue-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400',
};

function LogEntry({ log }: { log: LogEntry }) {
  const Icon = LOG_ICONS[log.level];
  const colorClass = LOG_COLORS[log.level];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2 py-2 border-b border-gray-100 dark:border-gray-800"
    >
      <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${colorClass}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
          {log.component && (
            <>
              <span>•</span>
              <span className="font-medium">{log.component}</span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">
          {log.message}
        </p>
      </div>
    </motion.div>
  );
}

export default function LogsConsole({ 
  logs, 
  isTraining = false, 
  onStartTraining, 
  onStopTraining,
  maxHeight = "h-96"
}: LogsConsoleProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <CommandLineIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">
            Training Console
          </h3>
          {isTraining && (
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 dark:text-green-400">Running</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Training Controls */}
          {onStartTraining && (
            <button
              onClick={isTraining ? onStopTraining : onStartTraining}
              disabled={!onStartTraining}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isTraining
                  ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800'
                  : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
              }`}
            >
              {isTraining ? (
                <>
                  <StopIcon className="h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <PlayIcon className="h-4 w-4" />
                  Start Training
                </>
              )}
            </button>
          )}

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Console Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div 
              ref={scrollRef}
              className={`${maxHeight} overflow-y-auto p-4 space-y-1 bg-gray-50 dark:bg-gray-800`}
            >
              {logs.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <CommandLineIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No logs yet</p>
                    <p className="text-xs mt-1">Start training to see logs appear here</p>
                  </div>
                </div>
              ) : (
                logs.map((log) => <LogEntry key={log.id} log={log} />)
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Stats */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-xl">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{logs.length} log entries</span>
          {logs.length > 0 && (
            <span>Latest: {new Date(logs[logs.length - 1]?.timestamp).toLocaleTimeString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
