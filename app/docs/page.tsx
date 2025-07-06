'use client';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon,
  CpuChipIcon,
  CodeBracketIcon,
  SparklesIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CogIcon,
  ServerIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Navigation from '../components/layout/navigation';

const sections = [
  {
    title: 'Getting Started',
    description: 'Quick start guide to get you up and running with DreamForge',
    icon: BookOpenIcon,
    content: [
      'Upload your first image',
      'Ask questions about images',
      'Understand AI responses',
      'Provide feedback for improvement',
    ],
  },
  {
    title: 'AI Architecture',
    description: 'Deep dive into our vision-language model architecture',
    icon: CpuChipIcon,
    content: [
      'Moondream VLM integration',
      'Anthropic Claude reasoning',
      'Hybrid model pipeline',
      'Performance optimization',
    ],
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation for developers',
    icon: CodeBracketIcon,
    content: [
      'Authentication methods',
      'Image analysis endpoints',
      'Webhook configurations',
      'Rate limiting details',
    ],
  },
  {
    title: 'Reinforcement Learning',
    description: 'How our RLHF pipeline continuously improves the AI',
    icon: AcademicCapIcon,
    content: [
      'Human feedback collection',
      'Reward function design',
      'Model fine-tuning process',
      'Performance metrics',
    ],
  },
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Documentation
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Technical documentation, API reference, and implementation guides for DreamForge
          </p>
        </motion.div>

        {/* Table of Contents */}
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-8 bg-slate-50 dark:bg-slate-800 rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Contents</h3>
              <nav className="space-y-2">
                <a href="#overview" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Overview
                </a>
                <a href="#architecture" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  System Architecture
                </a>
                <a href="#moondream" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Moondream VLM
                </a>
                <a href="#anthropic" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Anthropic Claude
                </a>
                <a href="#rlhf" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  RLHF Pipeline
                </a>
                <a href="#api" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  API Reference
                </a>
                <a href="#admin" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Admin Endpoints
                </a>
              </nav>
            </motion.div>
          </div>

          <div className="lg:col-span-3 space-y-16">
            {/* Overview */}
            <motion.section
              id="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Overview
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  DreamForge is an end-to-end vision-language AI platform that combines cutting-edge models with 
                  reinforcement learning from human feedback (RLHF). Our system architecture is designed for 
                  scalability, reliability, and continuous improvement.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <CpuChipIcon className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Fast Inference</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Sub-100ms response times with optimized small-parameter models
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <ChartBarIcon className="w-8 h-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Continuous Learning</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      RLHF pipeline ensures models improve with every interaction
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <ShieldCheckIcon className="w-8 h-8 text-purple-600 mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Enterprise Ready</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      SOC-2 compliant with 99.9% uptime SLA
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* System Architecture */}
            <motion.section
              id="architecture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                System Architecture
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Our architecture is built on modern cloud-native principles with serverless functions, 
                  edge computing, and automated scaling.
                </p>

                <div className="bg-slate-900 rounded-lg p-6 mb-6">
                  <h4 className="text-white font-semibold mb-4">Architecture Components</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Frontend Layer</h5>
                      <ul className="text-slate-300 space-y-1">
                        <li>• Next.js 14 with App Router</li>
                        <li>• React + TypeScript</li>
                        <li>• Tailwind CSS for styling</li>
                        <li>• Vercel Edge Functions</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-green-400 font-medium mb-2">Backend Services</h5>
                      <ul className="text-slate-300 space-y-1">
                        <li>• Node.js API routes</li>
                        <li>• MongoDB Atlas database</li>
                        <li>• Redis for caching</li>
                        <li>• Stripe for payments</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-purple-400 font-medium mb-2">AI Processing</h5>
                      <ul className="text-slate-300 space-y-1">
                        <li>• Moondream VLM (local)</li>
                        <li>• Anthropic Claude API</li>
                        <li>• RLHF training pipeline</li>
                        <li>• Model versioning</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-yellow-400 font-medium mb-2">Infrastructure</h5>
                      <ul className="text-slate-300 space-y-1">
                        <li>• Vercel deployment</li>
                        <li>• Global CDN</li>
                        <li>• Auto-scaling</li>
                        <li>• Monitoring & alerts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Moondream VLM */}
            <motion.section
              id="moondream"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Moondream Visual Language Model
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Moondream is an open-source visual language model (~2B parameters) that can run locally 
                  with a small footprint. It handles image analysis tasks such as captioning, object detection, 
                  OCR, and visual Q&A without requiring cloud compute.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Model Specifications</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white mb-2">Performance</h5>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-1 text-sm">
                        <li>• Parameters: 2B (configurable)</li>
                        <li>• Latency: 15-40ms</li>
                        <li>• Memory: 512MB-2GB</li>
                        <li>• Accuracy: 92-96%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white mb-2">Capabilities</h5>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-1 text-sm">
                        <li>• Image captioning</li>
                        <li>• Visual question answering</li>
                        <li>• Object detection</li>
                        <li>• OCR and text extraction</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4">Integration Example</h4>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`// Using Moondream for image analysis
