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
import { IntelFooterClient } from '@/components/intel/IntelFooterClient';

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

      <IntelFooterClient />
    </>
  );
}
