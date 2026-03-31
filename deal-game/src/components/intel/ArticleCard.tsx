import Link from 'next/link';
import type { DefectorMeta } from '@/types/intel';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
  defector: DefectorMeta;
}

const TYPE_LABEL: Record<string, string> = {
  expelled: 'Expelled',
  voluntary: 'Voluntary',
  merger: 'Merger',
};

const TYPE_COLOR: Record<string, string> = {
  expelled: '#B71C1C',
  voluntary: '#2E7D32',
  merger: '#B8860B',
};

export default function ArticleCard({ defector }: Props) {
  const { t, lang } = useTranslation();

  const TYPE_LABEL_ML: Record<string, string> = {
    expelled: 'പുറത്താക്കി',
    voluntary: 'സ്വമേധയാ',
    merger: 'ലയനം',
  };

  const currentTypeLabel = lang === 'ml' ? (TYPE_LABEL_ML[defector.defectionType] || defector.defectionType) : (TYPE_LABEL[defector.defectionType] || defector.defectionType);

  return (
    <Link
      href={`/intel/${defector.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article
        style={{
          backgroundColor: '#FFF8F0',
          border: '1px solid #2C1810',
          padding: '0',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Photo area */}
        <div
          style={{
            height: '160px',
            backgroundColor: defector.photo ? 'transparent' : '#e8d5b7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid #2C1810',
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
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0.4 }}
            >
              <circle cx="32" cy="22" r="14" fill="#2C1810" />
              <ellipse cx="32" cy="56" rx="24" ry="16" fill="#2C1810" />
            </svg>
          )}

          {/* Year badge */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: '#2C1810',
              color: '#B8860B',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: '13px',
              padding: '4px 10px',
              letterSpacing: '0.05em',
            }}
          >
            {defector.yearOfDefection}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Name */}
          <h2
            style={{
              fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-playfair)',
              fontSize: lang === 'ml' ? '22px' : '20px',
              fontWeight: 900,
              color: '#2C1810',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {defector.name}
          </h2>

          {/* Role transition */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                backgroundColor: '#1A237E',
                color: '#fff',
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '1px',
              }}
            >
              {defector.congressRole}
            </span>
            <span
              style={{
                color: '#B8860B',
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              →
            </span>
            <span
              style={{
                backgroundColor: '#FF6B00',
                color: '#fff',
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '1px',
              }}
            >
              {defector.bjpRole}
            </span>
          </div>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: 'auto',
            }}
          >
            {/* District */}
            <span
              style={{
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#2C1810',
                backgroundColor: '#e8d5b7',
                padding: '2px 8px',
                letterSpacing: '0.06em',
              }}
            >
              {defector.district}
            </span>

            {/* Defection type */}
            <span
              style={{
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-special-elite)',
                fontSize: '10px',
                color: TYPE_COLOR[defector.defectionType] ?? '#9E9E9E',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {currentTypeLabel}
            </span>

            {/* Reading time */}
            <span
              style={{
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-noto)',
                fontSize: '11px',
                color: '#9E9E9E',
                marginLeft: 'auto',
              }}
            >
              {defector.readingTimeMinutes} {lang === 'ml' ? 'മിനിറ്റ്' : 'min'}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
