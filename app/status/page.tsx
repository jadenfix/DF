'use client';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';

type StatusResponse = {
  status: string;
  timestamp: string;
  services: Record<string, string>;
  dependenciesVerified: boolean;
};

export default function StatusPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/status', { signal: controller.signal, cache: 'no-store' })
      .then((response) => { if (!response.ok) throw new Error('Status request failed'); return response.json(); })
      .then(setStatus)
      .catch((error: Error) => { if (error.name !== 'AbortError') setError(error.message); });
    return () => controller.abort();
  }, []);
  return <>
    <Navigation />
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-28 pb-16 px-6">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Service Status</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Current API and dependency configuration. Remote provider availability and uptime have not been measured.</p>
        {error && <p role="alert" className="mt-6 text-red-600">{error}</p>}
        {!status && !error && <p role="status" className="mt-6">Checking local service state…</p>}
        {status && <>
          <p role="status" className="mt-6 rounded-xl bg-amber-100 p-4 text-amber-900">{status.status === 'degraded' ? 'Setup incomplete' : 'Dependencies configured; availability unverified'}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {Object.entries(status.services).map(([name, state]) => <article key={name} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
              <h2 className="font-semibold text-slate-900 dark:text-white">{name === 'ai' ? 'Vision provider' : name === 'api' ? 'Local API' : 'Database'}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{state.replaceAll('_', ' ')}</p>
            </article>)}
          </div>
          <p className="mt-6 text-sm text-slate-500">Checked {new Date(status.timestamp).toLocaleString()}</p>
        </>}
      </section>
    </main>
  </>;
}
