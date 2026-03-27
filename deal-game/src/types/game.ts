// Client-safe defector data — excludes name and aliases (the answer)
export interface DefectorDisplay {
    id: string;
    position: string;
    state: string;
    year: number;
    outcome: string;
    clue: string;
    hints: string[];
    difficulty: 1 | 2 | 3 | 4 | 5;
    photo_url?: string;
    source_url: string;
}
