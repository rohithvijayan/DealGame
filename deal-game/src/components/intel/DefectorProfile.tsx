import { MDXRemote } from 'next-mdx-remote/rsc';
import type { DefectorFrontmatter, DefectorMeta } from '@/types/intel';
import DealBanner from './DealBanner';
import DefectionTimeline from './DefectionTimeline';
import PlayGameCTA from './PlayGameCTA';
import SourceCitations from './SourceCitations';
import RelatedDefectors from './RelatedDefectors';

interface Props {
  frontmatter: DefectorFrontmatter;
  content: string;
  allDefectors: DefectorMeta[];
}

function buildTimelineEvents(fm: DefectorFrontmatter) {
  const events: Array<{ year: number; label: string; type: 'congress' | 'peak' | 'rumour' | 'defection' | 'bjp' }> = [];

  events.push({
    year: fm.congressFrom,
    label: `Joined Congress — ${fm.congressRole}`,
    type: 'congress',
  });

  if (fm.yearOfDefection - fm.congressFrom > 2) {
    events.push({
      year: fm.congressFrom + Math.floor((fm.yearOfDefection - fm.congressFrom) / 2),
      label: 'Active Congress career — campaigns, media, party work',
      type: 'peak',
    });
  }

  events.push({
    year: fm.yearOfDefection,
    label: fm.triggerEvent,
    type: 'defection',
  });

  events.push({
    year: fm.yearOfDefection,
    label: `Joined BJP — ${fm.bjpRole}`,
    type: 'bjp',
  });

  return events;
}

const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Open Book',
  2: 'Easy',
  3: 'Standard',
  4: 'Hard',
  5: 'Expert',
};