const response = await moondream.analyze({
  image: "data:image/jpeg;base64,...",
  prompt: "What do you see in this image?",
  model: "moondream-25m" // 25M parameter model
});

console.log(response.caption);
console.log(response.confidence);`}
                  </pre>
                </div>
              </div>
            </motion.section>

            {/* Anthropic Claude */}
            <motion.section
              id="anthropic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Anthropic Claude Integration
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  For advanced reasoning or lengthy explanations, we tap into Claude, a state-of-the-art 
                  large language model via API. Claude provides superior language generation and reasoning, 
                  ensuring our platform can handle complex queries.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Usage Strategy</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white mb-2">When to Use Claude</h5>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-1 text-sm">
                        <li>• Complex reasoning tasks</li>
                        <li>• Detailed explanations</li>
                        <li>• Multi-step analysis</li>
                        <li>• Pro plan users only</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white mb-2">Cost Management</h5>
                      <ul className="text-slate-600 dark:text-slate-300 space-y-1 text-sm">
                        <li>• Usage-based billing</li>
                        <li>• Rate limiting per user</li>
                        <li>• Fallback to Moondream</li>
                        <li>• Configurable thresholds</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* RLHF Pipeline */}
            <motion.section
              id="rlhf"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Reinforcement Learning from Human Feedback (RLHF)
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Our RLHF pipeline collects user feedback and uses it to train a reward model that aligns 
                  with user preferences. This reward model then guides the AI's behavior via reinforcement 
                  learning updates.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Reward Function</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    The reward function R(s, a) that the model optimizes:
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 mb-4">
                    <code className="text-green-400 text-sm">
                      R(s, a) = w₁ × accuracy + w₂ × helpfulness - w₃ × latency
                    </code>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Where w₁, w₂, w₃ are adjustable weights that can be configured via admin interface.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Training Loop</h4>
                    <ol className="text-slate-600 dark:text-slate-300 space-y-2 text-sm">
                      <li>1. Data collection from user feedback</li>
                      <li>2. Reward model training</li>
                      <li>3. Policy optimization</li>
                      <li>4. Model deployment</li>
                    </ol>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Best Practices</h4>
                    <ul className="text-slate-600 dark:text-slate-300 space-y-2 text-sm">
                      <li>• Avoid reward hacking</li>
                      <li>• Align rewards with objectives</li>
                      <li>• Regular model evaluation</li>
                      <li>• A/B testing for improvements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* API Reference */}
            <motion.section
              id="api"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                API Reference
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="bg-slate-900 rounded-lg p-6 mb-6">
                  <h4 className="text-white font-semibold mb-4">Image Analysis Endpoint</h4>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`POST /api/analyze
Content-Type: application/json

{
  "image": "data:image/jpeg;base64,...",
  "prompt": "What do you see in this image?",
  "model": "moondream-25m",
  "reward_config": {
    "accuracy": 1.0,
    "speed": 0.1
  }
}

Response:
{
  "success": true,
  "caption": "A red car parked on the street",
  "confidence": 0.92,
  "analysis_id": "abc123"
}`}
                  </pre>
                </div>

                <div className="bg-slate-900 rounded-lg p-6 mb-6">
                  <h4 className="text-white font-semibold mb-4">Feedback Endpoint</h4>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`POST /api/feedback
Content-Type: application/json

{
  "analysis_id": "abc123",
  "feedback": "positive",
  "reward_score": 5,
  "comment": "Great analysis!"
}

Response:
{
  "success": true,
  "message": "Feedback recorded successfully"
}`}
                  </pre>
                </div>
              </div>
            </motion.section>

            {/* Admin Endpoints */}
            <motion.section
              id="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Admin Endpoints
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                  Administrative endpoints for managing reward functions and monitoring system performance.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">RLHF Dev Ops</h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    DreamForge exposes simple admin endpoints so you can iterate on reward shaping just like 
                    adjusting environment variables on Vercel:
                  </p>
                  <ul className="text-slate-600 dark:text-slate-300 space-y-2 text-sm">
                    <li>
                      <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                        GET /api/admin/reward-config
                      </code> 
                      – fetch current w₁, w₂, w₃ weights
                    </li>
                    <li>
                      <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                        PUT /api/admin/reward-config
                      </code> 
                      – update weights (JSON body {"accuracy":2,"helpfulness":1,"latency":-1})
                    </li>
                    <li>
                      <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                        POST /api/admin/reward-update?limit=100
                      </code> 
                      – recompute rewardScore for latest feedback entries
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4">Example: Update Reward Weights</h4>
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X PUT https://api.dreamforge.ai/api/admin/reward-config \\
  -H "x-admin-secret: your-secret" \\
  -H "Content-Type: application/json" \\
  -d '{
    "accuracy": 2.0,
    "helpfulness": 1.0,
    "latency": -0.01
  }'`}
                  </pre>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
} 