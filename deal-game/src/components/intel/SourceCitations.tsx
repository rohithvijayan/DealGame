'use client';

import { useState } from 'react';

interface Source {
  title: string;
  publication: string;
  date: string;
  url: string;
}

interface Props {
  sources: Source[];
}

export default function SourceCitations({ sources }: Props) {
  const [open, setOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div
      style={{
        marginTop: '40px',
        borderTop: '1px solid #2C1810',
        paddingTop: '20px',
      }}
    >
      {/* Header / toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#2C1810',
          }}
        >
          Sources
        </span>
        <span
          style={{
            backgroundColor: '#2C1810',
            color: '#B8860B',
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: '11px',
            padding: '1px 8px',
            letterSpacing: '0.06em',
          }}
        >
          {sources.length}
        </span>
        <span
          style={{
            marginLeft: 'auto',
            color: '#B8860B',
            fontSize: '18px',
            lineHeight: 1,
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>

      {/* Accordion body */}
      {open && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sources.map((source, i) => (
            <div
              key={i}
              style={{
                borderLeft: '3px solid #B8860B',
                paddingLeft: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-noto)',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: '#2C1810',
                  marginBottom: '2px',
                }}
              >
                {source.publication}
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-noto)',
                  fontSize: '14px',
                  color: '#1A237E',
                  textDecoration: 'underline',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                {source.title}
              </a>
              <div
                style={{
                  fontFamily: 'var(--font-special-elite)',
                  fontSize: '12px',
                  color: '#9E9E9E',
                  letterSpacing: '0.06em',
                }}
              >
                {source.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
