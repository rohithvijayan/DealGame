import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllDefectors, getDefectorsByDistrict } from '@/lib/intel';
import ArticleCard from '@/components/intel/ArticleCard';

interface PageProps {
  params: Promise<{ district: string }>;
}

const DISTRICT_CONTEXT: Record<string, string> = {
  Ernakulam:
    'Ernakulam has historically been a Congress stronghold in central Kerala, but sustained factional tensions within the KPCC district unit have made it a fertile ground for BJP recruitment. The district includes Kochi, Kerala\'s commercial capital, where urban professional voters have shown growing openness to national party narratives.',
  Thrissur:
    'Thrissur, Kerala\'s cultural capital, sits at the geographical heart of the state and has long been a battleground between the UDF and LDF. Its large Christian and OBC communities have been targets of sustained BJP outreach, and several Congress organisers from Thrissur have moved to the saffron camp in the years following the 2019 Lok Sabha elections.',
  Thiruvananthapuram:
    'The state capital has seen its Congress organisation weakened by decades of factional disputes between the A and I groups. BJP has used this vacuum to poach senior organisers, particularly after the 2021 assembly results left the Congress demoralised in many Thiruvananthapuram segments.',
  Kozhikode:
    'Kozhikode is a UDF bastion in northern Kerala, but the district has not been immune to defections. Several mid-level Congress functionaries from Kozhikode constituencies have cited lack of career advancement within an ageing Congress hierarchy as their primary motivation for switching.',
  Palakkad:
    'Palakkad\'s unique demographic mix — Malayali, Tamil, and tribal communities — has made it a competitive constituency. BJP\'s presence in Palakkad has grown significantly since 2016, partly through targeted recruitment of Congress workers frustrated by the party\'s declining vote share in the district.',
  Kannur:
    'Kannur is traditionally a Congress-left battleground, but BJP has found openings among Congress leaders tired of the political violence that defines district politics. A handful of Congress figures from Kannur\'s outlying areas have moved to BJP citing personal security concerns.',
  Malappuram:
    'Malappuram, with its predominantly Muslim electorate, is IUML-dominated territory. Congress defections from Malappuram tend to be from communities on the margins of the UDF coalition rather than core Congress base areas.',
  Kottayam:
    'Kottayam, the heart of Kerala\'s Christian belt, has seen Congress weakened by the rise of independent Christian community parties. Several Congress leaders from Kottayam have used BJP as a springboard after failing to secure party tickets.',
  Alappuzha:
    'Alappuzha\'s backwaters constituencies have been LDF territory for decades, with Congress maintaining pockets of strength. Defections from Alappuzha Congress tend to follow failed ticket negotiations during assembly election cycles.',
  Pathanamthitta:
    'Pathanamthitta is a Congress-leaning district where factional rivalries are especially intense. BJP has used local Congress grievances — particularly around candidate selection — to recruit district-level functionaries.',
  Idukki:
    'Idukki, a plantation district, has a Congress organisation deeply tied to estate worker communities. BJP\'s limited presence here means defections are rare but notable when they occur.',
  Wayanad:
    'Wayanad gained national attention as Rahul Gandhi\'s parliamentary constituency. Local Congress workers who see insufficient organisational benefit from the Gandhi family\'s presence have occasionally looked toward BJP.',
  Kasaragod:
    'Kasaragod, Kerala\'s northernmost district, borders Karnataka and has cultural links to BJP\'s strong Coastal Karnataka base. This cross-border political culture has influenced some Congress workers to see BJP as a more natural political home.',
};

function formatDistrict(raw: string): string {
  return raw
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateStaticParams() {
  const defectors = await getAllDefectors();
  const districts = [...new Set(defectors.map((d) => d.district.toLowerCase().replace(/\s+/g, '-')))];
  return districts.map((district) => ({ district }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { district } = await params;
  const formatted = formatDistrict(district);
  return {
    title: `${formatted} District Defections`,
    description: `All documented Congress-to-BJP defections from ${formatted} district, Kerala.`,
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const { district } = await params;
  const formatted = formatDistrict(district);
  const defectors = await getDefectorsByDistrict(formatted);

  if (defectors.length === 0) {
    // Check if district exists at all
    const all = await getAllDefectors();
    const known = [...new Set(all.map((d) => d.district.toLowerCase().replace(/\s+/g, '-')))];
    if (!known.includes(district)) notFound();
  }

  const context = DISTRICT_CONTEXT[formatted];

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
          District File
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
          {formatted} District
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
          {defectors.length} Documented Defection{defectors.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Context paragraph */}
      {context && (
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
          No defections filed for {formatted} district yet.
        </div>
      )}
      </div>
    </div>
  );
}
