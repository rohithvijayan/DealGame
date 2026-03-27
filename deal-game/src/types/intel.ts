export interface DefectorFrontmatter {
  // Identity
  slug: string;
  name: string;
  aliases?: string[];
  photo?: string;
  // Congress Career
  congressRole: string;
  congressFrom: number;
  district: string;
  constituency?: string;
  stateOrNational: 'state' | 'national';
  // The Deal
  yearOfDefection: number;
  monthOfDefection?: string;
  triggerEvent: string;
  defectionType: 'expelled' | 'voluntary' | 'merger';
  // BJP Outcome
  bjpRole: string;
  bjpOutcome: string;
  currentStatus: string;
  // Metadata
  difficulty: 1 | 2 | 3 | 4 | 5;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  // Editorial
  pullQuote: string;
  pullQuoteSource: string;
  // Sources
  sources: Array<{
    title: string;
    publication: string;
    date: string;
    url: string;
  }>;
}

export interface DefectorMeta extends DefectorFrontmatter {
  readingTimeMinutes: number;
}
