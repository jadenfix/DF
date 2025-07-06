import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const plans = [
  {
    id: 'pro',
    name: 'Pro',
    price: '$20/mo',
    features: [
      'Higher usage limits',
      'Larger images',
      'Claude-powered answers',
      'Priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact us',
    features: [
      'Custom limits',
      'Dedicated support',
      'On-prem options',
    ],
  },
];

export default function PricingPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout(plan: string) {
    setLoading(plan);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const json = await res.json();
      if (json.status === 'ok') {
        window.location.href = json.data.url;
      } else {
        setError(json.error || 'Checkout failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Pricing & Plans</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Choose the plan that fits your needs. Free forever for basic use. Upgrade for more power.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <div className="text-3xl font-bold mb-4">{plan.price}</div>
            <ul className="mb-6 text-left space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center"><span className="mr-2">✔️</span>{f}</li>
              ))}
            </ul>
            {plan.id !== 'enterprise' ? (
              status === 'authenticated' && session?.user?.name !== 'Guest' ? (
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? 'Redirecting…' : 'Upgrade'}
                </button>
              ) : (
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  onClick={() => signIn()}
                >
                  Login to Upgrade
                </button>
              )
            ) : (
              <a href="mailto:sales@example.com" className="text-blue-600 underline">Contact Sales</a>
            )}
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-12 text-center text-red-600">
        {error && <div>{error}</div>}
      </div>
      <div className="max-w-3xl mx-auto mt-16">
        <h3 className="text-xl font-semibold mb-4">Plan Comparison</h3>
        <table className="w-full border rounded overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Feature</th>
              <th className="p-3">Free</th>
              <th className="p-3">Pro</th>
              <th className="p-3">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3">Monthly image queries</td>
              <td className="p-3">25</td>
              <td className="p-3">1,000</td>
              <td className="p-3">Custom</td>
            </tr>
            <tr>
              <td className="p-3">Max image size</td>
              <td className="p-3">256 KB</td>
              <td className="p-3">2 MB</td>
              <td className="p-3">Custom</td>
            </tr>
            <tr>
              <td className="p-3">Claude-powered answers</td>
              <td className="p-3">Limited</td>
              <td className="p-3">Full</td>
              <td className="p-3">Full</td>
            </tr>
            <tr>
              <td className="p-3">Support</td>
              <td className="p-3">Community</td>
              <td className="p-3">Priority</td>
              <td className="p-3">Dedicated</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 