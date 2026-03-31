import { ImageResponse } from 'next/og';
import { getDefector } from '@/lib/intel';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;
  const result = await getDefector(slug);

  const name = result?.frontmatter.name ?? 'Unknown Defector';
  const congressRole = result?.frontmatter.congressRole ?? 'Congress Leader';
  const bjpRole = result?.frontmatter.bjpRole ?? 'BJP Member';
  const year = result?.frontmatter.yearOfDefection ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#F5E6C8',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px',
          position: 'relative',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#FF6B00',
              letterSpacing: '0.05em',
            }}
          >
            CJP DEALS
          </div>
          <div style={{ fontSize: '14px', color: '#B8860B', letterSpacing: '0.1em' }}>
            THE CONGRESS · BJP DEAL ARCHIVE
          </div>
        </div>

        {/* Main name */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 900,
            color: '#2C1810',
            lineHeight: 1.0,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {name}
        </div>

        {/* Role transition */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              backgroundColor: '#1A237E',
              color: '#fff',
              padding: '8px 20px',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            {congressRole}
          </div>
          <div style={{ fontSize: '24px', color: '#B8860B', fontWeight: 900 }}>→</div>
          <div
            style={{
              backgroundColor: '#FF6B00',
              color: '#fff',
              padding: '8px 20px',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            {bjpRole}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ fontSize: '14px', color: '#9E9E9E', letterSpacing: '0.08em' }}>
            cjp.info
          </div>

          {/* THE DEAL stamp */}
          <div
            style={{
              border: '6px solid #B71C1C',
              color: '#B71C1C',
              padding: '8px 20px',
              fontSize: '28px',
              fontWeight: 900,
              letterSpacing: '0.08em',
              transform: 'rotate(-8deg)',
              opacity: 0.85,
            }}
          >
            THE DEAL{year ? ` · ${year}` : ''}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
