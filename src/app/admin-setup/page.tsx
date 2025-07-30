'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSetupPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const setAdmin = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/set-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('Error setting admin role');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-4 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Admin Setup</h1>
        <p className="text-sm text-gray-600 text-center">
          Set admin role for a user (use this only once to set your first admin)
        </p>

        <Input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          onClick={setAdmin}
          disabled={loading || !email}
          className="w-full"
        >
          {loading ? 'Setting Admin...' : 'Set Admin Role'}
        </Button>

        {message && (
          <p
            className={`text-sm text-center ${
              message.includes('Error') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
