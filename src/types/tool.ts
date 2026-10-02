export interface AiTool {
    domain: string;
    url: string;
    title: string;
    tld?: string;
    first_seen?: string;
    went_live?: string;
    ai_source?: string | null;
    category?: string | null;
    ai_categories?: string[];
    dr?: number | null;
    ai_summary?: string;
}