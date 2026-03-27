'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { DefectorMeta } from '@/types/intel';
import ArticleCard from '@/components/intel/ArticleCard';

interface Props {
  defectors: DefectorMeta[];
}

export default function SearchClient({ defectors }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const filtered = defectors.filter((d) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      d.name.toLowerCase().includes(q) ||
      d.district.toLowerCase().includes(q) ||
      d.congressRole.toLowerCase().includes(q) ||
      d.bjpRole.toLowerCase().includes(q) ||
      (d.tags ?? []).some((t) => t.toLowerCase().includes(q))
    );
  });

  const updateUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set('q', value.trim());
      } else {
        params.delete('q');
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => updateUrl(query), 300);
    return () => clearTimeout(timer);
  }, [query, updateUrl]);

  return (
    <div>
      {/* Search input */}
      <div style={{ marginBottom: '32px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, district, or role…"
          style={{
            width: '100%',
            padding: '14px 20px',
            fontFamily: 'var(--font-noto)',
            fontSize: '16px',
            backgroundColor: '#FFF8F0',
            border: '2px solid #2C1810',
            color: '#1C1C1C',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: '12px',
            color: '#9E9E9E',
            marginTop: '8px',
            letterSpacing: '0.08em',
          }}
        >
          {query.trim()
            ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${query}"`
            : `${defectors.length} defectors in archive`}
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {filtered.map((defector) => (
            <ArticleCard key={defector.slug} defector={defector} />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '64px',
            textAlign: 'center',
            color: '#9E9E9E',
            fontFamily: 'var(--font-special-elite)',
            fontSize: '18px',
          }}
        >
          No defectors match &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
