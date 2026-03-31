"use client";

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

interface Props {
  defectorName?: string;
  variant: 'mid' | 'bottom';
}

const GAME_URL = '/game';

export default function PlayGameCTA({ defectorName: initialName, variant }: Props) {
  const { t, lang } = useTranslation();
  const isMid = variant === 'mid';

  const defectorName = initialName; // Name is already translated in parent if needed

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
          fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-special-elite)',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#FF6B00',
          textTransform: 'uppercase',
        }}
      >
        {lang === 'ml' ? 'ദൗത്യം' : 'Challenge'}
      </div>

      {/* Copy */}
      <p
        style={{
          fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-playfair)',
          fontSize: isMid ? '22px' : '26px',
          fontWeight: 900,
          color: '#F5E6C8',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {defectorName
          ? (lang === 'ml' ? `${defectorName} ആരെന്ന് നിങ്ങൾക്കറിയാമോ? ഗെയിമിലൂടെ കണ്ടെത്തൂ.` : `Think you know ${defectorName}? Prove it in the game.`)
          : (lang === 'ml' ? 'ഈ രാഷ്ട്രീയക്കാരെ നിങ്ങൾക്ക് തിരിച്ചറിയാമോ? ഗെയിമിലൂടെ പരീക്ഷിക്കൂ.' : 'Think you know these defectors? Prove it in the game.')}
      </p>

      <p
        style={{
          fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-noto)',
          fontSize: '14px',
          color: '#9E9E9E',
          margin: 0,
        }}
      >
        {lang === 'ml' ? '10 റൗണ്ടുകൾ. യഥാർത്ഥ രാഷ്ട്രീയക്കാർ. യഥാർത്ഥ കരാറുകൾ. ആരാണ് കൂറുമാറിയതെന്ന് നിങ്ങൾക്കറിയാമോ?' : '10 rounds. Real politicians. Real deals. Can you tell who crossed the floor?'}
      </p>

      {/* CTA button */}
      <div>
        <Link
          href={GAME_URL}
          style={{
            display: 'inline-block',
            backgroundColor: '#FF6B00',
            color: '#fff',
            fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: '14px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '12px 28px',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
        >
          {lang === 'ml' ? 'കോൺഗ്രസ്-ബി.ജെ.പി ഡീൽ കളിക്കുക →' : 'Play The Congress-BJP Deal →'}
        </Link>
      </div>
    </motion.div>
  );
}
