'use client';

import { useState } from 'react';

export default function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/intel/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFF8F0',
        border: '1px solid #2C1810',
        padding: '40px 32px',
        maxWidth: '560px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-special-elite)',
          fontSize: '11px',
          color: '#B8860B',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}
      >
        Intelligence Briefing
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: '28px',
          fontWeight: 900,
          color: '#2C1810',
          margin: '0 0 8px',
          lineHeight: 1.2,
        }}
      >
        The Weekly Dossier
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-noto)',
          fontSize: '15px',
          color: '#4a3020',
          marginBottom: '24px',
          lineHeight: 1.6,
        }}
      >
        Get the next defection in your inbox. Weekly briefings on Kerala&apos;s political crossings —
        sourced, documented, archived.
      </p>

      {status === 'success' ? (
        <div
          style={{
            backgroundColor: '#2E7D32',
            color: '#fff',
            fontFamily: 'var(--font-barlow)',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.1em',
            padding: '14px 20px',
            textTransform: 'uppercase',
          }}
        >
          Subscribed. The dossier is coming.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === 'loading'}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontFamily: 'var(--font-noto)',
              fontSize: '14px',
              backgroundColor: '#fff',
              border: '2px solid #2C1810',
              borderRight: 'none',
              color: '#1C1C1C',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              backgroundColor: '#2C1810',
              color: '#B8860B',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '12px 20px',
              border: '2px solid #2C1810',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              flexShrink: 0,
            }}
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p
          style={{
            fontFamily: 'var(--font-noto)',
            fontSize: '13px',
            color: '#B71C1C',
            marginTop: '8px',
          }}
        >
          Something went wrong. Try again later.
        </p>
      )}

      <p
        style={{
          fontFamily: 'var(--font-noto)',
          fontSize: '11px',
          color: '#9E9E9E',
          marginTop: '12px',
        }}
      >
        No spam. Unsubscribe any time.
      </p>
    </div>
  );
}
