'use client';

import Link from 'next/link';
import type { DefectorMeta } from '@/types/intel';

interface Props {
  defectors: DefectorMeta[];
  currentSlug: string;
}

export default function RelatedDefectors({ defectors, currentSlug }: Props) {
  const related = defectors
    .filter((d) => d.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div style={{ marginTop: '48px' }}>
      <div
        style={{
          fontFamily: 'var(--font-barlow)',
          fontWeight: 900,
          fontSize: '12px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#B8860B',
          borderBottom: '2px solid #2C1810',
          paddingBottom: '8px',
          marginBottom: '24px',
        }}
      >
        More from the Archive
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {related.map((defector) => (
          <Link
            key={defector.slug}
            href={`/intel/${defector.slug}`}
            style={{
              textDecoration: 'none',
              flexShrink: 0,
              width: '220px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFF8F0',
                border: '1px solid #2C1810',
                padding: '16px',
                height: '100%',
              }}
            >
              {/* Silhouette */}
              <div
                style={{
                  height: '80px',
                  backgroundColor: '#e8d5b7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  borderBottom: '1px solid #d4c4a0',
                }}
              >
                {defector.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={defector.photo}
                    alt={defector.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ opacity: 0.35 }}
                  >
                    <circle cx="32" cy="22" r="14" fill="#2C1810" />
                    <ellipse cx="32" cy="56" rx="24" ry="16" fill="#2C1810" />
                  </svg>
                )}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '15px',
                  fontWeight: 900,
                  color: '#2C1810',
                  marginBottom: '6px',
                  lineHeight: 1.2,
                }}
              >
                {defector.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontSize: '11px',
                  color: '#B8860B',
                  letterSpacing: '0.06em',
                }}
              >
                {defector.yearOfDefection} · {defector.district}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-noto)',
                  fontSize: '11px',
                  color: '#9E9E9E',
                  marginTop: '4px',
                }}
              >
                {defector.congressRole}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
