import Head from 'next/head';

const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'architecture', label: 'System Architecture' },
  { id: 'vlm', label: 'Visual Language Model (Moondream)' },
  { id: 'anthropic', label: 'Anthropic Claude Integration' },
  { id: 'rlhf', label: 'Reinforcement Learning & Math' },
  { id: 'usage', label: 'User Guide' },
  { id: 'api', label: 'API Reference' },
];

export default function Docs() {
  return (
    <>
      <Head>
        <title>DreamForge Documentation</title>
        <meta name="description" content="DreamForge technical documentation and math explanation" />
      </Head>
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-5xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-extrabold mb-6 text-center">DreamForge Documentation</h1>
          <nav className="flex flex-wrap gap-4 justify-center mb-10">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className="underline text-blue-600 dark:text-cyan-400 hover:text-blue-800">
                {s.label}
              </a>
            ))}
          </nav>

          {/* Introduction */}
          <section id="intro" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Introduction</h2>
            <p>
              DreamForge is a modern AI web platform for vision-language tasks, combining Moondream (open-source VLM), Anthropic Claude (LLM), RLHF feedback, and Stripe-powered monetization. This page details the architecture, math, and usage for both users and technical stakeholders.
            </p>
          </section>

          {/* System Architecture */}
          <section id="architecture" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">System Architecture</h2>
            <p>
              The platform uses Next.js (React) for the frontend and API routes, MongoDB Atlas for data, Moondream for vision, Anthropic Claude for advanced reasoning, and Stripe for payments. The backend orchestrates model calls and feedback collection. See diagram below:
            </p>
            <div className="my-6 flex justify-center">
              {/* Mermaid diagram placeholder */}
              <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 text-xs overflow-x-auto">
{`graph TD
  User[User] -->|Image+Prompt| Playground
  Playground -->|POST /api/analyze| API[Next.js API]
  API -->|analyzeImage| Moondream
  API -->|complete| Claude
  API -->|save| MongoDB
  API -->|Stripe| Stripe
  Playground -->|Feedback| API
  API -->|save| MongoDB
`}
              </pre>
            </div>
          </section>

          {/* Visual Language Model (Moondream) */}
          <section id="vlm" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Visual Language Model (Moondream)</h2>
            <p>
              Moondream is an open-source vision-language model (~2B params) for image captioning, object detection, OCR, and more. It runs efficiently on modern hardware and is called via the backend. For most queries, Moondream provides the primary answer.
            </p>
          </section>

          {/* Anthropic Claude Integration */}
          <section id="anthropic" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Anthropic Claude Integration</h2>
            <p>
              For complex or long-form queries, the backend enriches Moondream's output with Anthropic Claude, a state-of-the-art LLM. This hybrid approach ensures both fast, free answers and advanced reasoning when needed. Claude is only called for eligible users and prompts.
            </p>
          </section>

          {/* RLHF Math */}
          <section id="rlhf" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Reinforcement Learning & Math</h2>
            <p>
              User feedback (👍/👎, comments) is logged and used to train a reward model. The reward function is configurable:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 text-xs overflow-x-auto mb-2">
{`R = w1 * accuracy + w2 * helpfulness - w3 * latency

Where:
- accuracy: 1 if upvoted, 0 if not
- helpfulness: 1 if comment provided, 0 if not
- latency: response time in seconds
- w1, w2, w3: adjustable weights (see ENVIRONMENT.md)
`}
            </pre>
            <p>
              The RL pipeline collects feedback, updates the reward model, and periodically retrains the AI. This ensures the system improves with real user data and aligns with business goals.
            </p>
          </section>

          {/* Usage Guide */}
          <section id="usage" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">User Guide</h2>
            <ol className="list-decimal ml-6 space-y-2">
              <li>Go to <a href="/playground" className="underline text-blue-600">Playground</a> and upload or select an image.</li>
              <li>Type a question or prompt (e.g., "What is happening in this picture?").</li>
              <li>Click <b>Analyze</b> to get instant AI results.</li>
              <li>Provide feedback (👍/👎, comment) to help improve the model.</li>
              <li>Sign up or upgrade for higher limits and advanced features.</li>
            </ol>
          </section>

          {/* API Reference */}
          <section id="api" className="mb-12">
            <h2 className="text-2xl font-bold mb-2">API Reference</h2>
            <div className="mb-4">
              <b>POST /api/analyze</b><br />
              <span className="text-xs">Body: {'{ image: string, prompt: string }'}</span><br />
              <span className="text-xs">Returns: {'{ status: "ok", data: { answer: string } }'}</span>
            </div>
            <div className="mb-4">
              <b>POST /api/feedback</b><br />
              <span className="text-xs">Body: {'{ analysisId: string, upvote: boolean, comment?: string }'}</span><br />
              <span className="text-xs">Returns: {'{ status: "ok" }'}</span>
            </div>
            <div className="mb-4">
              <b>POST /api/stripe/checkout</b><br />
              <span className="text-xs">Body: {'{ plan: "pro" | "enterprise" }'}</span><br />
              <span className="text-xs">Returns: {'{ status: "ok", data: { url: string } }'}</span>
            </div>
            <div className="mb-4">
              <b>POST /api/feedback/reward</b> <span className="text-xs">(admin only)</span><br />
              <span className="text-xs">Headers: {'x-admin-secret'}</span><br />
              <span className="text-xs">Returns: {'{ status: "ok", message: string }'}</span>
            </div>
          </section>
        </div>
      </main>
    </>
  );
} 