import type { Metadata } from 'next';
import Link from 'next/link';

const INTEL_BASE = 'https://cjp.info';
const GAME_BASE = 'https://dealers.cjp.info';

export const metadata: Metadata = {
  metadataBase: new URL(INTEL_BASE),
  title: {
    default: 'CJP Archives | The Congress-BJP Deal Archive',
    template: '%s | CJP Archives',
  },
  description:
    'The definitive archive of Kerala Congress leaders who crossed the floor to join BJP. Every defection documented.',
  openGraph: {
    siteName: 'CJP Archives | The Congress-BJP Deal Archive',
    locale: 'en_IN',
  },
};

const NAV_LINKS = [
  { label: 'Home', href: '/intel' },
  { label: 'Defectors', href: '/intel' },
  { label: 'Districts', href: '/intel' },
  { label: 'Analysis', href: '/intel/analysis/why-kerala-congress-leaks' },
  { label: 'Search', href: '/intel/search' },
];

const TICKER_ITEMS = [
  'BREAKING: Kerala Congress loses another district-level leader to BJP',
  'FILED: Ernakulam defection traced to KPCC internal rift, 2023',
  'ARCHIVE UPDATE: 26 documented defections since 2014',
  'NEW: Structural analysis of KPCC factional warfare now published',
  'FILED: BJP outreach operations in Thrissur district intensify',
  'FILED: Tom Vadakkan departure linked to Pulwama aftermath, sources confirm',
];

import { IntelHeaderClient } from '@/components/intel/IntelHeaderClient';

export default function IntelLayout({ children }: { children: React.ReactNode }) {
  const tickerText = TICKER_ITEMS.join('   ◆   ');

  return (
    <>
      {/* Breaking news ticker */}
      <div
        className="fixed top-0 left-0 w-full z-[100] h-8 bg-[#FF6B00] text-white flex items-center overflow-hidden whitespace-nowrap"
      >
        <div
          className="h-full bg-[#2C1810] text-[#FF6B00] font-barlow font-black text-[11px] tracking-widest px-4 flex items-center z-10 shrink-0"
        >
          CJP ARCHIVES
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker inline-block">
            <span
              className="font-barlow text-[12px] font-semibold tracking-wider px-6"
            >
              {tickerText}
            </span>
            <span
              className="font-barlow text-[12px] font-semibold tracking-wider px-6"
            >
              {tickerText}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <IntelHeaderClient title="CJP ARCHIVES" />
      </div>

      {/* Page content — pages control their own layout/bg */}
      <main style={{ overflowX: 'hidden' }}>{children}</main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#2C1810',
          color: '#F5E6C8',
          padding: '40px 24px',
          marginTop: '48px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '32px',
              marginBottom: '32px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: '28px',
                  fontWeight: 900,
                  color: '#B8860B',
                  marginBottom: '8px',
                }}
              >
                CJP ARCHIVES
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-noto)',
                  fontSize: '13px',
                  color: '#9E9E9E',
                  lineHeight: 1.6,
                }}
              >
                The Congress-BJP Deal Archive documents every Kerala Congress defection to BJP
                since 2014. Independent, sourced, archived.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  color: '#B8860B',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                Archive
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ color: '#F5E6C8', fontSize: '13px', textDecoration: 'none' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  color: '#B8860B',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                }}
              >
                Play the Game
              </div>
              <p style={{ fontSize: '13px', color: '#9E9E9E', marginBottom: '16px' }}>
                Think you know these defectors? Test your knowledge in the original political
                exposé game.
              </p>
              <a
                href={GAME_BASE}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FF6B00',
                  color: '#fff',
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 900,
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  textDecoration: 'none',
                }}
              >
                Play Now →
              </a>
            </div>
          </div>
          <div
            style={{
              borderTop: '1px solid #4a3020',
              paddingTop: '16px',
              fontSize: '11px',
              color: '#9E9E9E',
              fontFamily: 'var(--font-special-elite)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <span>© 2026 CJP Archives. All defections documented.</span>
            <span>cjparchives.in</span>
          </div>
        </div>
      </footer>
    </>
  );
}
