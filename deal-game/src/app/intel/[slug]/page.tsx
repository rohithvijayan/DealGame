import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllDefectors, getDefector } from '@/lib/intel';
import DefectorProfile from '@/components/intel/DefectorProfile';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const defectors = await getAllDefectors();
  return defectors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getDefector(slug);
  if (!result) return {};

  const { frontmatter } = result;
  const title = `${frontmatter.name} — ${frontmatter.congressRole} to BJP`;
  const description = `${frontmatter.name} defected from Congress to BJP in ${frontmatter.yearOfDefection}. ${frontmatter.triggerEvent}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function DefectorPage({ params }: PageProps) {
  const { slug } = await params;
  const [result, allDefectors] = await Promise.all([getDefector(slug), getAllDefectors()]);

  if (!result) notFound();

  const { frontmatter, content } = result;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${frontmatter.name} — Congress to BJP Defection`,
        description: frontmatter.triggerEvent,
        datePublished: frontmatter.publishedAt,
        dateModified: frontmatter.updatedAt,
        author: { '@type': 'Organization', name: frontmatter.author },
        publisher: {
          '@type': 'Organization',
          name: 'The Congress-BJP Deal Archive',
          url: 'https://intel.congress-bjp-deal.in',
        },
      },
      {
        '@type': 'Person',
        name: frontmatter.name,
        jobTitle: frontmatter.bjpRole,
        description: `Former ${frontmatter.congressRole}, now ${frontmatter.bjpRole}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://intel.congress-bjp-deal.in/intel',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: frontmatter.name,
            item: `https://intel.congress-bjp-deal.in/intel/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#F5E6C8', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px 0', boxSizing: 'border-box', width: '100%' }}>
        <DefectorProfile
          frontmatter={frontmatter}
          content={content}
          allDefectors={allDefectors}
        />
      </div>
    </div>
  );
}
