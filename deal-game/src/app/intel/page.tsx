import type { Metadata } from 'next';
import { getAllDefectors } from '@/lib/intel';
import IntelLandingClient from '@/components/intel/IntelLandingClient';

export const metadata: Metadata = {
    title: 'CJP Archives — The Kerala Congress Defection Archive',
    description:
        '26 Kerala Congress leaders chose BJP. We documented every one. Districts, years, roles — all on record.',
};

export default async function IntelHomePage() {
    const allDefectors = await getAllDefectors();

    const years = allDefectors.map((d) => d.yearOfDefection);
    const stats = {
        total: 450,
        districts: new Set(allDefectors.map((d) => d.district)).size || 14,
        minYear: years.length ? Math.min(...years) : 2014,
        maxYear: years.length ? Math.max(...years) : 2026,
        articles: allDefectors.length,
    };

    return <IntelLandingClient defectors={allDefectors} stats={stats} />;
}
