"use client";

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const GAME_BASE = 'https://dealers.cjp.info';

export function IntelFooterClient() {
    const { t, lang } = useTranslation();

    const NAV_LINKS = [
        { label: lang === 'ml' ? 'ഹോം' : 'Home', href: '/intel' },
        { label: lang === 'ml' ? 'തിരയുക' : 'Search', href: '/intel/search' },
    ];

    return (
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
                                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-noto)',
                                fontSize: '13px',
                                color: '#9E9E9E',
                                lineHeight: 1.6,
                            }}
                        >
                            {lang === 'ml'
                                ? 'കോൺഗ്രസ്സ് - ബിജെപി ഡീൽ ആർക്കൈവ് 2014 മുതലുള്ള കേരളത്തിലെ എല്ലാ കൂറുമാറ്റങ്ങളും രേഖപ്പെടുത്തുന്നു. സ്വതന്ത്രവും ആധികാരികവുമായ രേഖകൾ.'
                                : 'The Congress-BJP Deal Archive documents every Kerala Congress defection to BJP since 2014. Independent, sourced, archived.'}
                        </p>
                    </div>
                    <div>
                        <div
                            style={{
                                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                                fontWeight: 700,
                                fontSize: '12px',
                                letterSpacing: '0.15em',
                                color: '#B8860B',
                                marginBottom: '12px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {lang === 'ml' ? 'ആർക്കൈവ്' : 'Archive'}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    style={{
                                        color: '#F5E6C8',
                                        fontSize: '13px',
                                        textDecoration: 'none',
                                        fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'inherit'
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                                fontWeight: 700,
                                fontSize: '12px',
                                letterSpacing: '0.15em',
                                color: '#B8860B',
                                marginBottom: '12px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {lang === 'ml' ? 'ഗെയിം കളിക്കുക' : 'Play the Game'}
                        </div>
                        <p style={{
                            fontSize: '13px',
                            color: '#9E9E9E',
                            marginBottom: '16px',
                            fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'inherit'
                        }}>
                            {lang === 'ml'
                                ? 'ഈ കൂറുമാറ്റക്കാരെ നിങ്ങൾക്ക് അറിയാമോ? രാഷ്ട്രീയ കക്ഷികളുടെ കച്ചവടങ്ങൾ കണ്ടെത്തൂ.'
                                : 'Think you know these defectors? Test your knowledge in the original political exposé game.'}
                        </p>
                        <a
                            href={GAME_BASE}
                            style={{
                                display: 'inline-block',
                                backgroundColor: '#FF6B00',
                                color: '#fff',
                                fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'var(--font-barlow)',
                                fontWeight: 900,
                                fontSize: '13px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                padding: '10px 20px',
                                textDecoration: 'none',
                            }}
                        >
                            {lang === 'ml' ? 'തുടങ്ങുക →' : 'Play Now →'}
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
                    <span style={{ fontFamily: lang === 'ml' ? 'var(--font-anek-ml)' : 'inherit' }}>
                        {t.intel.footer_copyright}
                    </span>
                    <a
                        href={`https://${t.intel.footer_site}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#9E9E9E',
                            textDecoration: 'none',
                            borderBottom: '1px solid rgba(158,158,158,0.3)'
                        }}
                    >
                        {t.intel.footer_site}
                    </a>
                </div>
            </div>
        </footer>
    );
}
