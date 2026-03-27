interface Props {
  quote: string;
  source: string;
}

export default function PullQuote({ quote, source }: Props) {
  return (
    <blockquote
      style={{
        borderLeft: '5px solid #B8860B',
        margin: '32px 0',
        padding: '16px 24px',
        backgroundColor: '#FFF8F0',
        width: '100%',
        boxSizing: 'border-box',
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontStyle: 'italic',
          fontWeight: 700,
          color: '#2C1810',
          lineHeight: 1.4,
          margin: '0 0 12px',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <cite
        style={{
          fontFamily: 'var(--font-special-elite)',
          fontSize: '13px',
          color: '#B8860B',
          letterSpacing: '0.08em',
          fontStyle: 'normal',
        }}
      >
        — {source}
      </cite>
    </blockquote>
  );
}
