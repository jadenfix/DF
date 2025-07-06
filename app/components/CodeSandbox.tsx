'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CodeBracketIcon, 
  PlayIcon, 
  ClipboardIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface CodeExample {
  id: string;
  language: string;
  title: string;
  code: string;
  description: string;
}

const codeExamples: CodeExample[] = [
  {
    id: 'javascript',
    language: 'JavaScript',
    title: 'JavaScript SDK',
    description: 'Simple image analysis with the DreamForge SDK',
    code: `import { DreamForge } from '@dreamforge/sdk';

const client = new DreamForge({
  apiKey: 'your-api-key'
});

const response = await client.analyze({
  image: 'chart.png',
  prompt: 'What does this chart show?',
  rewardConfig: {
    accuracy: 1.0,
    speed: 0.1
  }
});

console.log(response.caption);
console.log(response.confidence);`
  },
  {
    id: 'python',
    language: 'Python',
    title: 'Python SDK',
    description: 'Python integration for vision-language tasks',
    code: `from dreamforge import DreamForge

client = DreamForge(api_key="your-api-key")

response = client.analyze(
    image="chart.png",
    prompt="What does this chart show?",
    reward_config={
        "accuracy": 1.0,
        "speed": 0.1
    }
)

print(response.caption)
print(response.confidence)`
  },
  {
    id: 'curl',
    language: 'cURL',
    title: 'REST API',
    description: 'Direct API calls with cURL',
    code: `curl -X POST https://api.dreamforge.ai/v1/analyze \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQ...",
    "prompt": "What does this chart show?",
    "reward_config": {
      "accuracy": 1.0,
      "speed": 0.1
    }
  }'`
  }
];

export default function CodeSandbox() {
  const [selectedExample, setSelectedExample] = useState<string>('javascript');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const currentExample = codeExamples.find(ex => ex.id === selectedExample);

  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Developer SDK & CLI
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Integrate DreamForge into your applications with our comprehensive SDK and CLI tools
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Examples */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Quick Start Examples
            </h3>

            {/* Language Tabs */}
            <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              {codeExamples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setSelectedExample(example.id)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedExample === example.id
                      ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {example.language}
                </button>
              ))}
            </div>

            {/* Code Display */}
            {currentExample && (
              <motion.div
                key={currentExample.id}
                className="bg-slate-900 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {currentExample.title}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {currentExample.description}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(currentExample.code, currentExample.id)}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                  >
                    {copied === currentExample.id ? (
                      <>
                        <CheckCircleIcon className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardIcon className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  <code>{currentExample.code}</code>
                </pre>
              </motion.div>
            )}
          </motion.div>

          {/* Live Demo */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Live Code Sandbox
            </h3>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <CodeBracketIcon className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-900 dark:text-white">
                  Interactive Playground
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    API Key
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your API key"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Prompt
                  </label>
                  <textarea
                    placeholder="What do you see in this image?"
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                  <PlayIcon className="w-5 h-5" />
                  Run Analysis
                </button>
              </div>

              {/* Result Display */}
              <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                  Result
                </h4>
                <div className="text-slate-600 dark:text-slate-300 text-sm">
                  Click "Run Analysis" to see the AI response...
                </div>
              </div>
            </div>

            {/* CLI Installation */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h4 className="text-lg font-semibold mb-3">Install CLI</h4>
              <div className="bg-slate-900 rounded p-3 mb-3">
                <code className="text-green-400 text-sm">
                  npm install -g @dreamforge/cli
                </code>
              </div>
              <p className="text-blue-100 text-sm">
                Deploy models and manage configurations from your terminal
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 