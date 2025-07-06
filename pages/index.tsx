import Head from 'next/head';
import AuthButtons from '../components/AuthButtons';

export default function Home() {
  return (
    <>
      <Head>
        <title>DreamForge</title>
        <meta name="description" content="Vision-Language AI with RL" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-between">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="mb-6">
            {/* Placeholder SVG Logo */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto mb-4">
              <circle cx="32" cy="32" r="32" fill="#22d3ee" />
              <text x="32" y="40" textAnchor="middle" fontSize="32" fill="#fff" fontWeight="bold">DF</text>
            </svg>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">DreamForge</h1>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-6">
              Revolutionize Visual Understanding with AI – Fast, Free, and Intelligent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-green-700 transition" onClick={() => window.location.href = '/playground'}>
                Try it Now for Free
              </button>
              <div className="flex gap-2 justify-center">
                <AuthButtons />
              </div>
            </div>
            <div className="text-gray-500 text-sm">or <a href="/playground" className="underline">Explore as Guest</a></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
                <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="16" fill="#0ea5e9" /><text x="16" y="23" textAnchor="middle" fontSize="18" fill="#fff">👁️</text></svg>
              </div>
              <h3 className="font-bold text-lg mb-2">AI Vision & Language</h3>
              <p className="text-gray-600 dark:text-gray-300">Image captioning, visual Q&A, object detection, and more – powered by Moondream and Claude.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
                <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="16" fill="#22c55e" /><text x="16" y="23" textAnchor="middle" fontSize="18" fill="#fff">🔁</text></svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Reinforcement Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">User feedback directly improves the AI via a robust RLHF pipeline. Adjustable reward functions for continuous learning.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
                <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="16" fill="#facc15" /><text x="16" y="23" textAnchor="middle" fontSize="18" fill="#fff">💳</text></svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Free & Flexible</h3>
              <p className="text-gray-600 dark:text-gray-300">Core features are free. Upgrade for higher volume and advanced AI with seamless Stripe integration.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-2">🖼️</div>
                <div className="font-semibold mb-1">Input</div>
                <div className="text-gray-600 dark:text-gray-300">Upload or select an image and type your question or prompt.</div>
              </div>
              <div>
                <div className="text-4xl mb-2">⚡</div>
                <div className="font-semibold mb-1">Processing</div>
                <div className="text-gray-600 dark:text-gray-300">Our AI analyzes the image, using Moondream and Claude for complex reasoning.</div>
              </div>
              <div>
                <div className="text-4xl mb-2">✨</div>
                <div className="font-semibold mb-1">Output</div>
                <div className="text-gray-600 dark:text-gray-300">Get instant answers, captions, or object detections. Feedback improves the model over time.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-100 dark:bg-gray-900 text-center text-gray-500 text-sm mt-8">
          <div className="mb-2">
            <a href="/docs" className="underline mx-2">Docs</a>
            <a href="/pricing" className="underline mx-2">Pricing</a>
            <a href="/playground" className="underline mx-2">Playground</a>
            <a href="/api/auth/signin" className="underline mx-2">Login</a>
          </div>
          <div>DreamForge &copy; {new Date().getFullYear()} &mdash; Built with Next.js, Tailwind, MongoDB, Stripe, Moondream, and Anthropic Claude.</div>
        </footer>
      </main>
    </>
  );
} 