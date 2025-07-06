import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) return null;

  return session ? (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
    >
      Sign out
    </button>
  ) : (
    <div className="flex gap-2">
      <button
        onClick={() => signIn('github')}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
      >
        GitHub
      </button>
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
      >
        Google
      </button>
      <button
        onClick={() => signIn('credentials')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Guest
      </button>
    </div>
  );
} 