import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllAnalysis, getAnalysis } from '@/lib/intel';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllAnalysis();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getAnalysis(slug);
  if (!result) return {};
  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
  };
}

export default async function AnalysisPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getAnalysis(slug);

  if (!result) notFound();

  const { frontmatter, content } = result;

  return (
    <div style={{ backgroundColor: '#F5E6C8', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #2C1810', paddingBottom: '32px', marginBottom: '40px' }}>
        <div
          style={{
            fontFamily: 'var(--font-special-elite)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: '#B8860B',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Analysis ·{' '}
          {new Date(frontmatter.publishedAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 900,
            color: '#2C1810',
            margin: '0 0 16px',
            lineHeight: 1.15,
          }}
        >
          {frontmatter.title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-noto)',
            fontSize: '18px',
            color: '#4a3020',
            lineHeight: 1.6,
            margin: '0 0 20px',
          }}
        >
          {frontmatter.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: '#2C1810',
                color: '#B8860B',
                fontFamily: 'var(--font-barlow)',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 10px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Article body */}
      <div
        style={{
          maxWidth: '720px',
        }}
      >
        <div
          className="prose-intel"
          style={{
            fontFamily: 'var(--font-noto)',
            fontSize: '18px',
            lineHeight: 1.8,
            color: '#1C1C1C',
          }}
        >
          <MDXRemote source={content} />
        </div>

        {/* Byline footer */}
        <div
          style={{
            marginTop: '48px',
            paddingTop: '24px',
            borderTop: '2px solid #2C1810',
            fontFamily: 'var(--font-special-elite)',
            fontSize: '13px',
            color: '#B8860B',
          }}
        >
          Filed by {frontmatter.author} · The Congress-BJP Deal Archive
        </div>
      </div>
      </div>
    </div>
  );
}