export default function DefectorProfile({ frontmatter, content, allDefectors }: Props) {
  const timelineEvents = buildTimelineEvents(frontmatter);

  const related = allDefectors
    .filter((d) => d.slug !== frontmatter.slug)
    .sort((a, b) => {
      // Prefer same district
      const aMatch = a.district === frontmatter.district ? 1 : 0;
      const bMatch = b.district === frontmatter.district ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  return (
    <article style={{ width: '100%' }}>
      {/* Dateline block */}
      <div
        style={{
          fontFamily: 'var(--font-special-elite)',
          fontSize: '12px',
          letterSpacing: '0.12em',
          color: '#B8860B',
          textTransform: 'uppercase',
          marginBottom: '16px',
          borderBottom: '1px solid #B8860B',
          paddingBottom: '8px',
        }}
      >
        Filed:{' '}
        {new Date(frontmatter.publishedAt).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        · {frontmatter.district}, Kerala
      </div>

      {/* Deal banner */}
      <DealBanner
        congressRole={frontmatter.congressRole}
        bjpRole={frontmatter.bjpRole}
      />

      {/* Two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          marginTop: '32px',
        }}
        className="intel-profile-grid"
      >
        {/* Main content */}
        <div style={{ minWidth: 0 }}>
          {/* Masthead: name + role + year */}
          <div style={{ marginBottom: '24px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(30px, 7vw, 72px)',
                fontWeight: 900,
                color: '#2C1810',
                margin: '0 0 8px',
                lineHeight: 1.0,
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {frontmatter.name}
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#1A237E',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {frontmatter.congressRole}
              </span>
              <span
                style={{
                  backgroundColor: '#2C1810',
                  color: '#B8860B',
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 900,
                  fontSize: '14px',
                  padding: '4px 12px',
                  letterSpacing: '0.08em',
                }}
              >
                {frontmatter.yearOfDefection}
              </span>
              {frontmatter.defectionType && (
                <span
                  style={{
                    border: `2px solid ${frontmatter.defectionType === 'expelled' ? '#B71C1C' : frontmatter.defectionType === 'voluntary' ? '#2E7D32' : '#B8860B'}`,
                    color: frontmatter.defectionType === 'expelled' ? '#B71C1C' : frontmatter.defectionType === 'voluntary' ? '#2E7D32' : '#B8860B',
                    fontFamily: 'var(--font-special-elite)',
                    fontSize: '11px',
                    padding: '3px 10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {frontmatter.defectionType}
                </span>
              )}
            </div>
          </div>

          {/* Defector Photo — formatted as an archive clipping */}
          {frontmatter.photo && (
            <div
              style={{
                margin: '32px 0',
                border: '1px solid #2C1810',
                padding: '12px',
                backgroundColor: '#fff',
                position: 'relative',
                boxSizing: 'border-box',
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '15px',
                  backgroundColor: '#B71C1C',
                  color: '#fff',
                  fontFamily: 'var(--font-special-elite)',
                  fontSize: '10px',
                  padding: '4px 10px',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  transform: 'rotate(2deg)',
                  boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                  zIndex: 2,
                }}
              >
                DEAL FILE
              </div>
              <img
                src={frontmatter.photo}
                alt={frontmatter.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'sepia(0.25) contrast(1.1)',
                }}
              />
              <div
                style={{
                  marginTop: '10px',
                  fontFamily: 'var(--font-special-elite)',
                  fontSize: '11px',
                  color: '#9E9E9E',
                  letterSpacing: '0.05em',
                  textAlign: 'center',
                }}
              >
                Archive Photo (N-{(frontmatter.yearOfDefection % 100).toString().padStart(2, '0')}) · SOURCE: VERIFIED
              </div>
            </div>
          )}

          {/* MDX content */}
          <div
            style={{
              fontFamily: 'var(--font-noto)',
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#1C1C1C',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              minWidth: 0,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <MDXRemote source={content} />
          </div>

          {/* Timeline */}
          <div style={{ marginTop: '48px', borderTop: '2px solid #2C1810', paddingTop: '32px' }}>
            <DefectionTimeline events={timelineEvents} />
          </div>

          {/* Play game CTA */}
          <PlayGameCTA defectorName={frontmatter.name} variant="mid" />

          {/* Sources */}
          <SourceCitations sources={frontmatter.sources} />

          {/* Related defectors */}
          <RelatedDefectors defectors={related} currentSlug={frontmatter.slug} />
        </div>

        {/* Sidebar — key facts */}
        <aside
          style={{
            backgroundColor: '#FFF8F0',
            border: '1px solid #2C1810',
            padding: '24px',
            alignSelf: 'start',
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B8860B',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #2C1810',
            }}
          >
            Key Facts
          </div>

          {[
            { label: 'District', value: frontmatter.district },
            { label: 'Congress Since', value: String(frontmatter.congressFrom) },
            { label: 'Year Defected', value: String(frontmatter.yearOfDefection) },
            frontmatter.monthOfDefection
              ? { label: 'Month', value: frontmatter.monthOfDefection }
              : null,
            { label: 'Type', value: frontmatter.defectionType },
            { label: 'BJP Role', value: frontmatter.bjpRole },
            { label: 'Level', value: frontmatter.stateOrNational === 'national' ? 'National' : 'State' },
            { label: 'Difficulty', value: `${frontmatter.difficulty}/5 — ${DIFFICULTY_LABELS[frontmatter.difficulty] ?? ''}` },
          ]
            .filter(Boolean)
            .map((item) => (
              <div
                key={item!.label}
                style={{
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #e8d5b7',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontWeight: 700,
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#9E9E9E',
                    marginBottom: '2px',
                  }}
                >
                  {item!.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-noto)',
                    fontSize: '14px',
                    color: '#2C1810',
                    fontWeight: 600,
                  }}
                >
                  {item!.value}
                </div>
              </div>
            ))}

          {/* Current status */}
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9E9E9E',
                marginBottom: '4px',
              }}
            >
              Current Status
            </div>
            <div
              style={{
                fontFamily: 'var(--font-noto)',
                fontSize: '13px',
                color: '#2E7D32',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {frontmatter.currentStatus}
            </div>
          </div>

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#9E9E9E',
                  marginBottom: '8px',
                }}
              >
                Tags
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: '#e8d5b7',
                      color: '#2C1810',
                      fontFamily: 'var(--font-barlow)',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
