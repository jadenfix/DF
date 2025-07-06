'use client';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon,
  CpuChipIcon,
  CodeBracketIcon,
  SparklesIcon,
  AcademicCapIcon
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
    <>
      <Navigation />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-6 text-foreground">
                DreamForge Documentation
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to know about our AI vision platform. 
                From quick start guides to advanced technical documentation.
              </p>
            </motion.div>
          </div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {sections.map((section, index) => (
              <div key={section.title} className="card p-6 hover:shadow-medium transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{section.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground flex items-center">
                      <SparklesIcon className="h-3 w-3 mr-2 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Technical Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="card p-8 mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">Technical Overview</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">System Architecture</h3>
                <p className="text-muted-foreground mb-4">
                  DreamForge uses a hybrid architecture combining multiple AI models for optimal performance:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Moondream VLM:</strong> Fast, local image understanding</li>
                  <li>• <strong>Anthropic Claude:</strong> Advanced reasoning and analysis</li>
                  <li>• <strong>Custom RL Pipeline:</strong> Continuous improvement through feedback</li>
                  <li>• <strong>Next.js Backend:</strong> Scalable serverless architecture</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-semibold text-foreground">&lt;2 seconds</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-semibold text-foreground">95%+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-semibold text-foreground">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Concurrent Users</span>
                    <span className="font-semibold text-foreground">10,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mathematical Foundations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card p-8 mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">Mathematical Foundations</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Reinforcement Learning Pipeline</h3>
                <p className="text-muted-foreground mb-4">
                  Our RLHF (Reinforcement Learning from Human Feedback) system continuously improves model performance:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    R(s, a) = w₁ × accuracy + w₂ × helpfulness - w₃ × latency
                  </code>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Where w₁, w₂, w₃ are adjustable weights that control the reward function behavior.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Model Optimization</h3>
                <p className="text-muted-foreground">
                  We use Proximal Policy Optimization (PPO) to update our models based on collected feedback:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                  <li>• Data collection from user interactions</li>
                  <li>• Reward model training on feedback</li>
                  <li>• Policy updates via PPO algorithm</li>
                  <li>• Model deployment and monitoring</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">RLHF Dev Ops</h3>
                <p className="text-muted-foreground mb-4">
                  DreamForge exposes two simple admin endpoints so you can iterate on reward shaping just like adjusting environment variables on Vercel:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>
                    <code>GET /api/admin/reward-config</code> – fetch current <em>w₁, w₂, w₃</em> weights
                  </li>
                  <li>
                    <code>PUT /api/admin/reward-config</code> – update weights (JSON body <code>{'{'}"accuracy":2,"helpfulness":1,"latency":-1{'}'}</code>)
                  </li>
                  <li>
                    <code>POST /api/admin/reward-update</code> – recompute <code>rewardScore</code> for the latest feedback entries (query param <code>?limit=100</code>)
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Pass <code>X-Admin-Secret</code> header with the value of <code>process.env.ADMIN_SECRET</code> to authenticate. This mirrors Vercel's simple API-key workflow.
                </p>
              </div>
            </div>
          </motion.div>

          {/* API Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">API Examples</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">Basic Image Analysis</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.dreamforge.ai/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@image.jpg" \\
  -F "prompt=What do you see in this image?"`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-foreground">JavaScript SDK</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`import { DreamForge } from '@dreamforge/sdk';

const client = new DreamForge('YOUR_API_KEY');

const result = await client.analyze({
  image: imageFile,
  prompt: 'Describe this image in detail'
});

console.log(result.analysis);`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 