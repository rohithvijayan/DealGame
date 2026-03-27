import { getAllDefectors } from '@/lib/intel';
import SearchClient from './SearchClient';

export const metadata = {
  title: 'Search the Archive',
  description: 'Search Kerala Congress-BJP defectors by name, district, or role.',
};

export default async function SearchPage() {
  const allDefectors = await getAllDefectors();

  return (
    <div style={{ backgroundColor: '#F5E6C8', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ borderBottom: '2px solid #2C1810', paddingBottom: '24px', marginBottom: '32px' }}>
        <div
          style={{
            fontFamily: 'var(--font-special-elite)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: '#B8860B',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          Archive Search
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 900,
            color: '#2C1810',
            margin: 0,
          }}
        >
          Search the Dossier
        </h1>
      </div>
      <SearchClient defectors={allDefectors} />
      </div>
    </div>
  );
}
