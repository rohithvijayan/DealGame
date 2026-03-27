'use client';

import { motion } from 'framer-motion';

interface Props {
  defectorName?: string;
  variant: 'mid' | 'bottom';
}

const GAME_BASE = 'https://dealers.cjp.info';

export default function PlayGameCTA({ defectorName, variant }: Props) {
  const isMid = variant === 'mid';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        backgroundColor: isMid ? '#2C1810' : '#1a1309',
        borderLeft: `4px solid #FF6B00`,
        padding: isMid ? '28px 32px' : '40px 32px',
        margin: isMid ? '40px 0' : '0',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Dossier label */}
      <div
        style={{
          fontFamily: 'var(--font-special-elite)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#FF6B00',
          textTransform: 'uppercase',
        }}
      >
        Challenge
      </div>

      {/* Copy */}
      <p
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: isMid ? '22px' : '26px',
          fontWeight: 900,
          color: '#F5E6C8',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {defectorName
          ? `Think you know ${defectorName}? Prove it in the game.`
          : 'Think you know these defectors? Prove it in the game.'}
      </p>

      <p
        style={{
          fontFamily: 'var(--font-noto)',
          fontSize: '14px',
          color: '#9E9E9E',
          margin: 0,
        }}
      >
        10 rounds. Real politicians. Real deals. Can you tell who crossed the floor?
      </p>

      {/* CTA button */}
      <div>
        <a
          href={GAME_BASE}
          style={{
            display: 'inline-block',
            backgroundColor: '#FF6B00',
            color: '#fff',
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: '14px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '12px 28px',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
        >
          Play The Congress-BJP Deal →
        </a>
      </div>
    </motion.div>
  );
}
