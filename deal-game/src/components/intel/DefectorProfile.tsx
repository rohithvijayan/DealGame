"use client";

import { MDXRemote } from 'next-mdx-remote';
import type { DefectorFrontmatter, DefectorMeta } from '@/types/intel';
import DealBanner from './DealBanner';
import DefectionTimeline from './DefectionTimeline';
import PlayGameCTA from './PlayGameCTA';
import SourceCitations from './SourceCitations';
import RelatedDefectors from './RelatedDefectors';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useState } from 'react';
import { translateToMalayalam } from '@/utils/translate';

interface Props {
  frontmatter: DefectorFrontmatter;
  content: string;
  allDefectors: DefectorMeta[];
}

function buildTimelineEvents(fm: DefectorFrontmatter, t: any, lang: string) {
  const events: Array<{ year: number; label: string; type: 'congress' | 'peak' | 'rumour' | 'defection' | 'bjp' }> = [];

  events.push({
    year: fm.congressFrom,
    label: lang === 'ml' ? `കോൺഗ്രസിൽ ചേർന്നു — ${fm.congressRole}` : `Joined Congress — ${fm.congressRole}`,
    type: 'congress',
  });

  if (fm.yearOfDefection - fm.congressFrom > 2) {
    events.push({
      year: fm.congressFrom + Math.floor((fm.yearOfDefection - fm.congressFrom) / 2),
      label: lang === 'ml' ? 'സജീവ കോൺഗ്രസ് പ്രവർത്തനം — പ്രചാരണങ്ങൾ, പാർട്ടിവേലകൾ' : 'Active Congress career — campaigns, media, party work',
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
    label: lang === 'ml' ? `ബി.ജെ.പിയിൽ ചേർന്നു — ${fm.bjpRole}` : `Joined BJP — ${fm.bjpRole}`,
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

const DIFFICULTY_LABELS_ML: Record<number, string> = {
  1: 'ലളിതം',
  2: 'എളുപ്പം',
  3: 'സാധാരണം',
  4: 'കഠിനം',
  5: 'അതീവ കഠിനം',
};

export default function DefectorProfile({ frontmatter: initialFrontmatter, content: initialContent, allDefectors }: Props) {
  const { t, lang } = useTranslation();
  const [frontmatter, setFrontmatter] = useState(initialFrontmatter);
  const [content, setContent] = useState(initialContent);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const handleTranslation = async () => {
      if (lang === 'ml') {
        setIsTranslating(true);
        try {
          const [
            translatedName,
            translatedCongressRole,
            translatedBjpRole,
            translatedDistrict,
            translatedTrigger,
            translatedStatus,
            translatedTags,
            translatedContent
          ] = await Promise.all([
            translateToMalayalam(initialFrontmatter.name),
            translateToMalayalam(initialFrontmatter.congressRole),
            translateToMalayalam(initialFrontmatter.bjpRole),
            translateToMalayalam(initialFrontmatter.district),
            translateToMalayalam(initialFrontmatter.triggerEvent),
            translateToMalayalam(initialFrontmatter.currentStatus),
            Promise.all((initialFrontmatter.tags || []).map(tag => translateToMalayalam(tag))),
            translateToMalayalam(initialContent)
          ]);

          setFrontmatter({
            ...initialFrontmatter,
            name: translatedName,
            congressRole: translatedCongressRole,
            bjpRole: translatedBjpRole,
            district: translatedDistrict,
            triggerEvent: translatedTrigger,
            currentStatus: translatedStatus,
            tags: translatedTags
          });
          setContent(translatedContent);
        } catch (e) {
          console.error("Translation failed", e);
        } finally {
          setIsTranslating(false);
        }
      } else {
        setFrontmatter(initialFrontmatter);
        setContent(initialContent);
      }
    };

    handleTranslation();
  }, [lang, initialFrontmatter, initialContent]);

  const timelineEvents = buildTimelineEvents(frontmatter, t, lang);

  const related = allDefectors
    .filter((d) => d.slug !== frontmatter.slug)
    .sort((a, b) => {
      const aMatch = a.district === initialFrontmatter.district ? 1 : 0;
      const bMatch = b.district === initialFrontmatter.district ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const difficultyLabel = lang === 'ml' ? DIFFICULTY_LABELS_ML[frontmatter.difficulty] : DIFFICULTY_LABELS[frontmatter.difficulty];

  return (
    <article style={{ width: '100%', position: 'relative' }}>
      {isTranslating && (
        <div className="fixed inset-0 z-[200] bg-near-black/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
          <div className="bg-[#2C1810] text-[#FF6B00] px-6 py-3 font-anek-ml text-lg border-2 border-[#FF6B00] shadow-2xl animate-pulse">
            റിപ്പോർട്ട് ശരിയാക്കുന്നു...
          </div>
        </div>
      )}

      {/* Dateline block */}
      <div
        style={{
          fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-special-elite)',
          fontSize: '12px',
          letterSpacing: '0.12em',
          color: '#B8860B',
          textTransform: 'uppercase',
          marginBottom: '16px',
          borderBottom: '1px solid #B8860B',
          paddingBottom: '8px',
        }}
      >
        {t.intel.filed_on(
          new Date(frontmatter.publishedAt).toLocaleDateString(lang === 'ml' ? 'ml-IN' : 'en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          frontmatter.district
        )}
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
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-playfair)',
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
                  fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
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
                    fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-special-elite)',
                    fontSize: '11px',
                    padding: '3px 10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {lang === 'ml' ? (frontmatter.defectionType === 'expelled' ? 'പുറത്താക്കി' : frontmatter.defectionType === 'voluntary' ? 'സ്വമേധയാ' : 'ലയനം') : frontmatter.defectionType}
                </span>
              )}
            </div>
          </div>

          {/* Defector Photo */}
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
            </div>
          )}

          {/* Content */}
          <div
            style={{
              fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-noto)',
              fontSize: lang === 'ml' ? '18px' : '17px',
              lineHeight: 1.8,
              color: '#1C1C1C',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              minWidth: 0,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {content}
          </div>

          <div style={{ marginTop: '48px', borderTop: '2px solid #2C1810', paddingTop: '32px' }}>
            <DefectionTimeline events={timelineEvents} />
          </div>

          <PlayGameCTA defectorName={frontmatter.name} variant="mid" />
          <SourceCitations sources={frontmatter.sources} />
          <RelatedDefectors defectors={related} currentSlug={frontmatter.slug} />
        </div>

        {/* Sidebar */}
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
              fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: lang === 'ml' ? '14px' : '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B8860B',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '1px solid #2C1810',
            }}
          >
            {t.intel.key_facts}
          </div>

          {[
            { label: lang === 'ml' ? 'ജില്ല' : 'District', value: frontmatter.district },
            { label: lang === 'ml' ? 'കോൺഗ്രസിൽ പദവി' : 'Congress Since', value: String(frontmatter.congressFrom) },
            { label: lang === 'ml' ? 'കൂറുമാറ്റ വർഷം' : 'Year Defected', value: String(frontmatter.yearOfDefection) },
            { label: lang === 'ml' ? 'ഇനം' : 'Type', value: lang === 'ml' ? (frontmatter.defectionType === 'expelled' ? 'പുറത്താക്കി' : frontmatter.defectionType === 'voluntary' ? 'സ്വമേധയാ' : 'ലയനം') : frontmatter.defectionType },
            { label: lang === 'ml' ? 'ബി.ജെ.പി പദവി' : 'BJP Role', value: frontmatter.bjpRole },
            { label: t.intel.difficulty, value: `${frontmatter.difficulty}/5 — ${difficultyLabel}` },
          ]
            .map((item) => (
              <div
                key={item.label}
                style={{
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #e8d5b7',
                }}
              >
                <div
                  style={{
                    fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                    fontWeight: 700,
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#9E9E9E',
                    marginBottom: '2px',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-noto)',
                    fontSize: '14px',
                    color: '#2C1810',
                    fontWeight: 600,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}

          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9E9E9E',
                marginBottom: '4px',
              }}
            >
              {t.intel.current_status}
            </div>
            <div
              style={{
                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-noto)',
                fontSize: '13px',
                color: '#2E7D32',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {frontmatter.currentStatus}
            </div>
          </div>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#9E9E9E',
                  marginBottom: '8px',
                }}
              >
                {t.intel.tags}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: '#e8d5b7',
                      color: '#2C1810',
                      fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
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
