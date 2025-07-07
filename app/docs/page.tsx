'use client';
import { motion } from 'framer-motion';
import Navigation from '../components/layout/navigation';

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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Deploy Moondream's vision-language AI with enterprise-grade infrastructure and AI-powered insights
          </p>
        </motion.div>

        <div className="space-y-12">
          <section id="getting-started">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Getting Started with Moondream</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>DreamForge is the premier deployment platform for Moondream, the world's most efficient vision-language model. With just 1.6B parameters and a 1GB footprint, Moondream delivers enterprise-grade visual AI.</p>
              
              <h3>Core Capabilities</h3>
              <ul>
                <li><strong>Image Captioning:</strong> Generate detailed, accurate descriptions of visual content</li>
                <li><strong>Visual Question Answering:</strong> Answer complex questions about images using natural language</li>
                <li><strong>Object Detection:</strong> Identify and locate objects with coordinate precision</li>
                <li><strong>OCR & Document Understanding:</strong> Extract and understand text from images</li>
                <li><strong>Pointing & Gaze Detection:</strong> Identify spatial relationships and attention patterns</li>
              </ul>
              
              <h3>Quick Start</h3>
              <ol>
                <li>Visit the <a href="/playground">AI Playground</a> to test Moondream's capabilities</li>
                <li>Upload an image or select from our curated examples</li>
                <li>Try different prompts: "Describe this image", "What objects do you see?", "Read the text in this image"</li>
                <li>Explore the <a href="/playground-advanced">Advanced Playground</a> for RLHF training and deployment tools</li>
              </ol>
            </div>
          </section>

          <section id="api-reference">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Moondream API Reference</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3>Image Analysis Endpoint</h3>
              <p>Deploy Moondream's vision-language capabilities through our RESTful API:</p>
              
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
              
              <h3>Response Format</h3>
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
            </div>
          </section>

          <section id="architecture">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">DreamForge Architecture</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>DreamForge provides enterprise-grade infrastructure for deploying Moondream's vision-language capabilities at scale.</p>
              
              <h3>Core Components</h3>
              <ul>
                <li><strong>Moondream 2 (1.6B)</strong> - Ultra-efficient vision-language model with 1GB footprint</li>
                <li><strong>Constitutional AI Pipeline</strong> - RLHF training with safety constraints</li>
                <li><strong>Edge Deployment</strong> - Global CDN with &lt;15ms latency</li>
                <li><strong>AI-Powered Insights</strong> - Real-time analytics and model performance monitoring</li>
                <li><strong>Quantization Support</strong> - 4-bit and 8-bit optimizations for different deployment scenarios</li>
                <li><strong>Enterprise Security</strong> - SOC 2 compliant with end-to-end encryption</li>
              </ul>

              <h3>Constitutional RLHF Pipeline</h3>
              <p>Our mathematically rigorous reinforcement learning system implements constitutional AI principles:</p>
              <ol>
                <li><strong>Preference Collection:</strong> Bradley-Terry pairwise comparison model</li>
                <li><strong>Reward Modeling:</strong> Multi-objective optimization with safety constraints</li>
                <li><strong>Policy Optimization:</strong> PPO with KL divergence penalties</li>
                <li><strong>Constitutional Constraints:</strong> Hard safety boundaries via rule-based filtering</li>
                <li><strong>Continuous Learning:</strong> Online adaptation with drift detection</li>
              </ol>
              
              <h3>Performance Metrics</h3>
              <ul>
                <li><strong>Latency:</strong> 15ms average inference time</li>
                <li><strong>Throughput:</strong> 10,000+ requests/minute</li>
                <li><strong>Accuracy:</strong> 95.2% on VQA benchmarks</li>
                <li><strong>Uptime:</strong> 99.9% SLA with multi-region redundancy</li>
              </ul>
            </div>
          </section>

          <section id="environment-setup">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Environment Setup</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>To set up DreamForge for development, you&apos;ll need these environment variables:</p>
              
              <h3>Required API Keys</h3>
              <ul>
                <li><strong>MOONDREAM_KEY</strong> - Get from <a href="https://moondream.ai/c/cloud/api-keys" target="_blank" rel="noopener noreferrer">Moondream Dashboard</a></li>
                <li><strong>ANTHROPIC_API_KEY</strong> - Get from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">Anthropic Console</a></li>
                <li><strong>MONGODB_URI</strong> - MongoDB Atlas connection string</li>
                <li><strong>STRIPE_SECRET_KEY</strong> - For payment processing</li>
              </ul>

              <h3>Example .env.local</h3>
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
