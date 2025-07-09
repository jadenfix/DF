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
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete guide to building and deploying vision-language AI applications with DreamForge
          </p>
        </motion.div>

        <div className="space-y-12">
          <section id="getting-started">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Getting Started</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>Welcome to DreamForge! This guide will help you get started with our vision-language AI platform.</p>
              
              <h3>Quick Start</h3>
              <ol>
                <li>Visit the <a href="/playground">AI Playground</a></li>
                <li>Upload an image or select from our examples</li>
                <li>Ask a question or request a description</li>
                <li>Get AI-powered insights instantly</li>
              </ol>
            </div>
          </section>

          <section id="api-reference">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">API Reference</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3>Image Analysis</h3>
              <p>Use our API to analyze images programmatically:</p>
              
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <code>{`curl -X POST https://dreamforge.ai/api/analyze \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQ...",
    "prompt": "What do you see in this image?"
  }'`}</code>
              </pre>

              <h3>Response Format</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <code>{`{
  "success": true,
  "result": "I can see a beautiful landscape with mountains...",
  "timestamp": "2025-01-15T10:30:00Z"
}`}</code>
              </pre>
            </div>
          </section>

          <section id="architecture">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">System Architecture</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>DreamForge is built on a modern, scalable architecture:</p>
              
              <h3>Core Components</h3>
              <ul>
                <li><strong>Moondream VLM</strong> - Lightweight vision-language model for fast inference</li>
                <li><strong>Anthropic Claude</strong> - Advanced reasoning for complex queries</li>
                <li><strong>Reinforcement Learning Pipeline</strong> - Continuous improvement through user feedback</li>
                <li><strong>Next.js Frontend</strong> - Modern, responsive web interface</li>
                <li><strong>MongoDB</strong> - Scalable data storage</li>
                <li><strong>Vercel Deployment</strong> - Edge computing for global performance</li>
              </ul>

              <h3>RLHF Pipeline</h3>
              <p>Our Reinforcement Learning from Human Feedback (RLHF) system continuously improves model performance:</p>
              <ol>
                <li>User submits image and prompt</li>
                <li>AI generates response</li>
                <li>User provides feedback (👍/👎)</li>
                <li>Feedback trains reward model</li>
                <li>Policy optimization improves future responses</li>
              </ol>
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
