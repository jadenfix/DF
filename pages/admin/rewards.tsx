import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Head from 'next/head';

export default function RewardAdmin() {
  const { data: session, status } = useSession();
  const [weights, setWeights] = useState<{ accuracy: number; helpfulness: number; latency: number } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    async function fetchWeights() {
      const res = await fetch('/api/admin/reward-config');
      const json = await res.json();
      if (json.status === 'ok') {
        setWeights(json.data || { accuracy: 2, helpfulness: 1, latency: -1 });
      }
    }
    if (status === 'authenticated') {
      fetchWeights();
    }
  }, [status]);

  async function save() {
    if (!weights) return;
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/reward-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(weights),
    });
    const json = await res.json();
    if (json.status === 'ok') {
      setWeights(json.data);
    } else {
      setError(json.error || 'Save failed');
    }
    setSaving(false);
  }

  if (status === 'loading') return null;
  if (!session) {
    return <div className="p-8 text-center"><button className="underline" onClick={() => signIn()}>Sign in</button> as admin to continue.</div>;
  }
  if (!isAdmin) {
    return <div className="p-8 text-center text-red-500">You are not authorized to view this page.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <Head><title>Reward Config</title></Head>
      <h1 className="text-3xl font-bold mb-6">RL Reward Weights</h1>
      {weights && (
        <div className="space-y-4 max-w-md">
          {(['accuracy', 'helpfulness', 'latency'] as const).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <label className="capitalize font-medium">{key}</label>
              <input
                type="number"
                value={weights[key]}
                onChange={(e) => setWeights({ ...weights, [key]: Number(e.target.value) })}
                className="w-24 p-2 border rounded"
              />
            </div>
          ))}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={save}
            disabled={saving}
          >{saving ? 'Saving…' : 'Save'}</button>
          {error && <div className="text-red-600">{error}</div>}
        </div>
      )}
    </div>
  );
} 