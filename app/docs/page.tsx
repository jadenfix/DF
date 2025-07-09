'use client';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation';

export default function Docs() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DreamForge Documentation
            </span>
          </h1>
          <p className="text-xl text-slate-700 dark:text-gray-300 max-w-3xl mx-auto">
            Deploy Moondream's vision-language AI with enterprise-grade infrastructure and AI-powered insights
          </p>
        </motion.div>

        <div className="space-y-12">
          <section id="getting-started">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Getting Started with Moondream</h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-800 dark:text-slate-200">DreamForge is the premier deployment platform for Moondream, the world's most efficient vision-language model. With just 1.6B parameters and a 1GB footprint, Moondream delivers enterprise-grade visual AI.</p>
              
              <h3 className="text-slate-900 dark:text-white">Core Capabilities</h3>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>Image Captioning:</strong> Generate detailed, accurate descriptions of visual content</li>
                <li><strong>Visual Question Answering:</strong> Answer complex questions about images using natural language</li>
                <li><strong>Object Detection:</strong> Identify and locate objects with coordinate precision</li>
                <li><strong>OCR & Document Understanding:</strong> Extract and understand text from images</li>
                <li><strong>Pointing & Gaze Detection:</strong> Identify spatial relationships and attention patterns</li>
              </ul>
              
              <h3 className="text-slate-900 dark:text-white">Quick Start</h3>
              <ol className="text-slate-800 dark:text-slate-200">
                <li>Visit the <a href="/playground" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">AI Playground</a> to test Moondream's capabilities</li>
                <li>Upload an image or select from our curated examples</li>
                <li>Try different prompts: "Describe this image", "What objects do you see?", "Read the text in this image"</li>
                <li>Explore the <a href="/rl-dashboard" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">RL Dashboard</a> for constitutional AI training</li>
                <li>Read the <a href="/docs/rl-pipeline" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">RL Pipeline Documentation</a> to understand our training methodology</li>
              </ol>
            </div>
          </section>

          <section id="api-reference">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Moondream API Reference</h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <h3 className="text-slate-900 dark:text-white">Image Analysis Endpoint</h3>
              <p className="text-slate-800 dark:text-slate-200">Deploy Moondream's vision-language capabilities through our RESTful API:</p>
              
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <code>{`curl -X POST https://api.dreamforge.ai/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "moondream-2",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
    "prompt": "Describe this image in detail",
    "max_tokens": 500,
    "temperature": 0.7
  }'`}</code>
              </pre>
              
              <h3 className="text-slate-900 dark:text-white">Response Format</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <code>{`{
  "success": true,
  "result": "The image shows a bustling city street with tall buildings...",
  "model": "moondream-2",
  "processing_time_ms": 15,
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 87,
    "total_tokens": 99
  },
  "ai_insights": {
    "confidence_score": 0.94,
    "detected_objects": ["building", "street", "car"],
    "scene_type": "urban_outdoor"
  }
}`}</code>
              </pre>

              <h3 className="text-slate-900 dark:text-white">Interactive API Explorer</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                  Try the API Live
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Your Prompt
                    </label>
                    <textarea 
                      className="w-full p-3 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-blue-950 text-blue-900 dark:text-blue-100"
                      rows={3}
                      placeholder="Describe this image in detail"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Image URL or Upload
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="w-full p-3 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-blue-950 text-blue-900 dark:text-blue-100 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700"
                    />
                  </div>
                </div>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                  Test API Call
                </button>
              </div>
            </div>
          </section>

          <section id="rl-training">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Constitutional AI Training Pipeline</h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-800 dark:text-slate-200">DreamForge's Constitutional AI training pipeline transforms generic Moondream models into domain-specific experts that deliver measurable business value.</p>
              
              <h3 className="text-slate-900 dark:text-white">Business Impact of Constitutional AI Training</h3>
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Performance Gains</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200">
                    <li>15-30% accuracy improvement over base models</li>
                    <li>50% reduction in hallucinations</li>
                    <li>3x better performance on domain-specific tasks</li>
                    <li>Higher user satisfaction scores (NPS +25 points)</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Cost Savings</h4>
                  <ul className="text-sm text-green-800 dark:text-green-200">
                    <li>40% reduction in API calls through improved accuracy</li>
                    <li>Lower support ticket volume</li>
                    <li>Reduced compute costs for inference</li>
                    <li>Faster time-to-market for AI features</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-slate-900 dark:text-white">What You Can Do With Post-Training Models</h3>
              <p className="text-slate-800 dark:text-slate-200">After constitutional AI training, your Moondream models become specialized tools capable of:</p>
              
              <h4 className="text-slate-900 dark:text-white">1. Industry-Specific Vision Analysis</h4>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>Healthcare:</strong> Medical image analysis with regulatory compliance built-in</li>
                <li><strong>Retail:</strong> Product classification and visual search with brand-aware descriptions</li>
                <li><strong>Manufacturing:</strong> Quality control and defect detection with safety protocols</li>
                <li><strong>Content:</strong> Media moderation with cultural sensitivity and safety guardrails</li>
              </ul>

              <h4 className="text-slate-900 dark:text-white">2. Safety-First Production Deployment</h4>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>Constitutional Constraints:</strong> Hard-coded safety boundaries that prevent harmful outputs</li>
                <li><strong>Bias Mitigation:</strong> Reduced demographic and cultural bias through preference learning</li>
                <li><strong>Consistency Guarantees:</strong> Stable performance across different user groups and contexts</li>
                <li><strong>Audit Trails:</strong> Complete training provenance for regulatory compliance</li>
              </ul>

              <h4 className="text-slate-900 dark:text-white">3. Custom Reward Functions</h4>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>Business KPI Alignment:</strong> Optimize for metrics that matter to your specific use case</li>
                <li><strong>Multi-Objective Optimization:</strong> Balance accuracy, speed, safety, and user satisfaction</li>
                <li><strong>Dynamic Adaptation:</strong> Continuously improve based on real user feedback</li>
                <li><strong>A/B Testing:</strong> Compare model variants to maximize business impact</li>
              </ul>

              <h4 className="text-slate-900 dark:text-white">4. Enterprise Integration</h4>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>API-First Architecture:</strong> Drop-in replacement for existing vision pipelines</li>
                <li><strong>Scalable Infrastructure:</strong> Auto-scaling deployment with 99.9% uptime SLA</li>
                <li><strong>Security & Compliance:</strong> SOC 2 Type II, GDPR, and HIPAA ready</li>
                <li><strong>Real-Time Analytics:</strong> Monitor model performance and business impact</li>
              </ul>
            </div>
          </section>

          <section id="architecture">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">DreamForge Architecture</h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-800 dark:text-slate-200">DreamForge provides enterprise-grade infrastructure for deploying Moondream's vision-language capabilities at scale.</p>
              
              <h3 className="text-slate-900 dark:text-white">Core Components</h3>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>Moondream 2 (1.6B)</strong> - Ultra-efficient vision-language model with 1GB footprint</li>
                <li><strong>Constitutional AI Pipeline</strong> - RLHF training with safety constraints</li>
                <li><strong>Edge Deployment</strong> - Global CDN with &lt;15ms latency</li>
                <li><strong>AI-Powered Insights</strong> - Real-time analytics and model performance monitoring</li>
                <li><strong>Quantization Support</strong> - 4-bit and 8-bit optimizations for different deployment scenarios</li>
                <li><strong>Enterprise Security</strong> - SOC 2 compliant with end-to-end encryption</li>
              </ul>

              <h3 className="text-slate-900 dark:text-white">Constitutional RLHF Pipeline</h3>
              <p className="text-slate-800 dark:text-slate-200">Our mathematically rigorous reinforcement learning system implements constitutional AI principles:</p>
              <ol className="text-slate-800 dark:text-slate-200">
                <li><strong>Preference Collection:</strong> Bradley-Terry pairwise comparison model</li>
                <li><strong>Reward Modeling:</strong> Multi-objective optimization with safety constraints</li>
                <li><strong>Policy Optimization:</strong> PPO with KL divergence penalties</li>
                <li><strong>Constitutional Constraints:</strong> Hard safety boundaries via rule-based filtering</li>
                <li><strong>Continuous Learning:</strong> Online adaptation with drift detection</li>
              </ol>
              
              <h3 className="text-slate-900 dark:text-white">Performance Metrics</h3>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>Latency:</strong> 15ms average inference time</li>
                <li><strong>Throughput:</strong> 10,000+ requests/minute</li>
                <li><strong>Accuracy:</strong> 95.2% on VQA benchmarks</li>
                <li><strong>Uptime:</strong> 99.9% SLA with multi-region redundancy</li>
              </ul>
            </div>
          </section>

          <section id="environment-setup">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Environment Setup</h2>
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-800 dark:text-slate-200">To set up DreamForge for development, you&apos;ll need these environment variables:</p>
              
              <h3 className="text-slate-900 dark:text-white">Required API Keys</h3>
              <ul className="text-slate-800 dark:text-slate-200">
                <li><strong>MOONDREAM_KEY</strong> - Get from <a href="https://moondream.ai/c/cloud/api-keys" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">Moondream Dashboard</a></li>
                <li><strong>ANTHROPIC_API_KEY</strong> - Get from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">Anthropic Console</a></li>
                <li><strong>MONGODB_URI</strong> - MongoDB Atlas connection string</li>
                <li><strong>STRIPE_SECRET_KEY</strong> - For payment processing</li>
              </ul>

              <h3 className="text-slate-900 dark:text-white">Example .env.local</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <code>{`# Moondream AI
MOONDREAM_KEY=your_moondream_api_key_here

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-api03-your_anthropic_key_here

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dreamforge

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000`}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
