'use client';

interface TimelineEvent {
  year: number;
  label: string;
  type: 'congress' | 'peak' | 'rumour' | 'defection' | 'bjp';
}

interface Props {
  events: TimelineEvent[];
}

const DOT_COLOR: Record<TimelineEvent['type'], string> = {
  congress: '#1A237E',
  peak: '#1A237E',
  rumour: '#B8860B',
  defection: '#FF6B00',
  bjp: '#FF6B00',
};

const LABEL_COLOR: Record<TimelineEvent['type'], string> = {
  congress: '#1A237E',
  peak: '#1A237E',
  rumour: '#B8860B',
  defection: '#B71C1C',
  bjp: '#E65100',
};

export default function DefectionTimeline({ events }: Props) {
  return (
    <div style={{ padding: '24px 0' }}>
      <div
        style={{
          fontFamily: 'var(--font-barlow)',
          fontWeight: 900,
          fontSize: '12px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#B8860B',
          marginBottom: '24px',
        }}
      >
        Timeline
      </div>

      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '11px',
            top: '12px',
            bottom: '12px',
            width: '2px',
            backgroundColor: '#B8860B',
          }}
        />

        {/* Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {events.map((event, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                paddingBottom: i < events.length - 1 ? '28px' : '0',
                position: 'relative',
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: DOT_COLOR[event.type],
                  border: event.type === 'defection' ? '3px solid #B71C1C' : '2px solid #B8860B',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                  marginTop: '2px',
                  boxShadow: event.type === 'defection' ? '0 0 0 4px rgba(183,28,28,0.15)' : 'none',
                }}
              />

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontWeight: 900,
                      fontSize: '15px',
                      color: LABEL_COLOR[event.type],
                      letterSpacing: '0.05em',
                    }}
                  >
                    {event.year}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-barlow)',
                      fontSize: '15px',
                      color: '#2C1810',
                      lineHeight: 1.4,
                    }}
                  >
                    {event.label}
                  </span>
                  {event.type === 'defection' && (
                    <span
                      style={{
                        border: '2px solid #B71C1C',
                        color: '#B71C1C',
                        fontFamily: 'var(--font-special-elite)',
                        fontSize: '10px',
                        padding: '1px 6px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        transform: 'rotate(-2deg)',
                        display: 'inline-block',
                      }}
                    >
                      Deal Done
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
