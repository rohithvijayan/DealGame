'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { DefectorMeta } from '@/types/intel';
import ArticleCard from './ArticleCard';

interface Props {
  defectors: DefectorMeta[];
}

export default function FilterBar({ defectors }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [year, setYear] = useState(searchParams.get('year') ?? '');
  const [district, setDistrict] = useState(searchParams.get('district') ?? '');
  const [type, setType] = useState(searchParams.get('type') ?? '');

  const uniqueYears = useMemo(
    () => [...new Set(defectors.map((d) => d.yearOfDefection))].sort((a, b) => a - b),
    [defectors]
  );
  const uniqueDistricts = useMemo(
    () => [...new Set(defectors.map((d) => d.district))].sort(),
    [defectors]
  );

  const filtered = useMemo(
    () =>
      defectors.filter((d) => {
        if (year && d.yearOfDefection !== Number(year)) return false;
        if (district && d.district !== district) return false;
        if (type && d.defectionType !== type) return false;
        return true;
      }),
    [defectors, year, district, type]
  );

  const updateUrl = useCallback(
    (nextYear: string, nextDistrict: string, nextType: string) => {
      const params = new URLSearchParams();
      if (nextYear) params.set('year', nextYear);
      if (nextDistrict) params.set('district', nextDistrict);
      if (nextType) params.set('type', nextType);
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : '?', { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    updateUrl(year, district, type);
  }, [year, district, type, updateUrl]);

  const selectStyle = {
    fontFamily: 'var(--font-barlow)',
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.08em',
    backgroundColor: '#FFF8F0',
    border: '1px solid #2C1810',
    color: '#2C1810',
    padding: '8px 12px',
    cursor: 'pointer',
  };

  const activeCount = [year, district, type].filter(Boolean).length;

  return (
    <div>
      {/* Filter controls */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#FFF8F0',
          border: '1px solid #2C1810',
        }}
      >
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={selectStyle}
          aria-label="Filter by year"
        >
          <option value="">All Years</option>
          {uniqueYears.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          style={selectStyle}
          aria-label="Filter by district"
        >
          <option value="">All Districts</option>
          {uniqueDistricts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={selectStyle}
          aria-label="Filter by defection type"
        >
          <option value="">All Types</option>
          <option value="expelled">Expelled</option>
          <option value="voluntary">Voluntary</option>
          <option value="merger">Merger</option>
        </select>

        {activeCount > 0 && (
          <button
            onClick={() => {
              setYear('');
              setDistrict('');
              setType('');
            }}
            style={{
              ...selectStyle,
              backgroundColor: '#2C1810',
              color: '#B8860B',
              border: 'none',
            }}
          >
            Clear ({activeCount})
          </button>
        )}

        <span
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: '12px',
            color: '#9E9E9E',
            marginLeft: 'auto',
            letterSpacing: '0.06em',
          }}
        >
          {filtered.length} of {defectors.length}
        </span>
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
            padding: '48px',
            textAlign: 'center',
            color: '#9E9E9E',
            fontFamily: 'var(--font-special-elite)',
            fontSize: '16px',
          }}
        >
          No defectors match the current filters.
        </div>
      )}
    </div>
  );
}
