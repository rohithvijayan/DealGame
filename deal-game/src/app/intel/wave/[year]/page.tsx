import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllDefectors, getDefectorsByYear } from '@/lib/intel';
import ArticleCard from '@/components/intel/ArticleCard';

interface PageProps {
  params: Promise<{ year: string }>;
}

const YEAR_CONTEXT: Record<number, string> = {
  2015: 'The 2015 wave followed the KPCC\'s post-2014 Lok Sabha restructuring. The BJP\'s landslide national victory under Modi created an opportunistic environment; several KPCC digital and media functionaries began exploratory conversations with BJP state leadership. The KPCC leadership reshuffle under Ramesh Chennithala left many mid-ranking organisers without clear roles.',
  2019: 'The 2019 wave was the largest single-year exodus. Coming immediately after the Lok Sabha elections — in which BJP made unprecedented gains in Kerala — the party aggressively recruited high-profile Congress faces for maximum media impact. Several national spokespeople and TV debate regulars switched, citing Congress\'s incoherent response to national security events including the Pulwama attack.',
  2020: 'The 2020 UDF crisis, triggered by internal disputes over the UDF chairmanship and seat-sharing negotiations, drove several senior Congress leaders to begin quiet defection proceedings. The COVID-19 lockdown period provided cover for private negotiations with BJP that would later become public.',
  2023: 'The 2023 expulsion wave was unique: Congress\'s own disciplinary actions effectively delivered members to BJP. The KPCC\'s hard line on public criticism of the Congress high command — particularly around statements on PM Modi — led to several expulsions that BJP quickly converted into recruitments, often within days of the expulsion orders.',
  2024: 'Election season 2024 saw the final wave before the general elections. BJP accelerated its Kerala recruitment with specific focus on Congress figures who could deliver community votes — particularly from Christian and OBC communities that BJP had been cultivating for a decade.',
};

export async function generateStaticParams() {
  const defectors = await getAllDefectors();
  const years = [...new Set(defectors.map((d) => d.yearOfDefection))];
  return years.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `The ${year} Wave — Kerala Congress Defections`,
    description: `All documented Congress-to-BJP defections from Kerala in ${year}.`,
  };
}

export default async function WavePage({ params }: PageProps) {
  const { year } = await params;
  const yearNum = Number(year);

  if (isNaN(yearNum)) notFound();

  const defectors = await getDefectorsByYear(yearNum);

  if (defectors.length === 0) {
    const all = await getAllDefectors();
    const knownYears = [...new Set(all.map((d) => d.yearOfDefection))];
    if (!knownYears.includes(yearNum)) notFound();
  }

  const context = YEAR_CONTEXT[yearNum];

  return (
    <div style={{ backgroundColor: '#F5E6C8', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
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
          Wave Analysis
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 900,
            color: '#2C1810',
            margin: '0 0 8px',
            lineHeight: 1.1,
          }}
        >
          The {year} Wave
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 700,
            fontSize: '14px',
            color: '#FF6B00',
            letterSpacing: '0.08em',
          }}
        >
          {defectors.length} Defection{defectors.length !== 1 ? 's' : ''} Documented
        </div>
      </div>

      {/* Year context */}
      {context ? (
        <div
          style={{
            backgroundColor: '#FFF8F0',
            borderLeft: '4px solid #B8860B',
            padding: '20px 24px',
            marginBottom: '40px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-noto)',
              fontSize: '16px',
              color: '#2C1810',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {context}
          </p>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#FFF8F0',
            borderLeft: '4px solid #B8860B',
            padding: '20px 24px',
            marginBottom: '40px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-noto)',
              fontSize: '16px',
              color: '#2C1810',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Defections in {year} are part of an ongoing pattern of Congress-to-BJP migration in
            Kerala, driven by a combination of personal ambition, organisational frustration, and
            BJP&apos;s targeted recruitment strategy.
          </p>
        </div>
      )}

      {/* Defectors grid */}
      {defectors.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {defectors.map((defector) => (
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
            fontSize: '18px',
          }}
        >
          No defections documented for {year}.
        </div>
      )}
      </div>
    </div>
  );
}
