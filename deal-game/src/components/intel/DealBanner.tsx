'use client';

import { Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  congressRole: string;
  bjpRole: string;
}

export default function DealBanner({ congressRole, bjpRole }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        backgroundColor: '#2C1810',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Congress pill */}
      <div
        style={{
          backgroundColor: '#1A237E',
          color: '#fff',
          fontFamily: 'var(--font-barlow)',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '8px 16px',
          borderRadius: '2px',
          textAlign: 'center',
          minWidth: '120px',
          maxWidth: '100%',
          overflowWrap: 'break-word',
          boxSizing: 'border-box',
        }}
      >
        {congressRole}
      </div>

      {/* Handshake */}
      <Handshake
        size={24}
        style={{ color: '#FF6B00', flexShrink: 0 }}
        strokeWidth={2.5}
      />

      {/* BJP pill */}
      <div
        style={{
          backgroundColor: '#FF6B00',
          color: '#fff',
          fontFamily: 'var(--font-barlow)',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '8px 16px',
          borderRadius: '2px',
          textAlign: 'center',
          minWidth: '120px',
          maxWidth: '100%',
          overflowWrap: 'break-word',
          boxSizing: 'border-box',
        }}
      >
        {bjpRole}
      </div>
    </motion.div>
  );
}
