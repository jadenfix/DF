import { useState, useRef } from 'react';
import { useSession, signIn } from 'next-auth/react';

const sampleImages = [
  // Replace with real URLs or base64 samples as needed
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
];

export default function Playground() {
  const { data: session, status } = useSession();
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Describe this image.');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  function handleSample(url: string) {
    setImage(url);
    setResult(null);
    setFeedback(null);
    setError(null);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage((reader.result as string).split(',')[1]); // base64
      setResult(null);
      setFeedback(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }

  async function handleAnalyze() {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, prompt }),
      });
      const json = await res.json();
      if (json.status === 'ok') {
        setResult(json.data.answer);
        setAnalysisId(json.data._id || null);
      } else {
        setError(json.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  async function sendFeedback(upvote: boolean) {
    if (!analysisId) return;
    setFeedback(upvote ? 'up' : 'down');
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysisId, upvote }),
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Playground</h1>
        <div className="mb-6 flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => fileInput.current?.click()}
            >
              Upload Image
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInput}
              onChange={handleFile}
            />
            <div className="text-gray-500 text-sm">or pick a sample:</div>
            <div className="flex gap-2 mt-2">
              {sampleImages.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt="sample"
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${image === url ? 'border-blue-600' : 'border-transparent'}`}
                  onClick={() => handleSample(url)}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <textarea
              className="w-full p-3 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
              rows={3}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Ask a question about the image..."
            />
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              onClick={handleAnalyze}
              disabled={!image || loading}
            >
              {loading ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        </div>
        {image && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={image.startsWith('http') ? image : `data:image/jpeg;base64,${image}`}
              alt="uploaded"
              className="max-w-xs max-h-64 rounded shadow mb-2"
            />
          </div>
        )}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-4">
            <div className="font-semibold mb-2">AI Response</div>
            <div className="text-lg mb-4">{result}</div>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded ${feedback === 'up' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => sendFeedback(true)}
                disabled={feedback !== null}
              >👍 Good</button>
              <button
                className={`px-4 py-2 rounded ${feedback === 'down' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                onClick={() => sendFeedback(false)}
                disabled={feedback !== null}
              >👎 Improve</button>
            </div>
          </div>
        )}
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <div className="text-center text-gray-500 mt-8">
          {status !== 'authenticated' && (
            <button className="underline text-blue-600" onClick={() => signIn()}>Sign in</button>
          )}
          <span className="ml-2">Guest usage is limited. Sign in for more features.</span>
        </div>
      </div>
    </div>
  );
} 